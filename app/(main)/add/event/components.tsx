import { TrimedIconCard } from "@/components/Cards"
import { SuccessModal } from "@/layouts/Modals/MessageModals"
import { cafeCardType, cafeIdNameType, smallClubType } from "@/lib/types"
import { LOCALHOST } from "@/lib/variebles"
import { faCalendarCheck, faShop, faTable } from "@fortawesome/free-solid-svg-icons"
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import { setEventCafe, setEventClub, setEventStep } from "@/lib/features/eventStep"

import { MultiStepsForm } from "@/layouts/MultiStepsForm/MultiStepsForm"



type Steps = {
    idx: number;
    label: string;
    input: {
        type: string;
        placeholder: string;
        name: string;
        id: string;
        multiple?: boolean;
        classNames: string | null;
    };
    helpText: string;
    isLastStep: boolean;
    nextButtonText: string;
}[];

const steps: Steps = [
    {
        idx: 1,
        label: "نام رویداد",
        input: {
            type: "text",
            placeholder: "نام رویداد خود را وارد کنید",
            name: "name",
            id: "name",
            classNames: null,
        },
        helpText: "در مرحله اول شما لازم است نام رویداد خود را وارد کنید. بهتر است از یک نام خوب برای کاربران مخاطب خود استفاده کنید مثلا 'دورهمی نوازندگان یا دورهمی برنامه نویس ها'",
        isLastStep: false,
        nextButtonText: "ادامه"
    },
    {
        idx: 2,
        label: "توضیحات",
        input: {
            type: "textarea",
            placeholder: "توضیحات رویداد را وارد کنید",
            name: "about",
            id: "about",
            classNames: null,
        },
        helpText: "راجب رویداد خود و محیط آن توضیحاتی دهید که منجر به جذب کاربر شود",
        isLastStep: false,
        nextButtonText: "ادامه"
    },
    {
        idx: 3,
        label: "تاریخ برگزاری رویداد را انتخاب نمایید",
        input: {
            type: "datepicker",
            placeholder: "",
            name: "date",
            id: "date",
            classNames: null,
        },
        helpText: "راجب رویداد خود و محیط آن توضیحاتی دهید که منجر به جذب کاربر شود",
        isLastStep: true,
        nextButtonText: "ادامه"
    },
]

export const CreateEventForm = () => <MultiStepsForm props={{
    pageTitle: "ثبت رویداد",
    steps: steps,
    errorMessage: "مشکلی در ثبت کافه شما به وجود آمده است",
    successMessage: "کافه شما با موفقیت ثبت شد",
    fetchUrl: `${LOCALHOST}api/cafes/add/`,
    redirectPath: "",
}} />



export const SelectClubs = () => {

    const [loading, setLoading] = useState(true)
    const [clubs, setClubs] = useState<smallClubType[]>()
    const [ hasClub, setHasClub ] = useState<boolean>(true)
    useEffect(() => {
        const fetchUserClubs = async () => {
            const token = localStorage.getItem('access')
            const res = await fetch(LOCALHOST + 'hook/user-clubs/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res.status == 400) {
                setHasClub(false)
            }else if (!res.ok) {
                setHasClub(false)
            } 
            return res.json()
        }
        const asyncHandler = async () => {
            const _clubs = await fetchUserClubs()
            setClubs(_clubs)
            setLoading(false)
        }
        asyncHandler()
    }, [SelectClubs])
    const dispatch = useAppDispatch()

    return (
        <>
        <div className="w-full">
            <div className="container p-4">
                <div className="grid grid-cols-12">
                {   loading ? 
                    <div className="col-span-12 pt-14">
                        <span className="text-lg font-bold text-center">در حال بارگیری...</span>
                    </div>
                    : hasClub == false ? 
                    <div className="col-span-12 p-4 rounded-3xl shadow">
                        <span>هیچ باشگاهی برای شما یافت نشد. شما باید توسط باشگاه به عنوان گرداننده شناخته شوید.</span>
                    </div>
                    :
                    clubs?.map(club => [
                    <div key={club.id} onClick={() => {
                        dispatch(setEventClub(club.id))
                        dispatch(setEventStep(1))
                    }} className="col-span-6 md:col-span-4 lg:col-span-3 p-2">
                        <div className="rounded-lg shadow p-3">
                            <div className="w-full flex justify-center">
                                <img src={LOCALHOST + club.club_avatar} alt="" className="rounded-full w-20 h-20 object-cover" />
                            </div>
                            <div className="w-full text-center pt-3">
                                <span>{club.name}</span>
                            </div>
                        </div>
                    </div>         
                    ])
                }
                </div>
            </div>
        </div>
        </>
    )

}


export const SelectCafe = () => {

    const [loading, setLoading] = useState(true)
    const [cafes, setCafes] = useState<cafeCardType[]>()
    const dispatch = useAppDispatch()

    useEffect(() => {
        const fetchAllCafeInArea = async () => {
            const res = await fetch( LOCALHOST + 'api/cafes/list/')
            if (!res.ok)
                throw new Error('Failed to fetch list of cafes for creating event')
            return res.json()
        }
        const handleAsync = async () => {
            const _cafes = await fetchAllCafeInArea()
            setCafes(_cafes)
            setLoading(false)
        }
        handleAsync()
    }, [SelectCafe])


    return (
        <>

            <div className="w-full">
                <div className="container p-4">
                    <div className="grid grid-cols-12">
                        {
                            loading ? <div className="col-span-12 text-center">
                                <span className="text-lg font-bold pt-10">درحال بارگیری...</span>
                            </div> : cafes?.map(cafe => [
                                <div key={cafe.id} className="col-span-6 md:col-span-4 lg:col-span-3 p-2" onClick={() => {
                                    dispatch(setEventCafe(cafe.id))
                                    dispatch(setEventStep(1))
                                }}>
                                    <div className="w-full bg-brown-normal text-white rounded-3xl shadow p-4">
                                        <div className="w-full">
                                            <img src={LOCALHOST + cafe.picture} alt="" className="rounded-2xl object-cover w-full h-32" />
                                        </div>
                                        <div className="w-full pt-2">
                                            <span className="font-normal text-lg block">{cafe.name}</span>
                                        </div>
                                    </div>
                                </div>
                            ])
                        }
                    </div>
                </div>
            </div>
        
        </>
    )
}


export const AddButtons = () => {
    const dispatch = useAppDispatch()

    return (
        <div className="w-full">
            <div className="container">
                <div className="w-full">
                    <TrimedIconCard iconName={faCalendarCheck} altText="ایجاد یک رویداد جدید" onClick={() => {location.replace('/add/event')}} />
                    <TrimedIconCard iconName={faShop} altText="درخواست ایجاد پروفایل کافه" onClick={() => {location.replace('/add/cafe')}} />
                </div>
            </div>
        </div>
    )
}


