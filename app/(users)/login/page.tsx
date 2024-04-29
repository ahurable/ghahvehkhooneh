
"use client"

import { useState } from "react"
import { FormEvent } from "react"
import { cookies } from 'next/headers'
import { redirect } from "next/navigation"
import { LOCALHOST } from "@/lib/variebles"

const Login = () => {


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
            alert("ورود موفق")
            localStorage.setItem('access', data.access)
            localStorage.setItem('refresh', data.refresh)
            location.replace('/profile')
        } else if (response.status == 401) {
            window.alert("مشخصات ورود اشتباه است")
        } else {
            window.alert("خطایی در سرور رخ داده")
        }
    }

    return (
        <main className="w-full h-full bg-brown-light">
            <div className="md:w-[720px] lg:w-[1000px] w-11/12 mx-auto relative h-full">
                <h1 className="text-center text-[34px] pt-10 text-brown-dark font-bold">قهوه خونه</h1>
                <h1 className="text-center text-[50px] pb-10 font-black text-brown-dark">ورود به حساب</h1>
                <div className="form-wrapper h-mx pb-20">
                    <div className="flex justify-center">
                        <form onSubmit={onSubmit}>
                            <div className="py-10">
                                
                                <span className="font-light text-md">با ورود به حساب خود از امکانات برنامه استفاده کنید.</span><br />
                                <span className="font-light text-md">اگر حساب کاربری ندارید <a className="text-blue-400" href="/register">یکی ایجاد کنید.</a></span>
                                <div className="md:w-[620px] mx-auto">
                                    <div className="md:w-[620px] mt-10 text-start">
                                        <label htmlFor="phone_number" className="text-md my-4">نام کاربری: </label>
                                        <input type="text" id="username" name="username" className="form-control md:w-[620px] w-full" placeholder="شماره تماس همراه موبایل خود  را وارد کنید" />
                                    </div>
                                    <div className="md:w-[620px] mt-10 text-start">
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
        </main>
        )
    }

export default Login