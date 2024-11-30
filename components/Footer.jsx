"use client"
import { faUser, faUserCircle } from "@fortawesome/free-regular-svg-icons"
import { faCoffee, faHome, faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { jwtDecode } from "jwt-decode"
import Link from "next/link"
import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"
import { LOCALHOST } from "@/lib/variebles"
import { AddButton } from "./Buttons"
import { useAppSelector } from "@/lib/hook"

const Footer = () => {
    const avatar = useAppSelector(s => s.user.avatar)
    const username = useAppSelector(s => s.user.username)
    const footerRef = useRef()
    const [sy, setSy] = useState(0)
    useEffect(() => {
        console.log(username)
        console.log(location.pathname == "/main")
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
        <React.Fragment>
            
            {
                location.pathname == "/" ?
                <AddButton url={"/add"} show={true} />
                :
                <AddButton url={"/add"} show={false} />
            }
            <div className="w-full z-20 border-t fixed bottom-0 border transition-all bg-[#FFFFF5]" ref={footerRef}>
                <div className="w-full grid grid-cols-12 items-center">
                    <div className="col-span-4 p-3 ">
                        <div className="w-full text-center">
                            <span className="text-brown-dark">
                                {
                                    localStorage.getItem('access') ? <img className="rounded-full w-8 h-8 inline-table" alt="" src={avatar} /> :<FontAwesomeIcon icon={faUserCircle}/>
                                }
                                
                            </span>
                            <br />
                            <Link href='/profile' className="text-xs">
                                پروفایل
                            </Link>
                        </div>
                    </div>
                    <div className="col-span-4 p-3 ">
                        <a href="/">
                            <div className="w-full text-center">
                                <span className="text-brown-dark">
                                    <FontAwesomeIcon icon={faHome}/>
                                </span>
                                <br />
                                <span className="text-xs text-brown-dark">
                                    خانه
                                </span>
                            </div>
                        </a>
                    </div>
                    <div className="col-span-4 p-3 ">
                        <div className="w-full text-center">
                            <span className="text-brown-dark">
                                <FontAwesomeIcon icon={faCoffee}/>
                            </span>
                            <br />
                            <Link href='/cafe' className="text-xs text-brown-dark">
                                کافه ها
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Footer