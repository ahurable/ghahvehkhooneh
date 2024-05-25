"use client"

import { cafeInformation } from "@/components/CafeComponents"
import { SuccessModal } from "@/layouts/Modals/MessageModals"
import { setAddItemModalState } from "@/lib/features/adminModalSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import { cafeDetailedType, categoryFood } from "@/lib/types"
import { LOCALHOST } from "@/lib/variebles"
import { faEdit } from "@fortawesome/free-regular-svg-icons"
import { faFileEdit, faPlusCircle, faUserEdit, faUserGroup } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Modal, ModalBody, ModalHeader } from "flowbite-react"
import { FormEvent, useEffect, useState } from "react"



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
                            <button className="rounded-full mt-4 mr-4 p-4 bg-white text-black">
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
                                {
                                    cafe.club == null ?
                                    <button className="btn btn-blue mt-2 w-full p-4 text-center items-center flex gap-2 justify-center">
                                        <FontAwesomeIcon icon={faUserGroup} /> ایجاد باشگاه کافه
                                    </button>
                                    :
                                    <button className="btn btn-red mt-2 w-full p-4 text-center items-center flex gap-2 justify-center">
                                        <FontAwesomeIcon icon={faUserGroup} /> ویرایش اعضا
                                    </button>
                                }
                                <AddEditClub />
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
                                    <div key={item.id} className="w-full md:w-1/2 lg:w-1/3 p-2">
                                        <div className="w-full rounded-3xl shadow p-4">
                                            <div className="w-full flex">
                                                <div className="w-1/4">
                                                    <img src={LOCALHOST + item.picture} alt="" className="w-40 rounded-full object-cover" />
                                                </div>
                                                <div className="w-3/4 ps-2">
                                                    <h1 className="text-lg">{item.item}</h1>
                                                    <p>{item.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ])
                            }
                        </div>
                    </div>
                    <AddItemWrapper cafeid={cafe?.id}/>
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
        if (res.ok) {
            setSuccessState(true)
        }
        
    }

    return (
        <>

            <Modal show={state} onClose={() => dispatch(setAddItemModalState(!state))}>
                <ModalHeader>
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
                            <select id="categoryId" name="category">
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

            <SuccessModal title="موفق" description="ثبت آیتم با موفقیت انجام شد" redirectPath="" state={successState} />
        </>
    )
}


const AddEditClub = () => {

    return (
        <>

            <div className="w-full rounded-3xl shadow p-4">
                <div className="text-center w-full">
                    <h1 className="font-bold">ایجاد باشگاه مشتریان</h1>
                </div>
                <div className="pt-4">
                    <form>
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
                            <input type="file" placeholder="نام باشگاه مشتریان شما" className="form-control w-full" name="picture" />
                        </div>
                    </form>
                </div>
            </div>
        
        </>
    )
}


export default Page