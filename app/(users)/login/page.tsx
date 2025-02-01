
"use client"

import { useState } from "react"
import { FormEvent } from "react"
import { cookies } from 'next/headers'
import { redirect } from "next/navigation"
import { LOCALHOST } from "@/lib/variebles"
import { ErrorModal, SuccessModal } from "@/layouts/Modals/MessageModals"
import { jwtDecode } from "jwt-decode"
import { useAppDispatch } from "@/lib/hook"
import { setAvatar, setIsAdmin, setLoggedIn, setUsername } from "@/lib/features/userSlice"

const Login = () => {
    const dispatch = useAppDispatch()
    const [success, setSuccess] = useState(false)
    const [errorState, setErrorState] = useState(false)
    const [error, setError] = useState<string>("")
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const response = await fetch(LOCALHOST + 'api/auth/token/', {
            method: 'POST',
            body: formData
        })
        const data = await response.json()
        // window.alert(data)
        if (response.status == 200) {
            setSuccess(true)
            const _user: {
                username: string,
                avatar: string,
                is_admin: boolean
            } = jwtDecode(data.access)
            console.log(_user.username)
            dispatch(setUsername(_user.username))
            localStorage.setItem('access', data.access)
            localStorage.setItem('refresh', data.refresh)
            
        } else if (response.status == 401) {
            setError("حسابی با مشخصات وارد شده یافت نشد.")
            setErrorState(true)
        } else {
            window.alert("خطایی در سرور رخ داده")
        }
    }

 
    return (
        <main className="w-full h-full  bg-[url(/cafe-pattern.jpg)] absolute">
            <div className="absolute w-full h-full z-10 bg-brown-normal bg-opacity-60 top-0 right-0"></div>
            <div className="md:w-[720px] lg:w-[1000px] w-11/12 mx-auto absolute right-0 left-0 h-full">
                <h1 className="text-center relative text-[34px] pt-10 text-white font-bold z-20">قهوه خونه</h1>
                <h1 className="text-center relative text-[50px] pb-10 font-black text-white z-20">ورود به حساب</h1>
                <div className="form-wrapper z-20 h-mx lg:pb-20">
                    <div className="flex justify-center">
                        <form onSubmit={onSubmit}>
                            <div className="py-10">
                                
                                <span className="font-light text-md">با ورود به حساب خود از امکانات برنامه استفاده کنید.</span><br />
                                <span className="font-light text-md">اگر حساب کاربری ندارید <a className="text-blue-400" href="/register">یکی ایجاد کنید.</a></span>
                                <div className="md:w-[620px] mx-auto">
                                    <div className="md:w-[620px] mt-5 text-start">
                                        <label htmlFor="phone_number" className="text-md my-4">نام کاربری: </label>
                                        <input type="text" id="username" name="username" className="form-control md:w-[620px] w-full" placeholder="شماره تماس همراه موبایل خود  را وارد کنید" />
                                    </div>
                                    <div className="md:w-[620px] mt-5 text-start">
                                        <label htmlFor="password" className="text-md my-4">رمز عبور: </label>
                                        <input type="password" id="password" name="password" className="form-control md:w-[620px] w-full" placeholder="رمز عبور خود را وارد کنید" />
                                    </div>
                                    
                                    <div className="mt-10 text-center ">
                                        <button id="register" type="submit" className="btn btn-green">ورود به سیستم</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <SuccessModal title="موفق" description="شما با موفقیت وارد حساب کاربری خود شدید" redirectPath="/" state={success} />
            <ErrorModal title="خطا" description={error} state={errorState} redirectPath={'/'} />
        </main>
        )
    }

export default Login