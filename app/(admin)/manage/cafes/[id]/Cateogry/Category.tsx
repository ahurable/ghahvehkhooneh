import { SuccessModal } from "@/layouts/Modals/MessageModals"
import { setShowAddCategory } from "@/lib/features/adminModalSlice"
import { LOCALHOST } from "@/lib/variebles"
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useDispatch } from "react-redux"
import DeleteEnsurance from "./DeleteEnsurance"


export default function Category ({cafeId, categories}:{cafeId:number, categories: {id:number, name:string}[]}) {
    const dispatch = useDispatch()
    const [ showDelete, setShowDelete ] = useState<{cafeId?:number, categoryId?: number, show: boolean}>({
        cafeId: undefined,
        categoryId: undefined,
        show:false
    })
    return (
        <div className="w-full">
            <div className="w-full">
                <button className="btn-blue w-full p-5" onClick={() => dispatch(setShowAddCategory(true))}>ایجاد دسته بندی جدید</button>
            </div>
            <div className="w-full mt-8">
                {
                    categories.map(category => (
                        <div key={category.id}>
                            <div className="w-full bg-yellow-very-melo p-8 rounded-2xl border mt-4 border-opacity-30 border-yellow-500 flex items-center justify-between">
                                <span className="text-brown block w-max">
                                    {category.name}
                                </span>
                                <div className="w-max">
                                    <button className="btn bg-green-400 text-white border-b border-b-4 border-b-green-500 mx-4">
                                         <FontAwesomeIcon icon={faEdit}/>
                                    </button>
                                    <button className="btn btn-light-red" onClick={() => setShowDelete({
                                        cafeId: cafeId,
                                        categoryId: category.id,
                                        show: true
                                    })}>
                                         <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
                
                <DeleteEnsurance {...showDelete} />
            </div>
        </div>
    )
}