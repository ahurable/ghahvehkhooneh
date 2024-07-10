"use client"

import { cafeInformation } from "@/components/CafeComponents"
import { SuccessModal } from "@/layouts/Modals/MessageModals"
import { setAddClubState, setAddItemModalState, setEditBannerState, setEditClubMembers, setQrCodeState } from "@/lib/features/adminModalSlice"
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
            // console.log(data)
            setCafe(data)
            setLoading(false)
        }
        fetchAsync()
    },[Page])

    const [addItemState, setAddItemState] = useState(false)

    return (
        <>
            <div className="container p-4">
                {
                    loading ?
                    <span className="text-lg mt-20">در حال بارگیری اطلاعات</span>
                    :
                    <>
                    <div className="w-full rounded-3xl shadow-lg mb-4 relative">
                        <img src={LOCALHOST + cafe?.picture} className="w-full h-[340px] object-cover rounded-3xl" alt="" />
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
                                <button className="btn btn-green w-full p-4 text-center items-center flex gap-2 justify-center">
                                    <FontAwesomeIcon icon={faEdit} /> ویرایش اطلاعات
                                </button>
                                <button className="btn btn-blue w-full mt-2 p-4 text-center items-center flex gap-2 justify-center" onClick={() => dispatch(setQrCodeState(true))}>
                                    <FontAwesomeIcon icon={faQrcode} /> نمایش QR
                                </button>
                                {
                                    cafe.club == null ?
                                    <>=
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
                    <div className="w-full mt-4">
                        <div className="w-full my-4"><span className="text-lg">ویرایش منو</span></div>
                        <div className="w-full p-4">
                            <button className="w-full p-4 btn btn-blue items-center flex gap-2 justify-center" onClick={() => dispatch(setAddItemModalState(true))}><FontAwesomeIcon icon={faPlusCircle} /> افزودن آیتم جدید</button>
                        </div>
                    </div>
                    <div className="w-full mt-4">
                        <div className="flex flex-wrap">
                            {
                                cafe?.menu_item != null &&
                                cafe?.menu_item.map(item => [
                                    <div key={item.id} className="w-full md:w-1/2 p-2">
                                        <div className="w-full rounded-3xl shadow p-4">
                                            <div className="w-full grid grid-cols-6 items-center">
                                                <div className="col-span-1">
                                                    <img src={LOCALHOST + item.picture} alt="" className="w-16 h-16 rounded-full object-cover" />
                                                </div>
                                                <div className="col-span-4 ps-2">
                                                    <h1 className="text-lg">{item.item}</h1>
                                                    <p>{item.description}</p>
                                                </div>
                                                <div className="col-span-1 flex flex-wrap justify-center">
                                                    <span className="block h-8 p-2 bg-gray-400 rounded-full text-white"><FontAwesomeIcon icon={faEdit}/></span>
                                                    <span className="block h-8 p-2 bg-red-400 rounded-full text-white mx-1"><FontAwesomeIcon icon={faClose}/></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ])
                            }
                        </div>
                    </div>
                    <AddItemWrapper cafeid={cafe?.id}/>
                    <QrCodeWrapper cafeid={cafe?.id}/>
                    <ClubMembersWrapper cafeid={cafe?.id}/>
                    <ChangeBanner cafeid={cafe?.id} />
                    </>
                }
            </div>
        </>
    )

}


const AddItemWrapper = ({cafeid}:{cafeid:number|undefined}) => {

    const state = useAppSelector(state => state.admin.additem)
    const dispatch = useAppDispatch()
    const [successState, setSuccessState] = useState(false)
    const [cats, setCats] = useState<categoryFood[]>()

    useState(
        () => {
            const asyncHandler = async () => {
                const token = localStorage.getItem('access')
                const res = await fetch(LOCALHOST+'api/admin/add/menu/'+cafeid+'/', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                const data = await res.json()
                setCats(data)
            }
            asyncHandler()
        } , [AddItemWrapper]
    )

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const token = localStorage.getItem('access')
        const res = await fetch(LOCALHOST + 'api/admin/add/menu/' + cafeid + '/', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData
        })
        if (res.status == 201) {
            setSuccessState(true)
        }
        
    }

    return (
        <>

            <Modal show={state} >
                <SuccessModal description="با موفقیت ثبت شد" state={successState} />
                <ModalHeader onClose={() => dispatch(setAddItemModalState(false))}>
                    <h1>افزودن آیتم جدید</h1>
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        <div className="w-full p-4">
                            <label htmlFor="itemId">نام آیتم</label>
                            <input type="text" className="form-control w-full" name="item" id="itemId" />
                        </div>
                        <div className="w-full p-4">
                            <label htmlFor="descriptionId">توضیحات:</label>
                            <textarea className="form-control w-full" name="description" id="descriptionId" ></textarea>
                        </div>
                        <div className="w-full p-4">
                            <label htmlFor="priceId">قیمت:‌</label>
                            <input type="text" className="form-control w-full" name="price" id="priceId" />
                        </div>
                        <div className="w-full p-4">
                            <label htmlFor="pictureId">تصویر:</label>
                            <input type="file" className="form-control w-full" name="picture" id="pictureId" />
                        </div>
                        <div className="w-full p-4">
                            <label htmlFor="categoryId">دسته بندی:</label>
                            <select id="categoryId" name="category" className="form-control w-full">
                                <option value="default">انتخاب دسته بندی</option>
                                {
                                    cats?.map(category => [
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ])
                                }
                            </select>
                        </div>
                        <div className="w-full p-4">
                            <button className="btn btn-green w-full p-4">افزودن</button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>

        </>
    )
}


const AddClub = ({id}:{id:number}) => {

    const state = useAppSelector(s => s.admin.addClub)
    const dispatch = useAppDispatch()

    const [success, setSuccess] = useState(false)
    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const token = localStorage.getItem('access')
        const formData = new FormData(e.currentTarget)
        formData.append('cafe', id.toString())
        const res = await fetch(LOCALHOST + 'api/admin/add/club/' + id + '/', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData
        })
        if (res.status == 201) {
            setSuccess(true)
            location.reload()
        }
        const data = await res.json()
    }
        

    return (
        <>
        <Modal show={state}>
            <SuccessModal title="موفق" description="عملیات موفق" state={success}/>
            <ModalHeader onClose={() => dispatch(setAddClubState(false))}>
                <h1>افزودن باشگاه</h1>
            </ModalHeader>
            <ModalBody>
                <div className={`w-full rounded-3xl shadow p-4 block`}>
                    <div className="text-center w-full">
                        <h1 className="font-bold">ایجاد باشگاه مشتریان</h1>
                    </div>
                    <div className="pt-4">
                        <form onSubmit={handleSubmit}>
                            <div className="w-full">
                                <label htmlFor="name">نام:</label>
                                <input type="text" placeholder="نام باشگاه مشتریان شما" className="form-control w-full" name="name" />
                            </div>
                            <div className="w-full">
                                <label htmlFor="description">درباره باشگاه:</label>
                                <textarea placeholder="چه چیزی شما را متفاوت میکند؟" className="form-control w-full" name="description" ></textarea>
                            </div>
                            <div className="w-full">
                                <label htmlFor="picture">تصویر نمایه:</label>
                                <input type="file" placeholder="نام باشگاه مشتریان شما" className="form-control w-full" name="club_avatar" />
                            </div>
                            <div className="w-full">
                                <button type="submit" className="btn btn-green mt-2">ایجاد باشگاه</button>
                            </div>
                        </form>
                    </div>
                </div>
                </ModalBody>
            </Modal>
        </>
    )
}


const QrCodeWrapper = ({cafeid}:{cafeid:number}) => {
    const state = useAppSelector(state => state.admin.showQR)
    const dispatch = useAppDispatch()
    return (
        <Modal show={state} >
            <ModalHeader onClose={() => dispatch(setQrCodeState(false))}>
                <h1>QR Code</h1>
            </ModalHeader>
            <ModalBody>
                <div className="w-full">
                    <div className="flex justify-center">
                        <div className="p-4 w-full">
                            <QRCode value={`https://localhost:3000/cafe/${cafeid}`} />
                        </div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
}


const ClubMembersWrapper = ({cafeid}:{cafeid:number}) => {
    const state = useAppSelector(state => state.admin.editClubMembers)
    const dispatch = useDispatch()
    const [users, setUsers] = useState<userWithAnyProfileType[]>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('access')
        const fetchData = async () => {
            const res = await fetch(LOCALHOST + 'api/admin/club/members/' + cafeid + '/', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }

            })
            if (!res.ok){
                
            }
            const data = await res.json()
            setUsers(data)
            setLoading(false)
        } 
        fetchData()
    }, [ClubMembersWrapper])

    return (
        <>
            <Modal show={state}>
                <ModalHeader onClose={() => dispatch(setEditClubMembers(false))}>
                    <h1>مشاهده و ویرایش اعضا</h1>
                </ModalHeader>
                <ModalBody>
                    <div className="p-4 w-full">
                        {
                            loading ?
                            <div className="w-full flex justify-center mt-12">
                                LOADING
                            </div> :
                            users?.map(user => [
                                <div key={user.id} className="w-full border-b">
                                    <div className="p-4">
                                        <div className="w-full grid grid-cols-12 items-center">
                                            <div className="col-span-10 flex">
                                                <div className="w-[40px] h-[40px]">
                                                    <img src={LOCALHOST +user.profile.avatar} alt="" className="rounded-full w-full h-full object-cover" />
                                                </div>
                                                <span className="block text-xl ms-4">{user.profile.first_name} {user.profile.last_name}</span>
                                            </div>
                                            <div className="col-span-2 ">
                                                <div className="p-2 rounded-full block w-max h-max bg-red-400 text-white">
                                                    <FontAwesomeIcon icon={faRemove}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ])
                        }
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}


const ChangeBanner = ({cafeid}:{cafeid:number}) => {
    const state = useAppSelector(s => s.admin.showEditBanner)
    const dispatch = useDispatch()
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        formData.append('id', cafeid.toString())
        let token
        try {
            token = localStorage.getItem('access')
            const res = await fetch(LOCALHOST + 'api/admin/update-cafe-banner/' + cafeid + '/', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            })
            if (res.ok) {
                setSuccess(true)
                location.reload()
            }
        }
        catch {
            location.replace('/logout')
        }
    }

    return (
        <>
        <Modal show={state}>
            <SuccessModal title="موفق" description="تصویر بنر کافه شما با موفقیت تغییر کرد" />
            <ModalHeader onClose={() => dispatch(setEditBannerState(false))}>
                <h1>تغییر تصویر بنر کافه</h1>
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit}>
                    <input type="file" name="picture" id="" className="form-control w-full my-4" />
                    <br />
                    <input type="submit" value="ثبت تغییر" className="btn-red p-4 w-full" />
                </form>
            </ModalBody>
        </Modal>
        </>
    )
}

export default Page