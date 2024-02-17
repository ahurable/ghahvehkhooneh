"use client"


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
import { faBars, faBasketShopping, faClose } from "@fortawesome/free-solid-svg-icons"
import { useRef } from "react"

const Header = () => {

    const menuMobile = useRef(null)

    return (
        <>
            <div className="container relative">
                <div className="py-4 hidden md:block">
                    <div className="w-full grid grid-cols-12">
                        <div className="md:col-span-6 flex justify-start items-center">
                            تخصصی ترین مرکز قهوه و آموزش باریستایی به صورت آنلاین.
                        </div>
                        <div className="md:col-span-6 flex justify-end items-center">

                            <span className="block text-md mt-[0.3rem]">
                                contact@ghahvehkhooneh.com
                            </span> 
                            <FontAwesomeIcon icon={faEnvelope} width={20} className="mx-2" />
                            
                        </div>
                    </div>
                </div>
                <hr className="hidden md:block" />
            </div>

            <nav className="md:sticky top-0 z-50 bg-yellow-very-melo shadow-sm">
                <div className="grid grid-cols-12 py-4 items-center  container">
                    <div className="lg:col-span-2 md:col-span-6 col-span-12 p-4 md:p-0 flex gap-4 items-center">
                        <button className="btn" onClick={()=>{
                            menuMobile.current.style.marginRight = 0;
                        }}>
                            <FontAwesomeIcon icon={faBars} width={40} />
                        </button>
                        <span className="text-2xl font-bold">قهوهخونه</span>
                    </div>
                    {/* mobile menu */}
                    <div ref={menuMobile} className="w-full h-full transition-all duration-300 absolute top-0 right-0 mr-[-3000px] z-10 bg-stone-200">
                        <div className="w-full relative h-[400px] bg-gray-900">
                            <button className="absolute top-4 right-4 text-white" onClick={()=>{
                                menuMobile.current.style.marginRight='-3000px';
                            }}>
                                <FontAwesomeIcon icon={faClose} width={100} />
                            </button>
                            <span className="absolute top-4 left-4 text-white">
                                <FontAwesomeIcon icon={faBasketShopping} width={100} />
                            </span>
                            <div className="absolute bottom-4">
                                <span className="text-3xl font-semibold text-white pr-4">اهورا عالی پور</span>
                            </div>
                        </div>
                        <ul className="w-full p-0 m-0">
                            <li className="w-full">
                                <a href="" className="w-full block p-4 text-2xl">
                                    صفحه اصلی
                                </a>
                            </li>
                            <li className="w-full">
                                <a href="" className="w-full block p-4 text-2xl">
                                    آموزش ها
                                </a>
                            </li>
                            <li className="w-full">
                                <a href="" className="w-full block p-4 text-2xl">
                                    فروشگاه
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* desktop menu */}
                    <div className="lg:col-span-10 md:col-span-12  hidden md:menu-wrapper items-center">
                        <ul>
                            <li><a href="">صفحه اصلی</a></li>
                            <li><a href="">وبلاگ</a></li>
                            <li><a href="">فروشگاه</a></li>
                            <li><a href="">ارتباط با ما</a></li>
                        </ul>
                        <div className="auth-button-wrapper flex">
                            <a href="" className="btn btn-primary w-max">ثبت نام | احراز هویت</a>
                        </div>
                    </div>
                </div>
                    
            </nav>
        </>
    )
}

export default Header