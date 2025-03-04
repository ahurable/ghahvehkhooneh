"use client"
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import { CafeCardListSliderWrapper } from "./slider"
import { setCity, setSelectCity } from "@/lib/features/profileModalSlice"
import { Modal, ModalBody, ModalHeader } from "../modals/modals"
import { useEffect, useState } from "react"
import { LOCALHOST } from "@/lib/variebles"
import { useNotification } from "@/lib/Context/NotificationContext"
import { useRouter } from "next/navigation"
import NotificationComponent from "@/layouts/Modals/MessageModals"



export const CityPicker = () => {

    const dispatch = useAppDispatch()
    const currentCity = useAppSelector(s => s.profilemodal.city)
    return (
        <>
            <div className="p-4">
                <span className="w-4 h-4 rounded-full bg-red-400 p-1 me-4"></span>
                <span className="text-brown-normal">کافه های محدوده شما</span>
                <button onClick={() => dispatch(setSelectCity(true))} className="mx-4 p-2 rounded-full bg-green-500 text-white">
                    در شهر { currentCity.name == "default" ? "پیش فرض" : currentCity.name }
                </button>
            </div>

            <SelectCityModal />
        </>
    )
}

export const SelectCityModal = () => {
    const state = useAppSelector(s => s.profilemodal.isCityModal)
    const [cities, setCities] = useState<{id:number, name:string}[]>()
    const { showNotification } = useNotification()
    const router = useRouter()
    useEffect(() => {
        const handleAsync = async () => {
            const res = await fetch(LOCALHOST+'api/users/list-cities/')
            const data = await res.json()
            if (!res.ok)
                alert('مشکلی در دریافت لیست شهر ها به وجود آمد')
            return {status: 'ok', data:data}
        }
        handleAsync().then(d => d.status == 'ok' && setCities(d.data) || null)
    },[])
    const dispatch = useAppDispatch()
    return (
        <>
        <NotificationComponent/>
            <Modal show={state}>
                <ModalHeader onClose={() => dispatch(setSelectCity(false))}>
                    <h2>انتخاب شهر فعلی</h2>
                </ModalHeader>
                <ModalBody>
                <div className="w-full p-4" onClick={() =>{
                        dispatch(setCity({id:0, name:'default'}))
                        showNotification(
                            "عملیات موفق",
                            "success",
                            true,
                            "شهر شما با موفقیت تغییر کرد"
                        ),
                        router.refresh()
                        }}>
                    <div className="w-full bg-yellow-very-melo p-4 rounded-2xl">
                        پیش فرض
                    </div>
                </div>
                    {
                        cities == undefined || cities.length == 0 ? "شهری وجود ندارد" :
                        cities.map(city => (
                            <div key={city.id} className="w-full p-4" onClick={() =>{
                                 dispatch(setCity({id:city.id, name:city.name}))
                                 showNotification(
                                    "عملیات موفق",
                                    "success",
                                    true,
                                    "شهر شما با موفقیت تغییر کرد"
                                 ),
                                 router.refresh()
                                 }}>
                                <div className="w-full bg-yellow-very-melo p-4 rounded-2xl">
                                    {city.name}
                                </div>
                            </div>
                        ))
                    }
                </ModalBody>
            </Modal>
        </>
    )
}