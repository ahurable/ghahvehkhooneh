import { ErrorModal, SuccessModal } from "@/layouts/Modals/MessageModals"
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import { LOCALHOST } from "@/lib/variebles"
import { Modal, ModalBody, ModalHeader } from "@/components/modals/modals"
import { FormEvent, useEffect, useRef, useState } from "react"
import { refreshAddItem, setLocationModalState } from "@/lib/features/adminModalSlice"
import { useAuth } from "@/lib/Context/AuthContext"
import { ThreeDot } from "react-loading-indicators"

const AddLocationWrapper = ({cafeid, location}:{cafeid:number, location?:string}) => {

    const state = useAppSelector(s=>s.admin.location)
    const dispatch = useAppDispatch()
    const [ ok, setOk ] = useState(false)
    const [errorState, setErrorState] = useState(false)
    const [loading, setLoading] = useState<boolean>(false)
    const formRef = useRef<HTMLFormElement>(null); // Reference for the form

    const { accessToken } = useAuth()

    useEffect(() => {
        if (location && location.length > 0)
            console.log(location)
    })

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setLoading(true)
        const formData = new FormData(e.currentTarget)
        const token = accessToken
        const res = await fetch(LOCALHOST + 'api/admin/cafe/' + cafeid + '/location/', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData
        })
        if (res.status == 200) {
            setOk(true)
            setTimeout(()=> {
                setOk(false)
                setLoading(false)
                dispatch(refreshAddItem())
                if ( formRef.current )
                    formRef.current.reset()
            },1000)
        }
        
    }

    return (
        <>

            <Modal show={state} >
                <SuccessModal title={""} description="با موفقیت ثبت شد" state={ok} />
                <ErrorModal description={"خطایی رخ داد. لطفا اطلاعات را دوباره بررسی کنید"} state={errorState} redirectPath={null} title={null} />
                <ModalHeader onClose={() => dispatch(setLocationModalState(false))}>
                    <h1>افزودن لوکیشن گوگل</h1>
                </ModalHeader>
                <ModalBody>
                    <form ref={formRef} onSubmit={handleSubmit}>
                        { location!=undefined && location.length > 0 ?

                        <>
                            <span>لوکیشن شما قبلا ثبت شده است در صورت نیاز برای تغییر موقعیت مکانی خودتان به واتسپ 09903392645 پیام دهید.</span>
                        </>
                        
                        :
                        <>
                        <div className="w-full p-4">
                            <label htmlFor="location">لوکیشن گوگل:</label>
                            <p>لینک وکیشن کافه خود را از برنامه گوگل مپ کپی کنید و اینجا قرار دهید</p>
                            <textarea className="form-control w-full" name="location" id="location" ></textarea>
                        </div>

                        <div className="w-full p-4">
                            <button disabled={loading} className="btn btn-green w-full p-4">
                                {loading ? <ThreeDot color={'#ffffff'}/> : "افزودن"}
                            </button>
                        </div>
                        </>
                        }
                    </form>
                </ModalBody>
            </Modal>

        </>
    )
}


export default AddLocationWrapper