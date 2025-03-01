import { SuccessModal } from "@/layouts/Modals/MessageModals"
import { useAuth } from "@/lib/Context/AuthContext"
import { LOCALHOST } from "@/lib/variebles"
import { Modal, ModalBody, ModalHeader } from "flowbite-react"
import { useEffect, useState } from "react"


const DeleteEnsurance = ({cafeId, categoryId, show}:{cafeId?:number, categoryId?: number, show: boolean}) => {
    const { accessToken } = useAuth()
    const [state, setState] = useState<boolean>(false)
    useEffect(() => {
        setState(show)
    }, [show])
    const [ ok, setOk ] = useState(false)
    const handleDelete = async (categoryId:number) => {
        const token = accessToken
        if (token && token.length > 0){
            const res = await fetch(
                `${LOCALHOST}api/cafes/delete/category/${cafeId}/${categoryId}/`,
                {
                    method: 'delete',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            if (res.status == 201){
                setTimeout(()=>{
                    setOk(true)
                },500)
                setOk(false)
            }
        }
    } 
    if (!categoryId)
        return null
    return (
        <Modal show={state} onClose={() => setState(false)}>
            <SuccessModal title={"موفق"} description={"عملیات با موفقیت انجام شد"} state={ok} />
            <ModalHeader>
                <h1 className="font-black">حذف آیتم !</h1>
            </ModalHeader>
            <ModalBody>
                <span>
                    آیا از حذف این آیتم مطمئن هستید؟
                </span>
                <button className="btn btn-green my-4 w-full block" onClick={() => handleDelete(categoryId)}>
                    بله
                </button>
                <button className="btn btn-red w-full block" onClick={
                    () => setState(false)
                }>
                    انصراف
                </button>
            </ModalBody>
        </Modal>
    )
}   

export default DeleteEnsurance