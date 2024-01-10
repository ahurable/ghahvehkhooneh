"use client"

import { useState } from "react"
import { FormEvent } from "react"


const Register = () => {

    // const firstStep = useRef(null)
    // const secondStep = useRef(null)
    // const conButton = useRef(null)
    // const btnWrapper = useRef(null)

    const [step, setStep] = useState(1)
 
    const nextStep = (e) => {
        e.preventDefault()
        setStep(2)
    }

    const prevStep = (e) => {
        e.preventDefault()
        setStep(1)
    }

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const response = await fetch('http://127.0.0.1:8000/api/users/create/', {
            method: 'POST',
            body: formData
        })
        const data = await response.json()
        console.log(data)
    }

    return (
        <main className="w-full h-full bg-purple-600">
            <div className="md:w-[720px] lg:w-[1000px] w-11/12 mx-auto relative h-full">
                <h1 className="text-center text-[34px] pt-10 text-white font-bold">قهوه خونه</h1>
                <h1 className="text-center text-[50px] pb-10 font-black text-white">ایجاد حساب</h1>
                <div className="form-wrapper h-mx pb-20 my-4">
                    <div className="flex justify-center">
                        <form onSubmit={onSubmit}>
                            <div className={step == 1 ? "step-1" : "step-1 hidden"}>
                                
                                <span className="font-light text-md">برای ایجاد حساب و احراز هویت ما به نام کاربری و شماره تلفن همراه شما نیاز داریم.</span>
                                <div className="md:w-[620px] mx-auto">
                                    <div className="md:w-[620px] mt-10 text-start">
                                        <label htmlFor="username" className="text-md my-4">نام کاربری: </label>
                                        <input type="text" id="username" name="username" className="form-control md:w-[620px] w-full" placeholder="نام کاربری خود  را بنویسید" />
                                    </div>
                                    <div className="md:w-[620px] mt-10 text-start">
                                        <label htmlFor="phone_number" className="text-md my-4">شماره موبایل: </label>
                                        <input type="text" id="phone_number" name="phone_number" className="form-control md:w-[620px] w-full" placeholder="شماره تماس همراه موبایل خود  را وارد کنید" />
                                    </div>
                                    
                                    <div className={step == 1 ? "mt-10 text-center" : "mt-10 text-center lg:w-[620px] hidden"}>
                                        <button id="continue" onClick={nextStep} className="btn text-white bg-blue-400 hover:bg-blue-500 transition font-bold text-md w-full rounded-none">ادامه</button>
                                    </div>
                                </div>
                            </div>
                            <div className={step == 2 ? "step-2" : "step-2 hidden"}>
                                <span className="font-light text-md">ما پسورد شما رو داخل دیتابیس رمزگذاری میکنیم پس مدیران سایت هم نمیتونن به رمز عبورتون دسترسی داشته باشن اما بازم دلیل نمیشه که بخوای رمز ضعیف بذاری</span>
                                <div className="md:w-[620px] mx-auto">
                                    <div className="md:w-[620px] mt-10 text-start">
                                        <label htmlFor="password" className="text-md my-4">رمز عبور: </label>
                                        <input type="text" id="password" name="password" className="form-control md:w-[620px] w-full" placeholder="نام کاربری خود  را بنویسید" />
                                    </div>
                                    <div className="md:w-[620px] mt-10 text-start">
                                        <label htmlFor="password2" className="text-md my-4">تکرار رمز عبور: </label>
                                        <input type="text" id="password2" name="password2" className="form-control md:w-[620px] w-full" placeholder="نام کاربری خود  را بنویسید" />
                                    </div>
                                    
                                    <div className={step == 2 ? "mt-10 text-center " : "mt-10 text-center hidden"}>
                                        <button id="back" onClick={prevStep} className="btn text-white mt-3 bg-blue-400 hover:bg-blue-500 transition font-bold text-md w-full rounded-none">قبلی</button>
                                        <button id="register" type="submit" className="btn text-white mt-3 bg-emerald-400 hover:bg-emerald-500 transition font-bold text-md w-full rounded-none">ثبت نام</button>
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

export default Register