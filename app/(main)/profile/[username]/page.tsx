"use client"
import { setEditProfileModalState } from "@/lib/features/profileModalSlice"
import { useAppDispatch } from "@/lib/hook"
import { jwtDecode, JwtPayload } from "jwt-decode"
import React, { useEffect, useState } from "react"
import ProfileModal from '@/components/ProfileModal'
import { redirect } from "next/navigation"
import { LOCALHOST } from "@/lib/variebles"
import { setAvatarModalState } from "@/lib/features/avatarModalSlice"
import ChangeAvatarModal from "@/components/ChangeAvatarModal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDoorOpen, faUserMinus } from "@fortawesome/free-solid-svg-icons"
import Image, { StaticImageData } from "next/image"
import Loader from "@/components/Loader"
import { useAuth } from "@/lib/Context/AuthContext"
import { useRouter } from "next/navigation"
import NotificationComponent from "@/layouts/Modals/MessageModals"
import { useNotification } from "@/lib/Context/NotificationContext"
import { sendFollowReq } from "@/lib/fetchs"
import { access } from "fs"



interface profileType {
    first_name: string,
    last_name: string,
    avatar: StaticImageData | string,
    bio: string,
    followrs: number[],
    followings: number[],
    city: number[]
}

const Profile = ({params}:{params:{username:string}}) => {
    const [profile, setProfile] = useState<profileType>()
    const [loading, setLoading] = useState<boolean>(true)
    const { user, accessToken } = useAuth()
    const { showNotification } = useNotification()
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [userId, setUserId] = useState<number|null>(null)
    
    useEffect(() => {
        // if (accessToken){
        //     const uId = jwtDecode<JwtPayload & {id:number}>(accessToken)
        //     setUserId(uId.id)
        // }
        try{
            const handleAsync = async () => {
                const res = await fetch(LOCALHOST + 'api/users/profile/'+params.username+'/', {
                    method: "GET"
                })
                const data = await res.json()
                console.log(data)
                setUserId(data.user.id)
                setProfile(data.user.profile)
                setLoading(false)
            }
            handleAsync()
        } catch {
            router.push('/logout')
        }


    }, [router, params.username])

    if (profile == undefined || profile.first_name == null || profile.first_name.length == 0)
        return null

    return (
        <>
        { loading ?
        <>
            <div className="w-full h-full vertical-center items-center flex justify-center">
                <div className="m-auto w-20 h-20 absolute top-0 bottom-0 right-0 left-0.5">
                    <Loader height={100} />
                </div>
            </div>
        </>
        :
        <>
        <NotificationComponent/>
            <div className="w-full">
                <div className="p-4">
                    <div className="container mt-4">
                        <div className="mt-8">
                            <div className="relative border-b grid grid-cols-12 p-4 md:rounded-lg md:shadow justify-center items-center">
                                
                                
                                <button className="col-span-12 md:col-span-3 justify-center border-none" onClick={() => {dispatch(setAvatarModalState(true))}}>
                                    <Image className="rounded-full object-cover w-40 h-40 mx-auto mb-4 bg-brown-dark" src={LOCALHOST + profile.avatar} width={100} height={100} alt="" />
                                </button>
                                <div className="md:col-span-9 col-span-12">
                                    <div className="ms-4 text-center md:text-right ">
                                        <h1 className="text-lg">
                                            { 
                                                 profile.first_name + " "} {profile.last_name == null ? "" : profile.last_name 
                                            }
                                        </h1>
                                        <span>{ profile.bio ? profile.bio : ""}</span>
                                    </div>
                                </div>
                                <div className="col-span-12 p-4">
                                    <button className="btn btn-brown" onClick={async () => {
                                        if (!user && !accessToken) {
                                            showNotification(
                                                "خطا",
                                                "error",
                                                true,
                                                "برای دنبال کردن کاربران لازم است وارد حساب خود شوید"
                                            )
                                        }
                                        else {
                                            if (userId && accessToken)
                                                await sendFollowReq(userId, accessToken, showNotification)
                                        }
                                    }}>افزودن به لیست دوستان</button>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <ProfileModal profile={{
                firstName: profile.first_name,
                lastName: profile.last_name,
                bio: profile.bio
            }}/>
            <ChangeAvatarModal/> 
            </> 
            
        }
        </>
    )
}

export default Profile