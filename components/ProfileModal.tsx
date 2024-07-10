'use client'
import { Modal, ModalFooter } from "@/components/modals/modals"
import { ModalHeader, ModalBody } from "@/components/modals/modals"
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import { setProfileModalState } from "@/lib/features/profileModalSlice"
import { FormEvent } from "react"
import { LOCALHOST } from "@/lib/variebles"

type props = {
    firstName: string,
    lastName: string,
    bio: string
}

const ProfileModal = ({ profile } : { profile: props }) => {

    const isOpenState = useAppSelector((state) => state.profilemodal.isOpen)
    const dispatch = useAppDispatch()

    const profileSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(e.currentTarget)
        let formData = new FormData(e.currentTarget)
        console.log(formData)
        const token = localStorage.getItem('access')
        const response = await fetch(LOCALHOST + "api/auth/update-profile-info/", {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        })
        const data = await response.json()
        if (response.status == 200) {
            alert("اطلاعات شما با موفقیت بروزرسانی شد.")
            location.reload()
        } else if(response.status == 400) {
            alert("فرمت اطلاعات وارد شده درست نمی باشد")
        }
    }

    return (
        <Modal show={isOpenState} >
                <ModalHeader onClose={() => dispatch(setProfileModalState(false))}>
                    <h1>ویرایش اطلاعات پروفایل</h1>
                </ModalHeader>
                <form method="post" onSubmit={profileSubmit}>
                <ModalBody>
                    <div className="w-full my-2">
                        <label htmlFor="nameInput">نام:</label>
                        <input type="text" id="nameInput" name="first_name" value={profile.firstName == "" ? null : profile.firstName} placeholder='نام خود را وارد کنید' className="form-control w-full" />
                    </div>
                    <div className="w-full my-2">
                        <label htmlFor="lastnameInput">نام خانوادگی:</label>
                        <input type="text" id="lastnameInput" name="last_name"  value={profile.lastName == "" ? null : profile.lastName} placeholder='نام خانوادگی خود را وارد کنید' className="form-control w-full" />
                    </div>
                    <div className="w-full my-2">
                        <label htmlFor="bioInput">بیوگرافی:</label>
                        <textarea id="bioInput" name="bio" defaultValue={ profile.bio == "" ? null : profile.bio } placeholder='بیوگرافی خود را وارد کنید' className="form-control w-full" ></textarea>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-red m-2" onClick={() => dispatch(setProfileModalState(false))}>انصراف</button>
                    <button type="submit" className="btn btn-blue m-2">ثبت تغییرات </button>
                </ModalFooter>
                </form>
            </Modal>
    )
}

export default ProfileModal