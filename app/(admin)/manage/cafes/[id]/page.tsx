"use client"

import { cafeInformation } from "@/components/CafeComponents"
import { ErrorModal, SuccessModal } from "@/layouts/Modals/MessageModals"
import { setAddClubState, setAddItemModalState, setEditBannerState, setEditClubMembers, setEditDescription, setEditItem, setQrCodeState } from "@/lib/features/adminModalSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import { cafeDetailedType, categoryFood, userWithAnyProfileType } from "@/lib/types"
import { LOCALHOST } from "@/lib/variebles"
import { faEdit } from "@fortawesome/free-regular-svg-icons"
import { faClose, faFileEdit, faL, faPlusCircle, faQrcode, faRemove, faUserEdit, faUserGroup } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Modal, ModalBody, ModalHeader } from "@/components/modals/modals"
import { FormEvent, useEffect, useState } from "react"
import QRCode from 'react-qr-code'
import { useDispatch } from "react-redux"
import { AddCategory, AddClub, AddItemWrapper, ChangeBanner, ClubMembersWrapper, QrCodeWrapper, UpdateDescription, UpdateMenuItem } from "./modals"
import Category from "./Cateogry/Category"


const Page = ({params}: {params: {id:number}}) => {


    const [loading, setLoading] = useState(true)
    const [cafe, setCafe] = useState<cafeDetailedType>()
    const dispatch = useAppDispatch()

    useEffect(()=>{
        const fetchAsync = async () => {
            const token = localStorage.getItem('access')
            const res = await fetch(LOCALHOST + 'api/admin/cafes/' + params.id + '/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res.status == 404) {
                location.replace('/manage')
            }
            const data = await res.json()
            console.log(data)
            setCafe(data)
            setLoading(false)
        }
        fetchAsync()
    },[Page])

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
                        <img src={ typeof(cafe.pictures) == "object" && cafe.pictures.length > 0 && LOCALHOST + cafe.pictures[0] || './default-banner.png'} className="w-full h-[340px] object-cover rounded-3xl" alt="" />
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
                                    <img src={LOCALHOST + cafe?.club.club_avatar} className="rounded-2xl" alt="" />
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
                            <QrCodeWrapper cafeid={cafe.id}/>
                            <ClubMembersWrapper cafeid={cafe.id}/>
                            <ChangeBanner cafeid={cafe.id} />
                            <UpdateDescription cafeid={cafe.id} />
                            <AddCategory cafeId={cafe.id} />
                            <UpdateMenuItem />
                        </>
                    }
                    </>
                }
            </div>
        </>
    )

}


// const MenuItems = () => {
//     <div className="w-full mt-4">
//         <div className="flex flex-wrap">
//             {
//                 cafe?.menu_item != null &&
//                 cafe?.menu_item.map(item => [
//                     <div key={item.id} className="w-full md:w-1/2 p-2">
//                         <div className="w-full rounded-3xl shadow p-4">
//                             <div className="w-full grid grid-cols-6 items-center">
//                                 <div className="col-span-1">
//                                     <img src={LOCALHOST + item.picture} alt="" className="w-16 h-16 rounded-full object-cover" />
//                                 </div>
//                                 <div className="col-span-4 ps-2">
//                                     <h1 className="text-lg">{item.item}</h1>
//                                     <p>{item.description}</p>
//                                 </div>
//                                 <div className="col-span-1 flex flex-wrap justify-center">
//                                     <button className="block h-8 p-2 bg-gray-400 rounded-full text-white" onClick={() => dispatch(setEditItem({
//                                         id: item.id,
//                                         title: item?.item,
//                                         description: item?.description,
//                                         price: item?.price,
//                                         state: true
//                                     }))}><FontAwesomeIcon icon={faEdit}/></button>
//                                     <span className="block h-8 p-2 bg-red-400 rounded-full text-white mx-1"><FontAwesomeIcon icon={faClose}/></span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ])
//             }
//         </div>
//     </div>
// }




export default Page