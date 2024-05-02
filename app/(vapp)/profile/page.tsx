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


const Profile = () => {
    const [open, setOpen] = useState(false)
    const [data, setData] = useState({})

    const dispatch = useAppDispatch()
    
    useEffect(() => {
        
        const fetchData = async () => {
            let token = localStorage.getItem('access')
            const res = await fetch(LOCALHOST + 'api/auth/profile/', {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await res.json()
            setData(data)
        }
        try{
            fetchData()
        } catch {

        }


    }, [])

    return (
        <>
        { localStorage.getItem('access') ?
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
                                    <img className="rounded-full object-cover w-40 h-40 mx-auto mb-4 bg-brown-dark" src={LOCALHOST + data.avatar} />
                                </button>
                                <div className="md:col-span-9 col-span-12">
                                    <div className="ms-4 text-center md:text-right ">
                                        <h1 className="text-lg">
                                            { data.first_name == '' ? 
                                                localStorage.getItem('access') ? jwtDecode(localStorage.getItem('access')).username : "نام کاربری" 
                                                :
                                                data.first_name + " " + data.last_name 
                                            }
                                        </h1>
                                        <span>{ data.bio ? data.bio : "بیو خود را تنظیم کنید"}</span>
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
                                            <h1 className="text-lg font-semibold">راهنما:</h1>
                                            <p>
                                                با افزودن اطلاعاتی مانند سلیقه موسیقی - خواننده های مورد علاقه - فیلم های مورد علاقه و یا
                                                کار هایی که به انجام دادن آنها علاقه دارید میتوانید خود را بهتر معرفی کنید و در قسمت اجتماعی
                                                کاربرانی که شبیه به شما هستند را راحت تر پیدا کنید. با این کار درخواست دعوت شما راحت تر توسط
                                                دیگران پذیرفته میشود.
                                            </p>
                                        </div>

                                        <a href="/profile/personality" className="btn btn-blue block text-center w-full p-4 mt-4">کامل کردن علاقه مندی ها</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ProfileModal profile={{
                firstName: data.first_name,
                lastName: data.last_name,
                bio: data.bio
            }}/>
            <ChangeAvatarModal/> </> :
            <div className="w-full">
                <div className="my-44 w-full p-4 text-center">
                    <span>برای استفاده از امکانات بیشتر وارد برنامه شوید</span>
                    <a href="/login" className="btn btn-red block w-full my-4">ورود به حساب</a>
                    <span>یا اگر حساب کاربری ندارید یکی بسازید.</span>
                    <a href="/login" className="btn btn-blue block w-full my-4">ایجاد حساب</a>

                </div>
            </div>
        }
        </>
    )
}

export default Profile