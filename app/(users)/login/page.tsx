"use client"

import { useEffect, useRef, useState } from "react"
import { FormEvent } from "react"
import { redirect, useRouter } from "next/navigation"
import { LOCALHOST } from "@/lib/variebles"
import NotificationComponent, { ErrorModal, SuccessModal } from "@/layouts/Modals/MessageModals"
import { ThreeDot } from "react-loading-indicators"
import { useNotification } from "@/lib/Context/NotificationContext"
import { useAuth } from "@/lib/Context/AuthContext"


const Login = () => {

    const [step, setStep] = useState(1)
    const [successState, setSuccessState] = useState(false)
    const [errorState, setErrorState] = useState(false)
    const [errorDesc, setErrorDesc] = useState('')
    const [ loading, setLoading ] = useState<boolean>(false)
    // const nextStep = (e:React.MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault()
    //     setStep(2)
    // }

    const [phoneNumber, setPhoneNumber] = useState('')
    const [otpCode, setOtpCode] = useState('')
    const { showNotification } = useNotification()
    const { login } = useAuth()
    const router = useRouter()
    const sendOtpCode = () => {
        const handleAsyncFetch = async () => {
            const res = await fetch(`${LOCALHOST}api/auth/send-otp/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phone_number: phoneNumber
                })
            })
            if (res.status === 200) {
                setStep(2)
                // showNotification(
                //     'کد یکبار مصرف ارسال شد',
                //     'success',
                //     true
                // )
            } else {
                
            }
        }
        handleAsyncFetch()
    }

    const verifyOtpCode = () => {
        const handleAsyncFetch = async () => {
            const res = await fetch(`${LOCALHOST}api/auth/verify-otp/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phone_number: phoneNumber,
                    otp_code: otpCode
                })
            })
            const data = await res.json()
            if (res.status === 200) {
                
                showNotification(
                    'با موفقیت وارد شدید',
                    'success',
                    true
                )

                login(data.tokens.access, data.tokens.refresh)
                router.push('/profile')
            }
            
        }
        handleAsyncFetch()
    }

    const prevStep = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setStep(1)
    }

    // const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        
    // }

    return (
        <main className="w-full h-full fixed overflow-auto top-0 bg-[url(/cafe-pattern.jpg)]">
            <div className="absolute w-full h-full z-10 bg-brown-normal bg-opacity-60 top-0 right-0"></div>
            <NotificationComponent />
            <div className="md:w-[720px] lg:w-[1000px] w-11/12 mx-auto relative h-full">
                <h1 className="text-center text-[34px] pt-10 text-white font-bold relative z-20">قهوه خونه</h1>
                <h1 className="text-center text-[50px] pb-10 font-black text-white relative z-20">ورود یا ایجاد حساب</h1>
                <div className="form-wrapper z-20 h-mx pb-20 mt-4">
                    <div className="flex justify-center">
                            <div className={step == 1 ? "step-1 lg:py-10" : "step-1 hidden"}>
                                
                                <span className="font-normal text-md"></span>
                                <div className="md:w-[620px] mx-auto">
                                    <div className="md:w-[620px] mt-5 text-start">
                                        <label htmlFor="phoneNumber" className="text-md my-4">شماره همراه: </label>
                                        <input type="text" id="phoneNumber" name="phone_number" onChange={(e) => setPhoneNumber(e.target.value)} className="form-control md:w-[620px] w-full" placeholder="شماره موبایل خود را وارد نمایید" />
                                    </div>
                                    
                                    <div className={step == 1 ? "mt-10 text-center" : "mt-10 text-center lg:w-[620px] hidden"}>
                                        <button disabled={phoneNumber.length < 11} className="btn btn-blue font-normal" id="continue" onClick={sendOtpCode}>
                                            {loading ? 
                                            <ThreeDot size="medium" color={'#DBF3FE'} />
                                            :
                                            "ورود به حساب کاربری"
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className={step == 2 ? "step-2 lg:py-10" : "step-2 hidden"}>
                                <span className="font-light text-md">رمز یکبار مصرف ارسال شده به شماره همراه خود را وارید نمایید</span>
                                <div className="md:w-[620px] mx-auto">
                                    <div className="md:w-[620px] lg:mt-5 text-start">
                                        <label htmlFor="otpCode" className="text-md my-4">رمز یکبار مصرف: </label>
                                        <input type="text" id="otpCode" name="otp_code" className="form-control md:w-[620px] w-full" onChange={(e) => setOtpCode(e.target.value)} placeholder="نام کاربری خود  را بنویسید" />
                                    </div>
                                    
                                    <div className={step == 2 ? "mt-10 text-center " : "mt-10 text-center hidden"}>
                                        <button id="register" onClick={verifyOtpCode} disabled={loading} className="btn btn-green mt-4">
                                            { loading ? 
                                                <ThreeDot size="medium" color={'#DBF3FE'} />
                                            :
                                            "تایید رمز یکبار مصرف"
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </main>
        )
    }

export default Login