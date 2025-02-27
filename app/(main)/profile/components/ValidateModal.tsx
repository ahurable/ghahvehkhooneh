import { Modal, ModalHeader, ModalBody } from "@/components/modals/modals"
import { ErrorModal, SuccessModal } from "@/layouts/Modals/MessageModals"
import { useAuth } from "@/lib/Context/AuthContext"
import { setPhoneValidationModal } from "@/lib/features/profileModalSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import { LOCALHOST } from "@/lib/variebles"
import { FormEvent, useEffect, useState } from "react"

export const ValidateModal = ({phoneNumber}:{phoneNumber:string}) => {
    const access = localStorage.getItem('access')
    const show = useAppSelector( s => s.profilemodal.isPhoneValidationModal)
    // if the otp code generated in backend successfully it would be true
    const [ otpSat, setOtpSat ] = useState<boolean>(false)
    const [ error, setError ] = useState<{
        title:string,
        description: string,
        state:boolean
    }>({
        title:"",
        description:"",
        state:false,
    })
    const [ success, setSuccess ] = useState<{
        title:string,
        description: string,
        state:boolean
    }>({
        title:"",
        description:"",
        state:false,
    })
    const dispatch = useAppDispatch()
    const { accessToken, refreshAccessToken } = useAuth()
    useEffect(() => {
        const handleAsync = async () => {
            const res = await fetch(LOCALHOST+'request-otp/', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${access}`
                },
                body: JSON.stringify({phone_number:phoneNumber})
            })
            if (res.ok){
                setOtpSat(true)
                setSuccess(
                    {
                        title: "موفق",
                        description: "کد یک بار مصرف با موفقیت ایجاد شد",
                        state: true,
                    }
                )
                setTimeout(() => {
                    setSuccess(
                        {
                            title: "موفق",
                            description: "کد یک بار مصرف با موفقیت ایجاد شد",
                            state: false,
                        }
                    )
                },1000)
            }
            else {
                setError(
                    {
                        title: "خطا",
                        description: "مشکلی هنگام ایجاد رمز یکبار مصرف سمت سرور رخ داد",
                        state: true,
                    }
                )
                setTimeout(() => {
                    setError(
                        {
                            title: "خطا",
                            description: "مشکلی هنگام ایجاد رمز یکبار مصرف سمت سرور رخ داد",
                            state: false,
                        }
                    )
                },1000)
            }
        }
        if (show)
            handleAsync()
    }, [show])
    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        formData.append('phone_number', phoneNumber)
        const res = await fetch(LOCALHOST+'verify-otp/', {
            method: 'post',
            body: formData,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (res.ok){
            setSuccess({
                title: "عملیات موفق",
                description: "شماره شما با موفقیت تایید شد",
                state: true
            })
            refreshAccessToken()
            location.reload()
        }
        else {
            setError(
                {
                    title: "خطا",
                    description: "مشکلی هنگام تایید رمز یکبار مصرف سمت سرور رخ داد",
                    state: true,
                }
            )
            setTimeout(() => {
                setError(
                    {
                        title: "خطا",
                        description: "مشکلی هنگام تایید رمز یکبار مصرف سمت سرور رخ داد",
                        state: false,
                    }
                )
            },1000)
        }
    }
    return (
        <>
            <Modal show={show}>
                <ModalHeader onClose={() => dispatch(setPhoneValidationModal(false))}>
                    تایید شماره
                </ModalHeader>
                <ModalBody>
                    <form className="flex flex-col justify-center" onSubmit={handleSubmit}>
                        <input type="text" className="form-control" name="otp_code"  placeholder="کد تایید را وارد کنید" />
                        <button type="submit" className="btn w-full btn-blue mt-4">تایید شماره</button>
                    </form>
                </ModalBody>
            </Modal>
            <ErrorModal title={error.title} description={error.description} state={error.state} />
            <SuccessModal title={success.title} description={success.description} state={success.state} />
        </>
    )
}