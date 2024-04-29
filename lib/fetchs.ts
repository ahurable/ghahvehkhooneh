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