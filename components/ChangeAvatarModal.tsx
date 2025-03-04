import { setAvatarModalState } from "@/lib/features/avatarModalSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hook"
// import { refreshToken } from "@/lib/utils"
import { LOCALHOST } from "@/lib/variebles"
import { jwtDecode, JwtPayload } from "jwt-decode"
import { redirect } from "next/dist/server/api-utils"
import React, { FormEvent, useState } from "react"
import { Modal, ModalBody, ModalFooter, ModalHeader } from "./modals/modals"
import { useAuth } from "@/lib/Context/AuthContext"
import { useRouter } from "next/navigation"
import { ThreeDot } from "react-loading-indicators"
import { useNotification } from "@/lib/Context/NotificationContext"

const ChangeAvatarModal = () => {

    const dispatch = useAppDispatch()
    const isOpenState = useAppSelector(state => state.avatarmodal.isOpen)
    const [selectedFile, setFile] = useState({})

    const [loading, setLoading] = useState<boolean>(false)
    const { refreshAccessToken, accessToken } = useAuth()
    const router = useRouter()
    const access = accessToken
    // const onChangeFile = (e) => {
    //     setFile(e.currentTarget.files[0])
    // }
    const { showNotification } = useNotification()
    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        
        if (!access || access.length ==0 || typeof(access) != 'string' || access==null)
            router.push('/')
        let id = typeof(access)=='string' && jwtDecode<JwtPayload & {user_id:number|string}>(access).user_id
        // console.log(id)
        let formData = new FormData(e.currentTarget)
        if(selectedFile !== null){
            // formData.append(
            //     "avatar",
            //     selectedFile,
            //     selectedFile.name
            // )
            const token = access
            const response = await fetch(LOCALHOST + "api/auth/update-avatar/", {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    // 'Content-Disposition': `attachment; filename=${selectedFile.name}`,
                },
                body: formData,

            })
            if (response.status == 200) {
                setLoading(false)
                showNotification(
                    "تغییر پروفایل شما تغییر کرد",
                    'success',
                    true,
                    '',
                    '/profile'
                )
                refreshAccessToken()
                router.refresh()
            } else {
                setLoading(false)
                alert("مشکلی در بروزرسانی پروفایل شما رخ داد")
            }
        }
        else{
            setLoading(false)
            showNotification(
                'لطفا یک عکس انتخاب کنید',
                'error',
                true,
                '',
            )
            return
        }
        
        
    }

    return (

        <React.Fragment>

            <Modal show={isOpenState}>
                <ModalHeader onClose={() => dispatch(setAvatarModalState(false))}>
                    <h1>بروزرسانی پروفایل</h1>
                </ModalHeader>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                <ModalBody>
                    <input type="file" accept="image/*" name="avatar"/>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-blue" disabled={loading} type="submit">
                        {
                            loading ? 
                            <ThreeDot size="medium" color={'#DBF3FE'} />
                            :
                            "ثبت تصویر جدید"
                        }
                        
                    </button>
                </ModalFooter>
                </form>
            </Modal>

        </React.Fragment>

    )

}

export default ChangeAvatarModal