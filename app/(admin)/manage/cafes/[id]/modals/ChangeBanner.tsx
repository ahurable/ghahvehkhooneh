"use client"
import { Modal, ModalHeader, ModalBody } from "@/components/modals/modals"
import { ErrorModal, SuccessModal } from "@/layouts/Modals/MessageModals"
import { useAuth } from "@/lib/Context/AuthContext"
import { setEditBannerState } from "@/lib/features/adminModalSlice"
import { useAppSelector } from "@/lib/hook"
import { IMAGE_HOST, LOCALHOST } from "@/lib/variebles"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image, { StaticImageData } from "next/image"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useDispatch } from "react-redux"


const ChangeBanner = ({cafeid, pics}:{cafeid:number, pics?: {id: number, picture: string | StaticImageData}[]}) => {
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

    const { accessToken } = useAuth()
    const router = useRouter()
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
            token = accessToken
            const res = await fetch(LOCALHOST + 'api/admin/cafe/update/banner/' + cafeid + '/', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            })
            if (res.ok) {
                setSuccess(true)
                router.refresh()
            }
        }
        catch {
            router.push('/logout')
        }
    }

    const handleDeleteImage = (id:number) => {
        let token 
        token = accessToken
        if (!token || token.length == 0)
            router.push('/logout')
        fetch(LOCALHOST + `api/admin/cafes/${cafeid}/pictures/`, {
            method: 'DELETE',
            headers: {
                Authorization: `bearer ${token}`
            },
            body: JSON.stringify({picture_id : id})
        })
        .then(res => {
            if (!res.ok)
                alert('در انجام عملیات حذف مشکلی به وجود آمد')
            alert('حذف با موفقیت انجام شد')
        })
    }
    // const [pics, setPics] = useState<{id:number, picture:string|StaticImageData}[]>([])
    // const [loading, setLoading] = useState<boolean>(true)
    // useEffect(() => {
    //     const handleRequest = async () => {
    //         const res = await fetch(LOCALHOST + `api/admin/cafes/${cafeid}/pictures/`)
    //         const data = await res.json()
    //         console.log(data)
    //         setPics(data)
    //     }
    //     handleRequest()
    //     setLoading(false)
    // }, [])

    return (
        <>
        <Modal show={state}>
            <ErrorModal title={"خطا"} description={error.desc} state={error.state} />
            <SuccessModal title="موفق" description="تصویر بنر کافه شما با موفقیت تغییر کرد" state={success} />
            <ModalHeader onClose={() => dispatch(setEditBannerState(false))}>
                <h1>تغییر تصویر بنر کافه</h1>
            </ModalHeader>
            <ModalBody>
                <div className="w-full">

                    {
                        pics && pics.length > 0 &&

                        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4" >
                            {pics.map(pict => [
                                    <div className="aspect-square relative rounded-lg flex items-center justify-center" key={pict.id}>
                                        <button className="absolute top-2 right-2 z-[20] text-white" onClick={() => handleDeleteImage(pict.id)}><FontAwesomeIcon icon={faClose} /></button>
                                        <Image src={IMAGE_HOST + pict.picture} className="w-full h-full rounded-lg object-cover absolute top-0" alt="" width={100} height={100} />
                                    </div>
                            ])}

                        </div>
                    }
                </div>
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