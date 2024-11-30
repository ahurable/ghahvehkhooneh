import { ErrorModal, SuccessModal } from "@/layouts/Modals/MessageModals"
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import { categoryFood } from "@/lib/types"
import { LOCALHOST } from "@/lib/variebles"
import { Modal, ModalBody, ModalHeader } from "@/components/modals/modals"
import { FormEvent, useEffect, useState } from "react"
import { setAddItemModalState } from "@/lib/features/adminModalSlice"

const AddItemWrapper = ({cafeid}:{cafeid:number|undefined}) => {

    const state = useAppSelector(state => state.admin.additem)
    const dispatch = useAppDispatch()
    const [successState, setSuccessState] = useState(false)
    const [errorState, setErrorState] = useState(false)
    const [cats, setCats] = useState<categoryFood[]>()

    useEffect(
        () => {
            const asyncHandler = async () => {
                const token = localStorage.getItem('access')
                const res = await fetch(LOCALHOST+'api/admin/add/menu/'+cafeid+'/', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (res.ok){
                    const data = await res.json()
                    setCats(data)
                }
                else {
                    setErrorState(true)
                }
            }
            asyncHandler()
        } , []
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
                <SuccessModal title={""} description="با موفقیت ثبت شد" state={successState} />
                <ErrorModal description={"خطایی رخ داد. لطفا اطلاعات را کامل وارد کنید"} state={errorState} redirectPath={null} title={null} />
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


export default AddItemWrapper