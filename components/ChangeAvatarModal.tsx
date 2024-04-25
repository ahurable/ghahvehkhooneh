import { setAvatarModalState } from "@/lib/features/avatarModalSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import { LOCALHOST } from "@/lib/variebles"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "flowbite-react"
import { jwtDecode } from "jwt-decode"
import React, { FormEvent, useState } from "react"

const ChangeAvatarModal = () => {

    const dispatch = useAppDispatch()
    const isOpenState = useAppSelector(state => state.avatarmodal.isOpen)
    const [selectedFile, setFile] = useState({})

    // const onChangeFile = (e) => {
    //     setFile(e.currentTarget.files[0])
    // }

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(selectedFile)
        let id = jwtDecode(localStorage.getItem('access')).user_id
        // console.log(id)
        let formData = new FormData(e.currentTarget)
        if(selectedFile !== null){
            // formData.append(
            //     "avatar",
            //     selectedFile,
            //     selectedFile.name
            // )
            const token = localStorage.getItem('access')
            const response = await fetch(LOCALHOST + "api/auth/update-avatar/"+id+"/", {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    // 'Content-Disposition': `attachment; filename=${selectedFile.name}`,
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
        else{
            alert("ابتدا فایلی را انتخاب کنید")
            return
        }
        
        
    }

    return (

        <React.Fragment>

            <Modal show={isOpenState} onClose={() => dispatch(setAvatarModalState(false))}>
                <ModalHeader>
                    <h1>بروزرسانی پروفایل</h1>
                </ModalHeader>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                <ModalBody>
                    <input type="file" name="avatar"/>
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