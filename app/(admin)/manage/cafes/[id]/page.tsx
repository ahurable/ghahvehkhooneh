"use client"

// import { cafeInformation } from "@/components/CafeComponents"
import { ErrorModal, SuccessModal } from "@/layouts/Modals/MessageModals"
import { setAddClubState, setAddItemModalState, setEditBannerState, setEditClubMembers, setEditDescription, setEditItem, setLocationModalState, setQrCodeState } from "@/lib/features/adminModalSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import { cafeDetailedType, categoryFood, userWithAnyProfileType } from "@/lib/types"
import { IMAGE_HOST, LOCALHOST } from "@/lib/variebles"
import { faEdit } from "@fortawesome/free-regular-svg-icons"
import { faClose, faFileEdit, faL, faPlusCircle, faQrcode, faRemove, faUserEdit, faUserGroup } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Modal, ModalBody, ModalHeader } from "@/components/modals/modals"
import { FormEvent, useEffect, useState } from "react"
import QRCode from 'react-qr-code'
import { useDispatch } from "react-redux"
import { AddCategory, AddClub, AddItemWrapper, ChangeBanner, ClubMembersWrapper, QrCodeWrapper, UpdateDescription, UpdateMenuItem } from "./modals"
import Category from "./Cateogry/Category"
import { useRouter } from "next/navigation"
import Image from "next/image"
import AddLocationWrapper from "./modals/AddLocation"


const Page = ({params}: {params: {id:number}}) => {


    const [loading, setLoading] = useState(true)
    const [cafe, setCafe] = useState<cafeDetailedType>()
    const dispatch = useAppDispatch()
    const router = useRouter()
    useEffect(()=>{
        const fetchAsync = async () => {
            const token = localStorage.getItem('access')
            const res = await fetch(LOCALHOST + 'api/admin/cafes/' + params.id + '/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res.status == 404) {
                router.push('/manage')
            }
            const data = await res.json()
            setCafe(data)
            setLoading(false)
        }
        fetchAsync()
    },[router, params.id])

    const [addItemState, setAddItemState] = useState(false)
    if (!cafe)
        return "درحال بارگزاری"
    return (
        <>
            <div className="container p-4">
                {
                    loading ?
                    <span className="text-lg mt-20">در حال بارگیری اطلاعات</span>
                    :
                    <>
                    <div className="w-full rounded-3xl shadow-lg mb-4 relative">
                        

                        <Image src={typeof(cafe.pictures) == "object" && cafe.pictures.length > 0 && IMAGE_HOST + cafe.pictures[0].picture || '/default-banner.png'} width={1000} height={500} className="w-full h-[340px] object-cover rounded-3xl" alt="" />
                        
                        
                        <div className="w-full h-full absolute top-0 bg-black bg-opacity-25 rounded-3xl">
                            <button className="rounded-full mt-4 mr-4 p-4 bg-white text-black" onClick={() => dispatch(setEditBannerState(true))}>
                                <FontAwesomeIcon icon={faFileEdit}/>
                            </button>
                            <span className="ps-4 text-sm text-white font-bold">تغییر تصویر بنر</span>
                        </div>
                    </div>
                    <div className="w-full p-4">
                        <div className="w-full">
                            <h1 className="text-3xl font-bold">{cafe?.name}</h1>
                            <p><FontAwesomeIcon icon={faEdit} /> {cafe?.about}</p>
                        </div>
                        <div className="w-full md:flex">
                            {
                                cafe.club && <div className="w-full md:w-3/4 flex pt-4">
                                <div className="w-40 h-40">
                                    <Image src={IMAGE_HOST + cafe?.club.club_avatar} width={100} height={100} className="rounded-2xl" alt="" />
                                </div>
                                <div className="ps-4">
                                    <h1 className="text-xl font-bold">
                                        {cafe?.club.name}</h1>
                                    <p>{cafe?.club.description }</p>
                                </div>
                            </div>
                            }
                            <div className="w-full md:w-1/4 pt-4">
                                <button className="btn btn-green w-full p-4 text-center items-center flex gap-2 justify-center" onClick={() => dispatch(setEditDescription(true))}>
                                    <FontAwesomeIcon icon={faEdit} /> ویرایش اطلاعات
                                </button>
                                <button className="btn btn-blue w-full mt-2 p-4 text-center items-center flex gap-2 justify-center" onClick={() => dispatch(setQrCodeState(true))}>
                                    <FontAwesomeIcon icon={faQrcode} /> نمایش QR
                                </button>
                                <button className="btn btn-blue w-full mt-2 p-4 text-center items-center flex gap-2 justify-center" onClick={() => dispatch(setLocationModalState(true))}>
                                    <FontAwesomeIcon icon={faQrcode} /> افزودن لوکیشن کافه
                                </button>
                                {
                                    cafe.club == null ?
                                    <>
                                        <button className="btn btn-blue mt-2 w-full p-4 text-center items-center flex gap-2 justify-center" onClick={() => dispatch(setAddClubState(true))}>
                                            <FontAwesomeIcon icon={faUserGroup} /> ایجاد باشگاه کافه
                                        </button> 
                                        <AddClub id={params.id}/>
                                    </>
                                    :
                                    <button className="btn btn-red mt-2 w-full p-4 text-center items-center flex gap-2 justify-center" onClick={() => dispatch(setEditClubMembers(true))}>
                                        <FontAwesomeIcon icon={faUserGroup} /> ویرایش اعضا
                                    </button>

                                }
                            </div>
                        </div>
                    </div>
                    <Category cafeId={cafe.id} categories={cafe.categories} />
                    
                    {
                        cafe != undefined && 
                        <>
                            <AddItemWrapper cafeid={cafe.id}/>
                            <QrCodeWrapper cafeid={cafe.slug}/>
                            <ClubMembersWrapper cafeid={cafe.id}/>
                            <ChangeBanner cafeid={cafe.id} pics={cafe.pictures} />
                            <UpdateDescription cafeid={cafe.id} />
                            <AddCategory cafeId={cafe.id} />
                            <UpdateMenuItem />
                            <AddLocationWrapper cafeid={cafe.id} />
                        </>
                    }
                    </>
                }
            </div>
        </>
    )

}



export default Page