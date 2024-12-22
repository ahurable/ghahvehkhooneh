import { Modal, ModalBody, ModalHeader } from "@/components/modals/modals"
import { SuccessModal } from "@/layouts/Modals/MessageModals"
import { setShowAddCategory } from "@/lib/features/adminModalSlice"
import { useAppSelector } from "@/lib/hook"
import { LOCALHOST } from "@/lib/variebles"
import { FormEvent, useState } from "react"
import { useDispatch } from "react-redux"



const AddCategory = ({cafeId}: {cafeId: number}) => {
    const state = useAppSelector(s => s.admin.showAddCategory)
    const dispatch = useDispatch()
    const [ ok, setOk] = useState(false)
    async function handleSubmit (e:FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const token = localStorage.getItem('access')
        const formData = new FormData(e.currentTarget)
        if (token && token.length > 0) {
            const res = await fetch(
                `${LOCALHOST}api/cafes/add/category/${cafeId}/`,
                {
                    method: 'post',
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: formData
                }
            )
            if (res.status == 201){
                setOk(true)
                setTimeout(() => setOk(false), 1000)
            }
        }
    }
    return (
        <Modal show={state}>
            <SuccessModal state={ok} title={"موفق"} description={"دسته بندی شما با موفقیت انجام شد"} />
            <ModalHeader onClose={() => dispatch(setShowAddCategory(false))}>
                <h1>افزودن دسته بندی جدید</h1>
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit}>
                    <input className="form-control w-full" name="name" placeholder="نام دسته بندی خود را وارد کنید" />
                    <button className="btn-blue p-4 mt-4" type="submit">افزودن دسته بندی</button>
                </form>
            </ModalBody>
        </Modal>
    )
}

export default AddCategory