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
import { faChartBar, faDoorOpen, faUserMinus } from "@fortawesome/free-solid-svg-icons"
import { StaticImageData } from "next/image"
import { TrimedIconCard } from "@/components/Cards"


interface idNameType {
    id: number,
    name: string
}

interface personalityType {
    hobbies :idNameType[],
    fav_music: idNameType[],
    watched_movies: idNameType[],
    social_twitter: string,
    social_instagram: string,
    user: number
}

interface profileType {
    first_name: string,
    last_name: string,
    avatar: StaticImageData | string,
    bio: string,
    followers: number[],
    following: number[],
    city: number[],
}

const Profile = () => {
    const [open, setOpen] = useState(false)
    const [profile, setProfile] = useState<profileType>()
    const [personality, setPersonality] = useState<personalityType | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        // const loc = navigator.geolocation.getCurrentPosition(success, error)
        // function success(position: any) {
        //     const latitude = position.coords.latitude;
        //     const longitude = position.coords.longitude;
        //     console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        // }
        // function error() {
        //     console.log("Unable to retrieve your location");
        //   }
        // console.log(loc)
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

    useEffect(()=>{
        try {
            const handleAsync = async () => {
                const token = localStorage.getItem('access')
                const res = await fetch(`${LOCALHOST}api/cafes/check-admin`, 
                    {
                        method: "get",
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                if (res.ok) {
                    setIsAdmin(true)
                }
            }
            handleAsync()
        } catch {
            throw Error('there were error during checking if the user is admins')
        }
    },[profile])

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
                                                profile.first_name == null ? "نام خود را تنظیم کنید" : profile.first_name + " " }{ profile.last_name == null ? "نام خانوادگی خود را تنظیم کنید" : profile.last_name
                                            }
                                        </h1>
                                        <span>{ profile.bio ? profile.bio : "بیو خود را تنظیم کنید"}</span>
                                    </div>
                                </div>
                                <div className="col-span-12 p-4">
                                    <button className="btn btn-green" onClick={() => dispatch(setEditProfileModalState(true))}>ویرایش پروفایل</button>
                                </div>
                            </div>
                            <div className="w-full p-4 grid grid-cols-2 mt-4">
                                <div className="col-span-1 p-2">
                                    <div className="shadow-lg rounded-3xl p-4 w-full text-center">
                                        <span className="text-brown-dark">{profile.followers.length}</span>
                                        <br />
                                        <span className="text-sm">دنبال کنندگان</span>
                                    </div>
                                </div>
                                <div className="col-span-1 p-2">
                                    <div className="shadow-lg rounded-3xl p-4 w-full text-center">
                                        <span className="text-brown-dark">{profile.following.length}</span>
                                        <br />
                                        <span className="text-sm">دنبال شوندگان</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="p-4">
                                    { isAdmin ? <TrimedIconCard iconName={faChartBar} altText="رفتن به صفحه مدیریت" onClick={() => location.replace('/manage')}/> : "" }
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
                            </div> {
                                personality != null && 
                                personality.hobbies != undefined && personality.hobbies.length > 0 && <div className="w-full">
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
                                personality.watched_movies != undefined && personality.watched_movies.length > 0 && <div className="w-full">
                                    <div className="w-full rounded-3xl shadow p-4 flex flex-wrap mt-4">
                                        <span className="font-bold text-sm mx-4 my-2 py-2">غذاهای مورد علاقه: </span>
                                       { personality.watched_movies.map(hobby => [
                                             <span className="p-2 rounded-lg text-brown-normal border m-1" key={hobby.id}>{hobby.name}</span>
                                        ]) }
                                    </div>
                                </div>
                            }
                            {
                                personality != null && 
                                personality.fav_music != undefined && personality.fav_music.length > 0 && <div className="w-full">
                                    <div className="w-full rounded-3xl shadow p-4 flex flex-wrap mt-4">
                                        <span className="font-bold text-sm mx-4 my-2 py-2">سلیقه موسیقی: </span>
                                       { personality.fav_music.map(hobby => [
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