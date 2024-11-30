"use client"
import { setEditProfileModalState } from "@/lib/features/profileModalSlice"
import { useAppDispatch } from "@/lib/hook"
import { jwtDecode } from "jwt-decode"
import React, { useEffect, useState } from "react"
import ProfileModal from '@/components/ProfileModal'
import { redirect } from "next/navigation"
import { LOCALHOST } from "@/lib/variebles"
import { setAvatarModalState } from "@/lib/features/avatarModalSlice"
import ChangeAvatarModal from "@/components/ChangeAvatarModal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDoorOpen, faUserMinus } from "@fortawesome/free-solid-svg-icons"
import { StaticImageData } from "next/image"
import Loader from "@/components/Loader"



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
    const [profile, setProfile] = useState<profileType[]>()
    const [loading, setLoading] = useState<boolean>(true)

    const dispatch = useAppDispatch()
    
    useEffect(() => {
        try{
            // const token = localStorage.getItem('access')
            const handleAsync = async () => {
                const res = await fetch(LOCALHOST + 'api/users/profile/'+params.username+'/', {
                    method: "GET"
                })
                const data = await res.json()
                console.log(data)
                setProfile(data.user.profile)
                setLoading(false)
            }
            handleAsync()
        } catch {
            location.replace('/logout')
        }


    }, [])

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
            <div className="w-full">
                <div className="p-4">
                    <div className="container mt-4">
                        <div className="mt-8">
                            <div className="relative border-b grid grid-cols-12 p-4 md:rounded-lg md:shadow justify-center items-center">
                                
                                
                                <button className="col-span-12 md:col-span-3 justify-center border-none" onClick={() => {dispatch(setAvatarModalState(true))}}>
                                    <img className="rounded-full object-cover w-40 h-40 mx-auto mb-4 bg-brown-dark" src={LOCALHOST + profile.avatar} />
                                </button>
                                <div className="md:col-span-9 col-span-12">
                                    <div className="ms-4 text-center md:text-right ">
                                        <h1 className="text-lg">
                                            { profile.first_name == null ? 
                                                localStorage.getItem('access') ? jwtDecode(localStorage.getItem('access')).username : "" 
                                                :
                                                 profile.first_name + " "} {profile.last_name == null ? "" : profile.last_name 
                                            }
                                        </h1>
                                        <span>{ profile.bio ? profile.bio : ""}</span>
                                    </div>
                                </div>
                                <div className="col-span-12 p-4">
                                    <button className="btn btn-brown" onClick={() => console.log()}>افزودن به لیست دوستان</button>
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