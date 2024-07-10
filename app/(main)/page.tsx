
import logo from "@/assets/img/logo72x72.png"
import { AddButton } from "@/components/Buttons"
import EventWrapper from "@/components/Events"
import { CafeCardListSliderWrapper, CardWrapper } from "@/components/main/slider"
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"




const Page = () => {

    return (
        <>
            <div className="w-full relative">
                <div className=" text-center shadow flex items-center justify-center">
                    <div className="w-10 h-10 me-2">
                        <img src={logo.src} className="w-full h-full" alt="" />
                    </div>
                    <h1 className="title-wrapper text-lg text-brown-dark py-5 font-bold">قهوهخونه</h1>
                </div>
                <a href="/social" className="absolute block right-4 p-[11px] top-4 w-10 h-10 rounded-2xl bg-slate-50 shadow-sm">
                    <span className=" text-brown-normal">
                        <FontAwesomeIcon icon={faPeopleGroup} />
                    </span>
                </a>
            </div>

            <div className="my-8">
                <div className="p-4">
                    <span className="w-4 h-4 rounded-full bg-red-400 p-1 me-4"></span>
                    <span className="text-brown-normal">کافه های محدوده شما</span>
                </div>
                <CafeCardListSliderWrapper />
            </div>


            <div className="w-full p-4">
                <div className="bg-brown-normal text-center py-10 rounded-3xl"><span className="text-yellow-very-melo text-xl">دوستان تو پیدا کن</span></div>
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