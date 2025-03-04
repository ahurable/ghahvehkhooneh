"use client"
import Image, { StaticImageData } from "next/image"
import image from "@/assets/img/personality.jpeg"
import { TrimedIconCard } from "@/components/Cards"
import { faFilm, faGamepad, faMusic } from "@fortawesome/free-solid-svg-icons"
import { HobbyModal, MusicModal } from "@/layouts/Modals/PersonalityModals"
import { useAppDispatch } from "@/lib/hook"
import { setHobbyModalState } from "@/lib/features/hobbyModalSlice"
import { setJobModalState } from "@/lib/features/jobModalSlice"
import { setMGenreModalState } from "@/lib/features/mgenreModalSlice"
import { Children, ReactNode } from "react"


type info = {
    children: ReactNode,
    img: StaticImageData | string | null,
}

const InfoContentWrapper = (props:info) => {

    const dispatch = useAppDispatch()

    return (
        <>  

            

            <div className="w-full relative">
                <div className="w-full">
                    {
                        props.img &&
                        <Image src={props.img} width={1000} height={1000} className="w-full h-[350px] object-cover" alt=""/>
                    }
                </div>
                <div className="relative z-10 bg-yellow-very-melo pt-8 py-24 rounded-lg">
                    
                    {props.children}

                </div>

                
            </div>
        
        </>
    )
}

export default InfoContentWrapper