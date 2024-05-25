"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserMinus, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { sendFollowReq } from "@/lib/fetchs"
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState, useRef, MouseEventHandler } from "react"



export const SendFollowButton = ({onClick}:{onClick:MouseEventHandler<HTMLButtonElement>}) => {
    return <button className="btn-circle-slate w-10 h-10 float-left" onClick={onClick}>
        <FontAwesomeIcon icon={faUserPlus} />
    </button>
}

export const SendUnfollowButton = ({classNames, onClick}:{classNames:string|null, onClick:MouseEventHandler<HTMLButtonElement>}) => {
    return <button className={`btn-circle-slate w-10 h-10 float-left ${classNames}`} onClick={onClick}>
    <FontAwesomeIcon icon={faUserMinus} />
</button>
}

export const AddButton = ({url, show}:{url:string, show:boolean}) => {

    const AddButtonRef = useRef()
    const [sy, setSy] = useState(0)
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > sy) {
                AddButtonRef.current.style.marginBottom = "-80px"

                setSy(window.scrollY)
            } else if (window.scrollY < sy) {
                AddButtonRef.current.style.marginBottom = "0px"
                setSy(window.scrollY)
            }
        })
    })

    return (
        <a href={url} ref={AddButtonRef} className={show ? `btn rounded-full w-16 h-16 transition-all text-center text-2xl fixed bottom-24 right-4 bg-brown-normal text-white ` + `block` : `hidden`}>
            <FontAwesomeIcon icon={faPlus} className='my-2'/>
        </a>
    )
}