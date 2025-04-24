"use client"
import { IMAGE_HOST, LOCALHOST } from "@/lib/variebles"
import Image from "next/image"
import Flickity from "react-flickity-component"


type flickityOptionsType = {
    freeScroll: boolean,
    wrapAround: boolean,
    pageDots: boolean,
    autoPlay: boolean,
    prevNextButtons: boolean
}

const flickityOptions: flickityOptionsType = {
    freeScroll: true,
    wrapAround: true,
    pageDots: false,
    autoPlay: true,
    prevNextButtons: false
}

type Pictures = {
    picture: string,
    is_featured:boolean
}[]

const Slider = ({pictures, classNames}:{pictures:Pictures, classNames:string}) => {
    return (
        <>
        {
            pictures ? pictures.length > 0 && 
            <Flickity options={flickityOptions} elementType="div">
                {
                    pictures.map((p, idx) => [
                        <Image key={idx} src={IMAGE_HOST + p.picture} width={700} height={500} alt="" className={`w-full object-cover ${classNames}`} />
                    ])
                }
            </Flickity>
        :null
        }
        </>
    )
}

export default Slider;