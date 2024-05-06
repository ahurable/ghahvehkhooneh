import { ChangeEvent } from "react"
import { userType } from "./types"
import { LOCALHOST } from "./variebles"


export const sendFollowReq = async (id:number) => {
    const res = await fetch(LOCALHOST + 'api/users/follow/'+id+'/', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`
        }
    })
    if(!res.ok) {
        throw new Error('Failed to send follow request')
    } else {
        alert('با موفقیت به لیست فالور های شما اضافه شد')
    }
    const data = await res.json()
    return data
}


export const sendUnfollowReq = async (id:number) => {
    const res = await fetch(LOCALHOST + 'api/users/unfollow/'+id+'/', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`
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

    return res.json()
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