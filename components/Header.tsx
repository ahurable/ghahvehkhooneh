"use client"


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { useAppDispatch } from "@/lib/hook"
import { setIsMenuOpen } from "@/lib/features/menuMobileSlice"

const Header = () => {

    const dispatch = useAppDispatch()

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
                        <button className="btn lg:hidden" onClick={()=> dispatch(setIsMenuOpen(true))}>
                            <FontAwesomeIcon icon={faBars} width={40} />
                        </button>
                        <span className="text-2xl font-bold">قهوهخونه</span>
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