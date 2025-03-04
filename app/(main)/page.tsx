import logo from "@/assets/img/logo72x72.png"
import EventWrapper from "@/components/Events"
import { CafeCardListSliderWrapper } from "@/components/main/slider"
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CityPicker, SelectCityModal } from "@/components/main/CityPicker"
import Head from "next/head"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: 'گپی - قهوه به صرف دوست',
    description: "همنشینی با دوست به صرف قهوه ، پروفایل ساز کافه ، رویداد های کافه های شهرت رو سریع پیدا کن و اونی که خیلی دوست داری رو شرکت کن",
    keywords: "کافه های اطراف من , کافه های اصفهان , کافه های شهر , کافه های تهران ,کافه های تهارن , دوستیابی , منوی کافه , منوساز , منو ساز , منوساز کافه , منو ساز کافه , منوی کیو آر, منوی qr , بهترین جا های تهران , بهترین جاهای تهران , لوکیشن های خوب"
}


const Page = () => {

    
    return (
        <>
            
            <div className="w-full relative">
                <div className=" text-center shadow flex items-center justify-center py-3">
                    <Image src={'/logo-wide.png'} width={200} height={100} className="w-[80px]" alt=""/>
                </div>
                <a href="/social" className="absolute block right-4 p-[11px] top-4 w-10 h-10 rounded-2xl bg-slate-50 shadow-sm">
                    <span className=" text-greenny-dark">
                        <FontAwesomeIcon icon={faPeopleGroup} />
                    </span>
                </a>
            </div>

            <div className="my-8">
                <CityPicker />

                <CafeCardListSliderWrapper />
            </div>


            <div className="w-full p-4">
                <div className="bg-brown-normal text-center py-10 rounded-3xl p-4">
                    <Image src={'/people.png'} width={600} height={400} className="mx-auto block lg:w-[300px]" alt=""  />
                    <span className="text-yellow-very-melo text-[2rem] font-black">بهترین مقصد برای توقف کجاست؟</span><br />
                    <span className="text-yellow-very-melo">با گپی میتونید کافه های شهر رو پیدا کنی و ببینی که داخلشون چخبره</span>
                </div>
            </div>
            <div className="w-full p-4">
                <div className="bg-pink-melo text-center py-10 rounded-3xl p-4">
                    <span className="text-yellow-very-melo text-[2rem] font-black">برای استفاده از خدمات سایت حساب ایجاد کنید</span><br />
                    <span className="text-yellow-very-melo">ضمن اینکه ما در نسخه آزمایشی به سر میبریم و داریم روی خودمون کار میکنیم تا بتونیم سرویس های بیشتر و بهتری ارائه بدیم</span>
                    <a href="/login" className="bg-white p-4 text-brown-dark block mt-4 rounded-xl font-bold">ایجاد یا ورود به حساب</a>
                </div>
            </div>

            <div className="container">
                <div className="p-4">
                    <span className="w-4 h-4 rounded-full bg-green-400 p-1 me-4"></span>
                    <span className="text-brown-normal">رویداد های فعال</span>
                </div>
                <EventWrapper />
            </div>
        </>
    )
}



export default Page