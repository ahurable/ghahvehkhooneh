import { Modal, ModalBody, ModalHeader } from "@/components/modals/modals"
import { setEditClubMembers } from "@/lib/features/adminModalSlice"
import { useAppSelector } from "@/lib/hook"
import { userWithAnyProfileType } from "@/lib/types"
import { LOCALHOST } from "@/lib/variebles"
import { faRemove } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"




const ClubMembersWrapper = ({cafeid}:{cafeid:number}) => {
    const state = useAppSelector(state => state.admin.editClubMembers)
    const dispatch = useDispatch()
    const [users, setUsers] = useState<userWithAnyProfileType[]>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('access')
        const fetchData = async () => {
            const res = await fetch(LOCALHOST + 'api/admin/club/members/' + cafeid + '/', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }

            })
            if (!res.ok){
                
            }
            const data = await res.json()
            setUsers(data)
            setLoading(false)
        } 
        fetchData()
    }, [cafeid])

    return (
        <>
            <Modal show={state}>
                <ModalHeader onClose={() => dispatch(setEditClubMembers(false))}>
                    <h1>مشاهده و ویرایش اعضا</h1>
                </ModalHeader>
                <ModalBody>
                    <div className="p-4 w-full">
                        {
                            loading ?
                            <div className="w-full flex justify-center mt-12">
                                LOADING
                            </div> :
                            users?.map(user => [
                                <div key={user.id} className="w-full border-b">
                                    <div className="p-4">
                                        <div className="w-full grid grid-cols-12 items-center">
                                            <div className="col-span-10 flex">
                                                <div className="w-[40px] h-[40px]">
                                                    <img src={LOCALHOST +user.profile.avatar} alt="" className="rounded-full w-full h-full object-cover" />
                                                </div>
                                                <span className="block text-xl ms-4">{user.profile.first_name} {user.profile.last_name}</span>
                                            </div>
                                            <div className="col-span-2 ">
                                                <div className="p-2 rounded-full block w-max h-max bg-red-400 text-white">
                                                    <FontAwesomeIcon icon={faRemove}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ])
                        }
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default ClubMembersWrapper