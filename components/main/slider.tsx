"use client"

import Flickity from "react-flickity-component";
import { cafeCardType } from "@/lib/types";
import { useEffect, useState } from "react";
import { fetchAllCafeCards } from "@/lib/fetchs";
import { LOCALHOST } from "@/lib/variebles";
import Image from "next/image";

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


const CafeCard = ({id, name, about, picture}:cafeCardType) => {


    return (
        <>
                <div className="w-4/12 p-2">
                    <div className="w-full rounded-2xl p-3 shadow">
                        <div className="w-full">
                            <Image src={picture} alt="" className="rounded-xl object-fit w-full h-14 " alt="" width={100} height={100} />
                        </div>
                        <div className="w-full py-2">
                            <h1 className="text-xs">{name}</h1>
                        </div>
                        <div className="w-full ">
                            <p className="text-xs">{about.substring(0,10)}</p>
                        </div>
                    </div>
                </div>
        </>
    )
}


export const CafeCardListSliderWrapper = () => {

    const [cafes, setCafes] = useState<cafeCardType[]>()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const runFetch = async () => {
            const _cafes = await fetchAllCafeCards()
            setCafes(_cafes)
            setLoading(false)
        }
        runFetch()
    }, [CafeCardListSliderWrapper])
    
    return (
        <>
            { loading ? 
                <div className="py-10 text-center">
                    <span className="text-brown-normal">درحال بارگیری...</span>
                </div> :
                <Flickity options={flickityOptions} className={"carousel"} elementType={"div"}>
                    {
                        cafes?.map(cafe => [
                            <CafeCard key={cafe.id} id={cafe.id} name={cafe.name} about={cafe.about} picture={cafe.picture} />
                        ])
                    }
                </Flickity>
            }
        </>
    )


}