"use client"
import { faUser, faUserCircle } from "@fortawesome/free-regular-svg-icons"
import { faCoffee, faHome, faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"


const Footer = () => {

    const footerRef = useRef()
    const [sy, setSy] = useState(0)
    useEffect(() => {
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
            <div className="w-full border-t fixed bottom-0 border transition-all" ref={footerRef}>
                <div className="w-full grid grid-cols-12 items-center">
                    <div className="col-span-3 p-3 ">
                        <div className="w-full text-center">
                            <span className="text-brown-dark">
                                <FontAwesomeIcon icon={faUserCircle}/>
                            </span>
                            <br />
                            <Link href='/profile' className="text-xs">
                                پروفایل
                            </Link>
                        </div>
                    </div>
                    <div className="col-span-3 p-3 ">
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
                    <div className="col-span-3 p-3 ">
                        <div className="w-full text-center">
                            <span className="text-brown-dark">
                                <FontAwesomeIcon icon={faUsers}/>
                            </span>
                            <br />
                            <span className="text-xs text-brown-dark">
                                قهوهخونه
                            </span>
                        </div>
                    </div>
                    <div className="col-span-3 p-3 ">
                        <div className="w-full text-center">
                            <span className="text-brown-dark">
                                <FontAwesomeIcon icon={faHome}/>
                            </span>
                            <br />
                            <span className="text-xs text-brown-dark">
                                خانه
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Footer