"use client"
import { LOCALHOST } from "@/lib/variebles"
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
    pictures : {
        picture: string
    }[]
}

const Slider = (pictures:Pictures) => {
    return (
        <>
        {
            pictures.pictures ? pictures.pictures.length > 0 && 
            <Flickity options={flickityOptions} elementType="div">
                {
                    pictures.pictures.map((p, idx) => [
                        <img key={idx} src={LOCALHOST + p.picture} alt="" className="w-full h-60 object-cover" />
                    ])
                }
            </Flickity>
        :null
        }
        </>
    )
}

export default Slider;