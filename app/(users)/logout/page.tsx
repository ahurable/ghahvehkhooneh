"use client"
import { useEffect } from "react"
import { redirect } from "next/navigation"

const Logout = () => {
    useEffect(()=>{
        if(localStorage.getItem('access')) {
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            redirect('/')
        } else {
            redirect('/')
        }
    })
}
export default Logout