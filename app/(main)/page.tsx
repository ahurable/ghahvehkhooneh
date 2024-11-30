"use client"
import logo from "@/assets/img/logo72x72.png"
import { AddButton } from "@/components/Buttons"
import EventWrapper from "@/components/Events"
import { CafeCardListSliderWrapper } from "@/components/main/slider"
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { setSelectCity } from "@/lib/features/profileModalSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import { useEffect } from "react"
import { Modal, ModalHeader, ModalBody } from "@/components/modals/modals"
import { jwtDecode } from "jwt-decode"



const Page = () => {
    const dispatch = useAppDispatch()
    const currentCityId = useAppSelector(s => s.profilemodal.city)
    // const token = localStorage.getItem('access')
    
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
                    <button onClick={() => dispatch(setSelectCity(true))} className="mx-4 p-2 rounded-full bg-green-500 text-white">
                        شهر انتخابی فعلی - اصفهان
                    </button>
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
            <SelectCityModal />
        </>
    )
}

const SelectCityModal = () => {
    const state = useAppSelector(s => s.profilemodal.isCityModal)
    const cities = ["تهران", "اصفهان"]
    const dispatch = useAppDispatch()
    return (
        <>
            <Modal show={state}>
                <ModalHeader onClose={() => dispatch(setSelectCity(false))}>
                    <h2>انتخاب شهر فعلی</h2>
                </ModalHeader>
                <ModalBody>
                    {
                        cities.map(city => (
                            <div key={city} className="w-full p-4">
                                <div className="w-full bg-yellow-very-melo p-4 rounded-2xl">
                                    {city}
                                </div>
                            </div>
                        ))
                    }
                </ModalBody>
            </Modal>
        </>
    )
}

export default Page