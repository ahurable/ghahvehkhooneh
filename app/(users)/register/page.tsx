"use client"

import { useState } from "react"
import { FormEvent } from "react"
import { redirect } from "next/navigation"
import { LOCALHOST } from "@/lib/variebles"
import { ErrorModal, SuccessModal } from "@/layouts/Modals/MessageModals"


const Register = () => {

    const [step, setStep] = useState(1)
    const [successState, setSuccessState] = useState(false)
    const [errorState, setErrorState] = useState(false)
    const [errorDesc, setErrorDesc] = useState('')
    const nextStep = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setStep(2)
    }

    const prevStep = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setStep(1)
    }

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        
       try {
        const response = await fetch(LOCALHOST + 'api/users/create/', {
            method: 'POST',
            body: formData
        })
        const data = await response.json()
        console.log("username : " + data.username)
        if(response.status == 201){
            setSuccessState(true)
        }
        if(response.status == 500) {
            setErrorDesc('خطایی هنگام پردازش اطلاعات رخ داد')
            setErrorState(true)
        }
        if (data.username == "user with this username already exists."){
            setErrorDesc('حساب کاربری با این نام کاربری قبلا وجود دارد')
            setErrorState(true)
        }
        else {
            setErrorDesc('خطایی هنگام پردازش اطلاعات رخ داد')
            setErrorState(true)
        }
       } catch {
            setErrorDesc('کاربری با شماره تلفن همراه وارد شده وجود دارد')
            setErrorState(true)
       }
    }

    return (
        <main className="w-full h-full fixed overflow-auto top-0 bg-[url(/cafe-pattern.jpg)]">
            <div className="absolute w-full h-full z-10 bg-brown-normal bg-opacity-60 top-0 right-0"></div>

            <SuccessModal state={successState} title={''} description={'حساب کاربری شما با موفقیت ایجاد شد'} redirectPath={'/profile'} />
            <ErrorModal state={errorState} title={''} description={errorDesc} redirectPath={null} />
            <div className="md:w-[720px] lg:w-[1000px] w-11/12 mx-auto relative h-full">
                <h1 className="text-center text-[34px] pt-10 text-white font-bold relative z-20">قهوه خونه</h1>
                <h1 className="text-center text-[50px] pb-10 font-black text-white relative z-20">ایجاد حساب</h1>
                <div className="form-wrapper z-20 h-mx pb-20 mt-4">
                    <div className="flex justify-center">
                        <form onSubmit={onSubmit}>
                            <div className={step == 1 ? "step-1 lg:py-10" : "step-1 hidden"}>
                                
                                <span className="font-normal text-md">برای ایجاد حساب و احراز هویت ما به نام کاربری و شماره تلفن همراه شما نیاز داریم.</span>
                                <div className="md:w-[620px] mx-auto">
                                    <div className="md:w-[620px] mt-5 text-start">
                                        <label htmlFor="username" className="text-md my-4">نام کاربری: </label>
                                        <input type="text" id="username" name="username" className="form-control md:w-[620px] w-full" placeholder="نام کاربری خود  را بنویسید" />
                                    </div>
                                    <div className="md:w-[620px] mt-5 text-start">
                                        <label htmlFor="phone_number" className="text-md my-4">شماره موبایل: </label>
                                        <input type="text" id="phone_number" name="phone_number" className="form-control md:w-[620px] w-full" placeholder="شماره تماس همراه موبایل خود  را وارد کنید" />
                                    </div>
                                    
                                    <div className={step == 1 ? "mt-10 text-center" : "mt-10 text-center lg:w-[620px] hidden"}>
                                        <button id="continue" onClick={nextStep} className="btn btn-blue">ادامه</button>
                                    </div>
                                </div>
                            </div>
                            <div className={step == 2 ? "step-2 lg:py-10" : "step-2 hidden"}>
                                <span className="font-light text-md">ما پسورد شما رو داخل دیتابیس رمزگذاری میکنیم پس مدیران سایت هم نمیتونن به رمز عبورتون دسترسی داشته باشن اما بازم دلیل نمیشه که بخوای رمز ضعیف بذاری</span>
                                <div className="md:w-[620px] mx-auto">
                                    <div className="md:w-[620px] lg:mt-5 text-start">
                                        <label htmlFor="password" className="text-md my-4">رمز عبور: </label>
                                        <input type="password" id="password" name="password" className="form-control md:w-[620px] w-full" placeholder="نام کاربری خود  را بنویسید" />
                                    </div>
                                    <div className="md:w-[620px] mt-5 text-start">
                                        <label htmlFor="password2" className="text-md my-4">تکرار رمز عبور: </label>
                                        <input type="password" id="password2" name="password2" className="form-control md:w-[620px] w-full" placeholder="نام کاربری خود  را بنویسید" />
                                    </div>
                                    
                                    <div className={step == 2 ? "mt-10 text-center " : "mt-10 text-center hidden"}>
                                        <button id="back" onClick={prevStep} className="btn btn-blue">قبلی</button>
                                        <button id="register" type="submit" className="btn btn-green mt-4">ثبت نام</button>
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