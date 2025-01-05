import { ModalHeader, ModalBody, ModalFooter, Modal } from "@/components/modals/modals"
import { setAddItemModalState, setEditCategoryState } from "@/lib/features/adminModalSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import { LOCALHOST } from "@/lib/variebles"
import { faAdd } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { useEffect, useState } from "react"
import AddItemWrapper from "./AddItemWrapper"


type Category = {
    id: number;
    name: string;
    items: {
        id: number;
        item : string;
        description : string;
        picture : string;
        category : string;
        price : string;
    }[]
}

export const EditCategory = ({cafeId}:{cafeId:number}) => {
    const state = useAppSelector(s => s.admin.editCategory.show)
    const dispatch = useAppDispatch()
    const id = useAppSelector(s=>s.admin.editCategory.id)
    const [addItem, setAddItem] = useState<{show: boolean, cafeId:number, categoryId: number}>({
        show: false,
        cafeId: 0,
        categoryId: 0
    })
    const [ ok, setOk ] = useState(false)
    const [ category, setCategory ] = useState<Category>()
    const token = localStorage.getItem('access')
    useEffect(()=>{
        console.log(id)
        const handleAsync = async () => {
            if (token) {
                try {
                    const res = await fetch(
                        LOCALHOST + 'api/cafes/categories/' + cafeId + '/' + id + '/',
                        {
                            headers: {
                                AUthorization: `Bearer ${token}`
                            }
                        }
                    )
                    const data = await res.json()
                    console.log(data)
                    setCategory(data)
                }
                catch {
                    throw Error("An error raised during getting category")
                }
            }
        }
        handleAsync()
    },[id])
    return (
        <>
            <Modal show={state}>
                <ModalHeader onClose={() => dispatch(setEditCategoryState({id, show:false}))}>
                    <h1>ویرایش آیتم های دسته بندی</h1>
                </ModalHeader>
                <ModalBody>
                    { category != undefined ? 
                        category.items && category.items.length > 0 ? 
                            <>
                                <div className="w-full">
                                    <button className="btn btn-green w-full text-2xl" onClick={()=>dispatch(
                                        setAddItemModalState({
                                            categoryId: category.id,
                                            show: true
                                        })
                                    )}>
                                        افزودن آیتم جدید <span className="text-white"><FontAwesomeIcon icon={faAdd}/></span>
                                    </button>
                                    <hr className="my-4" />
                                    {category.items.map(item => [
                                        <div className="w-full p-6" key={item.id}>
                                            <div className="w-2/3 flex items-center">
                                                <div className="w-24 h-24">
                                                    <img src={LOCALHOST + item.picture} alt="picture of the item" width={100} height={100} className="w-full h-full" />
                                                </div>
                                                <div className="w-full">
                                                    <span className="text-xl font-bold">{item.item}</span>
                                                    <br />
                                                    <span className="text-gray-700">{item.description}</span>
                                                    <br />
                                                    <span className="text-brown-normal">{item.price} تومان</span>
                                                </div>
                                            </div>
                                        </div>
                                    ])}
                                </div>
                            </>
                        :
                            <>
                                <div className="w-full my-20">
                                    <span 
                                    className="block w-full p-20 cursor-pointer text-center 
                                    text-xl font-bold rounded-2xl border border-dashed 
                                    border-brown-normal text-brown-normal"
                                    onClick={() => {
                                        dispatch(
                                            setAddItemModalState({
                                                show:true,
                                                categoryId: category.id
                                            })
                                        )
                                    }}
                                    >
                                        هیچ آیتمی در این دسته بندی پیدا نشد. یکی اضافه کنید
                                        <br />
                                        <span className="text-brown-normal opacity-45 mt-8 block text-3xl">
                                            <FontAwesomeIcon icon={faAdd}/>
                                        </span>
                                    </span>
                                </div>
                            </>
                    :
                    <span className="text-3xl font-bold">درحال بارگزاری</span>
                    }
                </ModalBody>
            </Modal>
            <AddItemWrapper cafeId={cafeId} />
        </>
    )
}