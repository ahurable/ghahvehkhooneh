import logo from "@/assets/img/logo72x72.png"
import EventWrapper from "@/components/Events"
import { CafeCardListSliderWrapper } from "@/components/main/slider"
import { faPeopleGroup, faShop } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CityPicker, SelectCityModal } from "@/components/main/CityPicker"
import Head from "next/head"
import Image from "next/image"
import type { Metadata } from "next"
import { faCalendar, faUser } from "@fortawesome/free-regular-svg-icons"

export const metadata: Metadata = {
    title: 'گپی - قهوه به صرف دوست',
    description: "همنشینی با دوست به صرف قهوه ، پروفایل ساز کافه ، رویداد های کافه های شهرت رو سریع پیدا کن و اونی که خیلی دوست داری رو شرکت کن",
    keywords: "کافه های اطراف من , کافه های اصفهان , کافه های شهر , کافه های تهران ,کافه های تهارن , دوستیابی , منوی کافه , منوساز , منو ساز , منوساز کافه , منو ساز کافه , منوی کیو آر, منوی qr , بهترین جا های تهران , بهترین جاهای تهران , لوکیشن های خوب"
}


const Page = () => {

    
    return (
        <>
            
            <div className="w-full relative">
                <div className=" text-start flex items-start justify-start ps-8 py-3">
                    <Image src={'/logo-wide.png'} width={200} height={100} className="w-[80px]" alt=""/>
                </div>
                <a href="/social" className="absolute block left-4 p-[11px] top-4 w-10 h-10 rounded-2xl bg-slate-50 shadow-sm">
                    <span className=" text-greenny-dark">
                        <FontAwesomeIcon icon={faPeopleGroup} />
                    </span>
                </a>
            </div>

            <div className="mt-8">
                <CityPicker />

                <CafeCardListSliderWrapper />
            </div>


            <div className="w-full p-4">
                <div className=" text-center py-10 rounded-xl p-4">
                    <Image src={'/people.png'} width={600} height={400} className="mx-auto block lg:w-[300px]" alt=""  />
                    <span className="text-brown-normal text-[2rem] font-black">بهترین مقصد برای توقف کجاست؟</span><br />
                    <span className="text-brown-normal">با گپی میتونید کافه های شهر رو پیدا کنی و ببینی که داخلشون چخبره</span>
                </div>
            </div>

            <div className="w-full p-2">
                <div className="w-full flex">
                    <div className="w-1/3 p-2 flex justify-center text-center items-center flex-col">
                        <a href="login" className="block w-full">
                            <div className="w-full flex shadow flex-col items-center border border-purple-500 rounded-xl p-2"> 
                                <span className="block text-purple-500 text-[2rem]"><FontAwesomeIcon icon={faUser} scale={44} /></span>
                                <span className="text-sm text-purple-500">ورود به حساب</span>
                            </div>
                        </a>
                    </div>
                    <div className="w-1/3 p-2 flex justify-center text-center items-center flex-col">
                        <a href="#events" className="block w-full">
                            <div className="w-full flex shadow flex-col items-center border border-purple-500 rounded-xl p-2">
                            <span className="block text-purple-500 text-[2rem]"><FontAwesomeIcon icon={faCalendar} scale={44} /></span>
                                <span className="text-sm text-purple-500">رویداد ها</span>
                            </div>
                        </a>
                    </div>
                    <div className="w-1/3 p-2 flex justify-center text-center items-center flex-col">
                        <a href="cafe" className="block w-full">
                            <div className="w-full flex shadow flex-col items-center border border-purple-500 rounded-xl p-2">
                            <span className="block text-purple-500 text-[2rem]"><FontAwesomeIcon icon={faShop} scale={44} /></span>
                                <span className="text-sm text-purple-500">کافه ها</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="p-4" id="events">
                    <span className="w-4 h-4 rounded-full bg-green-400 p-1 me-4"></span>
                    <span className="text-brown-normal">رویداد های فعال</span>
                </div>
                <EventWrapper />
            </div>
        </>
    )
}



export default Page