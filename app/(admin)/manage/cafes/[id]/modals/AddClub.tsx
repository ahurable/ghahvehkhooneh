import { SuccessModal } from "@/layouts/Modals/MessageModals"
import { setAddClubState } from "@/lib/features/adminModalSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import { LOCALHOST } from "@/lib/variebles"
import { Modal, ModalBody, ModalHeader } from "@/components/modals/modals"
import { FormEvent, useState } from "react"

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

export default AddClub