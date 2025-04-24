"use client"
import { faUser, faUserCircle } from "@fortawesome/free-regular-svg-icons"
import { faCoffee, faHome, faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { jwtDecode } from "jwt-decode"
import Link from "next/link"
import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"
import { IMAGE_HOST, LOCALHOST } from "@/lib/variebles"
import { AddButton } from "./Buttons"
import { useAppSelector } from "@/lib/hook"
import { useAuth } from "@/lib/Context/AuthContext"
import { usePathname, useRouter } from "next/navigation"

const Footer = () => {
    const {user} = useAuth()
    const footerRef = useRef()
    const [sy, setSy] = useState(0)
    const pathname = usePathname()
    useEffect(() => {
        // console.log(user['avatar'])
        console.log(pathname == "/main")
        window.addEventListener('scroll', () => {
            if (window.scrollY > sy) {
                footerRef.current.style.marginBottom = "-100px"

                setSy(window.scrollY)
            } else if (window.scrollY < sy) {
                footerRef.current.style.marginBottom = "0px"
                setSy(window.scrollY)
            }
        })
    })

    return (
        <div>
            
            {
                pathname == "/" ?
                <AddButton url={"/add"} show={true} />
                :
                <AddButton url={"/add"} show={false} />
            }
            <div className="container z-[1000] left-1/2 transform -translate-x-1/2  border-t fixed bottom-0 border transition-all bg-white" ref={footerRef}>
                <div className="w-full grid grid-cols-12 items-center">
                    <div className="col-span-4 p-3 ">

                    <Link href='/profile'>
                        <div className="w-full text-center">
                            <span className="text-brown-light">
                                {
                                    user != null ? <Image className="rounded-full w-8 h-8 inline-table" alt="" src={IMAGE_HOST + user.avatar} width={50} height={50} /> :<FontAwesomeIcon icon={faUserCircle}/>
                                }
                                
                            </span>
                            <br />
                            <span className="text-xs" >
                                پروفایل
                            </span>
                        </div>
                        </Link>
                    </div>
                    <div className="col-span-4 p-3 ">
                        <a href="/">
                            <div className="w-full text-center">
                                <span className="text-brown-light">
                                    <FontAwesomeIcon icon={faHome}/>
                                </span>
                                <br />
                                <span className="text-xs text-brown-light">
                                    خانه
                                </span>
                            </div>
                        </a>
                    </div>
                    <div className="col-span-4 p-3 ">

                    <Link href='/cafe' className=" text-brown-light">
                        <div className="w-full text-center">
                            <span className="text-brown-light">
                                <FontAwesomeIcon icon={faCoffee}/>
                            </span>
                            <br />
                               <span className="text-xs">کافه ها</span> 
                        </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer