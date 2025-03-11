import { Modal, ModalBody, ModalHeader } from "@/components/modals/modals"
import { SuccessModal } from "@/layouts/Modals/MessageModals"
import { useAuth } from "@/lib/Context/AuthContext"
import { setEditItem } from "@/lib/features/adminModalSlice"
import { useAppSelector } from "@/lib/hook"
import { LOCALHOST } from "@/lib/variebles"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"
import { ThreeDot } from "react-loading-indicators"
import { useDispatch } from "react-redux"

const UpdateMenuItem = () => {
    const state = useAppSelector(s => s.admin.editItem.state)
    const item = useAppSelector(s => s.admin.editItem)
    const dispatch = useDispatch()
    const [success, setSuccess] = useState(false)
    const { accessToken } = useAuth()
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        console.log(state)
    })
    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)
        formData.append('id', item.id.toString())
        let token
        try {
            token = accessToken
            const res = await fetch(LOCALHOST + 'api/admin/cafe/update/menu/item/' + item.id + '/', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            })
            if (res.ok) {
                setSuccess(true)
                setLoading(false)
                router.refresh()
            }
        }
        catch {
            router.push('/logout')
        }
    }

    return (
        <>
        <Modal show={state}>
            <SuccessModal title="موفق" description="اطلاعات آیتم با موفقیت به روز شد" state={success} />
            <ModalHeader onClose={() => dispatch(setEditItem({id:item.id, state:false}))}>
                <h1>ویرایش آیتم</h1>
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="item" defaultValue={item.title || ""} id="" className="form-control w-full my-4" />
                    <br />
                    <input type="text" name="description" defaultValue={item.description || ""} className="form-control w-full my-4" />
                    <br />
                    <input type="text" name="price" defaultValue={item.price || ""} className="form-control w-full my-4" />
    
                    <br />
                    <button type="submit" disabled={loading} className="btn-red p-4 w-full" >
                        {loading? <ThreeDot color={'#ffffff'}/>:"ثبت تغییرات"}
                    </button>
                </form>
            </ModalBody>
        </Modal>
        </>
    )
}

export default UpdateMenuItem