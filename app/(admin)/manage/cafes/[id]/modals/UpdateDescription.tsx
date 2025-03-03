import { Modal, ModalBody, ModalHeader } from "@/components/modals/modals"
import { SuccessModal } from "@/layouts/Modals/MessageModals"
import { useAuth } from "@/lib/Context/AuthContext"
import { setEditDescription } from "@/lib/features/adminModalSlice"
import { useAppSelector } from "@/lib/hook"
import { LOCALHOST } from "@/lib/variebles"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { useDispatch } from "react-redux"

const UpdateDescription = ({cafeid}:{cafeid:number}) => {
    const state = useAppSelector(s => s.admin.editDescription)
    const dispatch = useDispatch()
    const [success, setSuccess] = useState(false)
    const { accessToken } = useAuth()
    const router = useRouter()
    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        formData.append('id', cafeid.toString())
        let token
        try {
            token = accessToken
            const res = await fetch(LOCALHOST + 'api/admin/cafe/update/description/' + cafeid + '/', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            })
            if (res.ok) {
                setTimeout(() => 
                    setSuccess(true), 1000)
                dispatch(setEditDescription(false))                
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
            <SuccessModal title="موفق" description="تصویر بنر کافه شما با موفقیت تغییر کرد" state={success} />
            <ModalHeader onClose={() => dispatch(setEditDescription(false))}>
                <h1>ویرایش توضیحات کافه</h1>
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="about" id="" className="form-control w-full my-4" />
                    <br />
                    <input type="submit" value="ثبت تغییر" className="btn-red p-4 w-full" />
                </form>
            </ModalBody>
        </Modal>
        </>
    )
}

export default UpdateDescription