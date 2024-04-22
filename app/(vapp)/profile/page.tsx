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


const Profile = () => {
    const [open, setOpen] = useState(false)
    const [data, setData] = useState({})

    const dispatch = useAppDispatch()
    
    useEffect(() => {
        if (!localStorage.getItem('access')){
            redirect('/login')
        }
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
        fetchData()
    }, [])

    return (
        <>
            <div className="w-full">
                <div className=" text-center border-b">
                    <h1 className="title-wrapper text-lg text-brown-dark p-5">پروفایل</h1>
                </div>
                <div className="p-4">
                    <div className="container mt-4">
                        <div className="mt-8">
                            <div className="relative grid grid-cols-12 p-4 rounded-lg shadow justify-center items-center">
                                <button className="col-span-3 border-none" onClick={() => {dispatch(setAvatarModalState(true))}}>
                                    <img className="rounded-full w-20 h-20 mx-3 bg-brown-dark" src={LOCALHOST + data.avatar} />
                                </button>
                                <div className="col-span-9">
                                    <div className="ms-4">
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
                        </div>
                    </div>
                </div>
            </div>
            <ProfileModal profile={{
                firstName: data.first_name,
                lastName: data.last_name,
                bio: data.bio
            }}/>
            <ChangeAvatarModal/>
            
        </>
    )
}

export default Profile