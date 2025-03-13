"use client"
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


const Page = () => {
    const router = useRouter()
    useEffect(() => {
        setTimeout(() => router.push('/'), 3000)
    })
    return (
        <div className="container shadow-none">
            <div className="w-full pt-40 p-4">
                <div className="bg-green-400 text-center py-10 rounded-3xl p-4">
                    <span className="text-[5rem] text-yellow-very-melo block"><FontAwesomeIcon icon={faCircleCheck} /></span>
                    <span className="text-yellow-very-melo text-[2rem] font-black">کافه شما با موفقیت در لیست کافه های ما ثبت شد</span><br />
                    <span className="text-yellow-very-melo">پس از بررسی های ادمین های ما با شما تماس خواهیم گرفت.</span>
                </div>
            </div>
        </div>
    )
}

export default Page