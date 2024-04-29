'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState, useRef } from "react"

export const InviteButton = () => {

    const inviteButtonRef = useRef()
    const [sy, setSy] = useState(0)
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > sy) {
                inviteButtonRef.current.style.marginBottom = "-80px"

                setSy(window.scrollY)
            } else if (window.scrollY < sy) {
                inviteButtonRef.current.style.marginBottom = "0px"
                setSy(window.scrollY)
            }
        })
    })

    return (
        <a href="/cafe/invite" ref={inviteButtonRef} className='btn rounded-full w-16 h-16 transition-all text-center text-2xl fixed bottom-24 right-4 bg-brown-normal text-white'>
            <FontAwesomeIcon icon={faPlus} className='my-2'/>
        </a>
    )
}