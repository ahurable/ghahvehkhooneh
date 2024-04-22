"use client"
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { setIsMenuOpen } from "@/lib/features/menuMobileSlice";

const MenuMobile = () => {


    const menuMobile = useRef(null)
    const isOpen = useAppSelector((state) => state.menumobile.isMenuOpen)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (isOpen == true) {
            menuMobile.current.style.marginRight='0px';
        } else {
            menuMobile.current.style.marginRight='-3000px';
        }
    }, [isOpen])

    return (
        <>
            <div ref={menuMobile} className="w-full h-full transition-all duration-300 fixed top-0 right-0 mr-[-3000px] z-10 bg-stone-200">
                {
                    localStorage.getItem('access') ? 
                    <>
                        <div className="w-full relative h-[400px] bg-gray-900">
                    <button className="absolute top-4 right-4 text-white" onClick={()=>{
                        dispatch(setIsMenuOpen(false))
                    }}>
                        <FontAwesomeIcon icon={faClose} width={100} />
                    </button>
                    <span className="absolute top-4 left-4 text-white">
                        <FontAwesomeIcon icon={faBasketShopping} width={100} />
                    </span>
                    <div className="absolute bottom-4">
                        <span className="text-3xl font-semibold text-white pr-4">
                            something
                        </span>
                    </div>
                </div>
                    </> :
                    <div className="w-full relative border-b bg-brown-light ">
                        <button className="absolute top-8 left-0 text-black" onClick={()=>{
                            dispatch(setIsMenuOpen(false))
                        }}>
                            <FontAwesomeIcon icon={faClose} width={100} />
                        </button>
                        <div className=" w-full top-0 bottom-0 mx-auto">
                            <div className="w-full p-4">
                                <h2 className="my-4 ">هنوز حساب کاربری ندارید؟</h2>
                                <a href="/register" className="border-brown-dark border p-4 w-full my-4 rounded-full block text-center">ثبت نام در قهوهخونه</a>
                                <h2 className="my-4">وارد حساب کاربری خود شوید</h2>
                                <a href="/login" className="border-brown-dark border p-4 w-full rounded-full block text-center">ورود به حساب کاربری</a>
                            </div>
                        </div>
                    </div>
                }

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
                {/* mobile menu */}
                
            </div>
        </>
    )
}

export default MenuMobile