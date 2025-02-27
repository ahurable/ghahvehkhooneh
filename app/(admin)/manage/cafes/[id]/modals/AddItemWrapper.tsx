import { ErrorModal, SuccessModal } from "@/layouts/Modals/MessageModals"
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import { categoryFood } from "@/lib/types"
import { LOCALHOST } from "@/lib/variebles"
import { Modal, ModalBody, ModalHeader } from "@/components/modals/modals"
import { FormEvent, useEffect, useState } from "react"
import { refreshAddItem, setAddItemModalState, setEditCategoryState } from "@/lib/features/adminModalSlice"

const AddItemWrapper = ({cafeid}:{cafeid:number}) => {

    const state = useAppSelector(s=>s.admin.additem.show)
    const categoryId = useAppSelector(s=>s.admin.additem.categoryId)
    const refAdd = useAppSelector(s=>s.admin.refAdd)
    const dispatch = useAppDispatch()
    const [ ok, setOk ] = useState(false)
    const [errorState, setErrorState] = useState(false)
    const [cats, setCats] = useState<categoryFood[]>()

    useEffect(
        () => {
            const asyncHandler = async () => {
                const token = localStorage.getItem('access')
                const res = await fetch(LOCALHOST+'api/admin/add/menu/' + cafeid +'/' +categoryId+'/', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (res.ok){
                    const data = await res.json()
                    setCats(data)
                    setOk(true)
                }
                else {
                    setErrorState(true)
                }
            }
            asyncHandler()
            console.log('refreshed')
        } , [refAdd]
    )

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const token = localStorage.getItem('access')
        const res = await fetch(LOCALHOST + 'api/admin/add/menu/' + cafeid + '/' + categoryId + '/', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData
        })
        if (res.status == 201) {
            setOk(true)
            setTimeout(()=> {
                setOk(false)

                dispatch(refreshAddItem())
            },1000)
        }
        
    }

    return (
        <>

            <Modal show={state} >
                <SuccessModal title={""} description="با موفقیت ثبت شد" state={ok} />
                <ErrorModal description={"خطایی رخ داد. لطفا اطلاعات را کامل وارد کنید"} state={errorState} redirectPath={null} title={null} />
                <ModalHeader onClose={() => dispatch(setAddItemModalState({categoryId, show:false}))}>
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
                            <button className="btn btn-green w-full p-4">افزودن</button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>

        </>
    )
}


export default AddItemWrapper