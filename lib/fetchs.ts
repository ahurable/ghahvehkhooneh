import { ChangeEvent } from "react"
import { userType } from "./types"
import { LOCALHOST } from "./variebles"
import { useNotification } from "./Context/NotificationContext"
import { title } from "process"
import { useAuth } from "./Context/AuthContext"


export const sendFollowReq = async (id:number, showNotification: (title: string, type: "success" | "error", state: boolean, message?: string, redirect?: string) => void) => {
    // const { showNotification } = useNotification()
    const { accessToken } = useAuth()
    
    const res = await fetch(LOCALHOST + 'api/users/follow/'+id+'/', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    if(res.ok) {
        showNotification(
            "موفق",
            "success",
            true,
            "با موفقیت دنبال شد",
        )
    } else {
        showNotification(
            "خطا",
            "error",
            true,
            "به پروفایل بروید و وارد حساب خود شوید",
            "/logout"
        )
    }
    const data = await res.json()
    return data
}


export const sendUnfollowReq = async (id:number) => {
    const { accessToken } = useAuth()

    const res = await fetch(LOCALHOST + 'api/users/unfollow/'+id+'/', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    if(!res.ok) {
        throw new Error('Failed to send follow request')
    } else {
        alert('از لیست فالور های شما حذف شد')
    }
    const data = await res.json()
    return data
}


export const fetchAllUsersInArea = async () => {
    const res = await fetch(LOCALHOST + 'api/users/all-in-area/')
    if (!res.ok) {
        throw new Error('Failed to fetch all users in area!')
    }
    return res.json()
} 


export const fetchAllCafeCards = async () => {
    const res = await fetch(LOCALHOST + 'api/cafes/list/cards/')

    if (!res.ok) {
        throw new Error('Failed to fetch data from cafe list cards')
    }
    const data = await res.json()
    console.log(data)
    return data
}


export const fetchOffeCafeHook = async (e:ChangeEvent<HTMLInputElement>) =>{
    const res = await fetch(LOCALHOST + 'hook/offer-cafe/', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({'name':e.currentTarget.value})
    })
    if (!res.ok) {
        throw new Error('Failed to fetch offered cafes')
    }
    return res.json()
}


