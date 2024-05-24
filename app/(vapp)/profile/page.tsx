"use client"
import { setProfileModalState } from "@/lib/features/profileModalSlice"
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

interface interestsType {
    id: number,
    name: string
}

interface personalityType {
    favourite_foods: interestsType[],
    hobbies: interestsType[],
    id: number,
    job: interestsType[],
    music_taste: interestsType[],
    social_instagram: string | null,
    social_twitter: string | null,
    user: number
}

interface profileType {
    first_name: string,
    last_name: string,
    avatar: StaticImageData | string,
    bio: string,
    followrs: number[],
    followings: number[],
    city: number[]
}

const Profile = () => {
    const [open, setOpen] = useState(false)
    const [profile, setProfile] = useState<profileType[]>()
    const [personality, setPersonality] = useState<personalityType | null>()
    const [loading, setLoading] = useState<boolean>(true)

    const dispatch = useAppDispatch()
    
    useEffect(() => {
        try{
            const token = localStorage.getItem('access')
            const handleAsync = async () => {
                const res = await fetch(LOCALHOST + 'api/auth/profile/', {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                const data = await res.json()
                console.log(data)
                setProfile(data.profile)
                setPersonality(data.personality)
                setLoading(false)
            }
            handleAsync()
        } catch {
            location.replace('/logout')
        }


    }, [])

    return (
        <>
        { profile ? loading ?
        <span>loading</span>:
        <>
            <div className="w-full">
                <div className=" text-center border-b">
                    <h1 className="title-wrapper text-lg text-brown-dark p-5">پروفایل</h1>
                </div>
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
                                            { profile.first_name == '' ? 
                                                localStorage.getItem('access') ? jwtDecode(localStorage.getItem('access')).username : "نام کاربری" 
                                                :
                                                profile.first_name + " " + profile.last_name 
                                            }
                                        </h1>
                                        <span>{ profile.bio ? profile.bio : "بیو خود را تنظیم کنید"}</span>
                                    </div>
                                </div>
                                <div className="col-span-12 p-4">
                                    <button className="btn btn-green" onClick={() => dispatch(setProfileModalState(true))}>ویرایش پروفایل</button>
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="container mt-4">
                                    <div className="w-full">
                                        <div className="text-center">
                                            <span className="text-md text-brown-normal text-center block w-full">با افزودن علاقه مندی های خود اجتماع های مورد علاقتون رو پیدا کنید</span>
                                        </div>

                                        <a href="/profile/personality" className="btn btn-blue block text-center w-full p-4 mt-4">کامل کردن علاقه مندی ها</a>
                                    </div>
                                </div>
                            </div>
                            {
                                personality != null && 
                                personality.hobbies.length > 0 && <div className="w-full">
                                    <div className="w-full rounded-3xl shadow p-4 flex flex-wrap mt-4">
                                        <span className="font-bold text-sm mx-4 my-2 py-2">سرگرمی ها: </span>
                                       { personality.hobbies.map(hobby => [
                                             <span className="p-2 rounded-lg text-brown-normal border m-1" key={hobby.id}>{hobby.name}</span>
                                        ]) }
                                    </div>
                                </div>
                            }
                            {
                                personality != null && 
                                personality.favourite_foods.length > 0 && <div className="w-full">
                                    <div className="w-full rounded-3xl shadow p-4 flex flex-wrap mt-4">
                                        <span className="font-bold text-sm mx-4 my-2 py-2">غذاهای مورد علاقه: </span>
                                       { personality.favourite_foods.map(hobby => [
                                             <span className="p-2 rounded-lg text-brown-normal border m-1" key={hobby.id}>{hobby.name}</span>
                                        ]) }
                                    </div>
                                </div>
                            }
                            {
                                personality != null && 
                                personality.music_taste.length > 0 && <div className="w-full">
                                    <div className="w-full rounded-3xl shadow p-4 flex flex-wrap mt-4">
                                        <span className="font-bold text-sm mx-4 my-2 py-2">سلیقه موسیقی: </span>
                                       { personality.music_taste.map(hobby => [
                                             <span className="p-2 rounded-lg text-brown-normal border m-1" key={hobby.id}>{hobby.name}</span>
                                        ]) }
                                    </div>
                                </div>
                            }
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
            </> :
            <>
                <div className="container">
                    <div className="w-full p-4">
                        <div className="w-full rounded-3xl mt-60 md:mt-40  shadow p-4">
                            <span className="text-lg text-center block p-4">وارد حساب کاربری خود شوید یا یکی ایجاد کنید</span>
                            <a className="btn btn-green p-4 block text-center" href="/login">ورود به حساب</a>
                        </div>
                    </div>
                </div>
            </>
            
        }
        </>
    )
}

export default Profile