import { setAvatarModalState } from "@/lib/features/avatarModalSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import { LOCALHOST } from "@/lib/variebles"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "flowbite-react"
import React, { FormEvent } from "react"

const ChangeAvatarModal = () => {

    const dispatch = useAppDispatch()
    const isOpenState = useAppSelector(state => state.avatarmodal.isOpen)

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let formData = new FormData(e.currentTarget)
        const token = localStorage.getItem('access')
        const response = await fetch(LOCALHOST + "api/auth/update-avatar/", {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData,

        })
        if (response.status == 200) {
            alert('تصویر پروفایل شما با موفقیت ثبت شد')
            location.reload()
        } else {
            alert("مشکلی در بروزرسانی پروفایل شما رخ داد")
        }
        
    }

    return (

        <React.Fragment>

            <Modal show={isOpenState} onClose={() => dispatch(setAvatarModalState(false))}>
                <ModalHeader>
                    <h1>بروزرسانی پروفایل</h1>
                </ModalHeader>
                <form onSubmit={handleSubmit}>
                <ModalBody>
                    <input type="file" accept=".jpg, .png" name="avatar" className="form-control w-full" />
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-green" type="submit">ثبت تصویر جدید</button>
                </ModalFooter>
                </form>
            </Modal>

        </React.Fragment>

    )

}

export default ChangeAvatarModal