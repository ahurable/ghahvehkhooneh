import { Modal, ModalHeader, ModalBody } from "@/components/modals/modals"
import { ErrorModal, SuccessModal } from "@/layouts/Modals/MessageModals"
import { setEditBannerState } from "@/lib/features/adminModalSlice"
import { useAppSelector } from "@/lib/hook"
import { LOCALHOST } from "@/lib/variebles"
import { ChangeEvent, FormEvent, useState } from "react"
import { useDispatch } from "react-redux"


const ChangeBanner = ({cafeid}:{cafeid:number}) => {
    const state = useAppSelector(s => s.admin.showEditBanner)
    const dispatch = useDispatch()
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<{state: boolean, desc: string}>({state: false, desc: ""})
    const [pictures, setPictures] = useState<File[]>([])

    const handleChange = (evt:ChangeEvent<HTMLInputElement>) => {
        if (evt.target.files) {
            const files = Array.from(evt.target.files); // Convert FileList to an array
            setPictures(files);
        }
    }

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (pictures.length < 1){
            setError({state: true, desc: "از صحت داده های وارد شده اطمینان پیدا کنید. اگر انتخاب نکردید یک عکس یا بیشتر انتخاب کنید."})
            return null
        }
        const formData = new FormData(e.currentTarget)
        formData.append('id', cafeid.toString())
        pictures.forEach(picture =>
            formData.append(`pictures`, picture) // You can name them as needed
        )
        let token
        try {
            token = localStorage.getItem('access')
            const res = await fetch(LOCALHOST + 'api/admin/cafe/update/banner/' + cafeid + '/', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            })
            if (res.ok) {
                setSuccess(true)
                location.reload()
            }
        }
        catch {
            location.replace('/logout')
        }
    }

    

    return (
        <>
        <Modal show={state}>
            <ErrorModal title={"خطا"} description={error.desc} state={error.state} />
            <SuccessModal title="موفق" description="تصویر بنر کافه شما با موفقیت تغییر کرد" state={success} />
            <ModalHeader onClose={() => dispatch(setEditBannerState(false))}>
                <h1>تغییر تصویر بنر کافه</h1>
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit}>
                    <input type="file" multiple accept="images/*" onChange={handleChange} name="pictures" id="" className="form-control w-full my-4" />
                    <br />
                    <input type="submit" value="ثبت تغییر" className="btn-red p-4 w-full" />
                </form>
            </ModalBody>
        </Modal>
        </>
    )
}

export default ChangeBanner