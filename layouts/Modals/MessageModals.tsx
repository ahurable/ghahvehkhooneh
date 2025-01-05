"use client"

import { faCheckCircle } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react"
import { useEffect, useState } from "react"


export const SuccessModal = ({title, description, state, redirectPath}:{title:string | null, description:string | null, state:boolean, redirectPath?:string | null}) => {

    const [show, setShow] = useState<boolean>()
    useEffect(()=>{
        if(state){
            setShow(true)
            if(redirectPath != null && redirectPath.length > 0 ) {
                setTimeout(()=>{
                    location.replace(redirectPath)
                }, 2000)
            } else {
                setTimeout(()=>{
                    setShow(false)
                }, 2000)
            }
                
        }
    },[state])

    return (

        <div className={show ? 'w-full p-4 absolute duration-150 transition-all opacity-100' : 'w-full p-4 absolute duration-150 transition-all opacity-0'} style={ show ? {top:'1rem', zIndex: 100} : {top:'-100px'}}>
            <div className="relative rounded-3xl bg-green-400 text-white p-4">
                { title != null && title.length > 0 && <h1 className="text-md text-white">{title}</h1> }
                { description != null && description.length > 0 && <span className="text-white text-sm">{description}</span> }
            </div>
        </div>

    )

}

export const ErrorModal = ({title, description, state, redirectPath}:{title:string | null, description:string | null, state:boolean, redirectPath?:string | null}) => {

    const [show, setShow] = useState<boolean>()
    useEffect(()=>{
        if(state){
            setShow(true)
            if(redirectPath != null && redirectPath.length > 0 ) {
                setTimeout(()=>{
                    location.replace(redirectPath)
                }, 2000)
            } else {
                setTimeout(()=>{
                    setShow(false)
                }, 2000)
            }
                
        }
    },[state])

    return (

        <div className={show ? 'w-full p-4 absolute duration-150 transition-all opacity-100' : 'w-full p-4 absolute duration-150 transition-all opacity-0'} style={ show ? {top:'1rem', zIndex: 100} : {top:'-100px'}}>
            <div className="relative rounded-3xl bg-red-500 text-white p-4">
                { title != null && title.length > 0 && <h1 className="text-md text-white">{title}</h1> }
                { description != null && description.length > 0 && <span className="text-white text-sm">{description}</span> }
            </div>
        </div>

    )

}