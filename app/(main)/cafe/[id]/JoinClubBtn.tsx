"use client"

import NotificationComponent from "@/layouts/Modals/MessageModals"
import { useAuth } from "@/lib/Context/AuthContext"
import { useNotification } from "@/lib/Context/NotificationContext"
import { LOCALHOST } from "@/lib/variebles"
import { faUserGroup } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { ThreeDot } from "react-loading-indicators"


const JoinClubBtn = ({clubId}:{clubId:number}) => {
    const { user, accessToken } = useAuth()
    const { showNotification } = useNotification()
    const [loading, setLoading] = useState<boolean>(false)
    const [isMember, setIsMember] = useState<boolean>(false)
    useEffect(() => {
        const checkIsMember = async () => {
            const response = await fetch(LOCALHOST+'api/club/is/member/'+clubId+'/', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            console.log('join check sent')
            if (response.status == 201){
                setIsMember(true) 
            }
        }
        if (user) {
            checkIsMember
        }
    })
    const handleJoinClub = async () => {
        setLoading(true)
        if (user && isMember == false) {
            const res = await fetch(LOCALHOST+'api/club/add/member/'+ clubId +'/', {
                method: 'post',
                headers : {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (res.ok) {
                setLoading(false)
                setIsMember(true)
                showNotification(
                    "موفق",
                    'success',
                    true,
                    'شما اکنون عضوی از باشگاه میباشید'
                )
            } else if (res.status == 401) {
                setLoading(false)
                showNotification(
                    "خطا",
                    'error',
                    true,
                    'وارد حساب کاربری خود شوید یا اگر قبلا شدید خارج شوید دوباره وارد شوید'
                )
            }
            
            else {
                setLoading(false)
                showNotification(
                    "خطا",
                    'error',
                    true,
                    'در عضویت شما مشکلی به وجود آمد'
                )
            } 
        } else {
            setLoading(false)
            showNotification(
                "خطا",
                'error',
                true,
                'ابتدا وارد حساب کاربری خود شوید'
            )
        }

    }
    return (
        <>
        <NotificationComponent />
        <button disabled={loading} onClick={handleJoinClub} className="btn btn-white block text-center w-full items-center mt-4">
           { isMember ?  <>شما عضوی از باشگاه مشتریان هستید <FontAwesomeIcon icon={faUserGroup}/></>  :
            loading ? <ThreeDot color={'#ffffff'}/> : <>عضویت در باشگاه مشتریان <FontAwesomeIcon icon={faUserGroup}/></> }
        </button>

        </>

    )
}

export default JoinClubBtn