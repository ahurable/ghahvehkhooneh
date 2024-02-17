
"use client"

import { useState } from "react"
import { FormEvent } from "react"


const Login = () => {


    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const response = await fetch('http://127.0.0.1:8000/api/auth/token/', {
            method: 'POST',
            body: formData
        })
        const data = await response.json()
        // window.alert(data)
        console.log(data)
    }

    return (
        <main className="w-full h-full bg-purple-600">
            <div className="md:w-[720px] lg:w-[1000px] w-11/12 mx-auto relative h-full">
                <h1 className="text-center text-[34px] pt-10 text-white font-bold">قهوه خونه</h1>
                <h1 className="text-center text-[50px] pb-10 font-black text-white">ورود به حساب</h1>
                <div className="form-wrapper h-mx pb-20">
                    <div className="flex justify-center">
                        <form onSubmit={onSubmit}>
                            <div className="py-10">
                                
                                <span className="font-light text-md">با ورود به حساب خود از امکانات برنامه استفاده کنید.</span>
                                <div className="md:w-[620px] mx-auto">
                                    <div className="md:w-[620px] mt-10 text-start">
                                        <label htmlFor="phone_number" className="text-md my-4">نام کاربری: </label>
                                        <input type="text" id="username" name="username" className="form-control md:w-[620px] w-full" placeholder="شماره تماس همراه موبایل خود  را وارد کنید" />
                                    </div>
                                    <div className="md:w-[620px] mt-10 text-start">
                                        <label htmlFor="password" className="text-md my-4">رمز عبور: </label>
                                        <input type="text" id="password" name="password" className="form-control md:w-[620px] w-full" placeholder="رمز عبور خود را وارد کنید" />
                                    </div>
                                    
                                    <div className="mt-10 text-center ">
                                        <button id="register" type="submit" className="btn text-white mt-3 bg-emerald-400 hover:bg-emerald-500 transition font-bold text-md w-full rounded-none">ورود به سیستم</button>
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