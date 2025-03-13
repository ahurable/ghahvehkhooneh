"use client"

import Flickity from "react-flickity-component";
import { cafeCardType } from "@/lib/types";
import { useEffect, useState } from "react";
import { fetchAllCafeCards } from "@/lib/fetchs";
import { LOCALHOST } from "@/lib/variebles";
import { StaticImageData } from "next/image";

import Image from "next/image";
import { ThreeDot } from "react-loading-indicators";
import { useRouter } from "next/navigation";

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


const CafeCard = ({id, name, slug, about, pictures}:cafeCardType) => {

    // useEffect(()=>{
    //     console.log(pictures?.filter(picture => picture.is_featured))
    // })
    const router = useRouter()
    if (pictures!=undefined)
        if (pictures.length < 1)
            return null
        else {
            return (
                <>
                    <div className="w-28 h-32" onClick={() => router.push('https://gappy.ir/cafe/'+slug)}>
                        <div className="w-full h-full relative pt-6 p-2">
                            <div className="w-full h-full relative shadow rounded-3xl ">
                                <div className="w-full h-full absolute rounded-3xl z-10">
                                    <Image src={pictures?.filter(picture => picture.is_featured).length > 0 ? pictures?.filter(picture => picture.is_featured)[0].picture : pictures[0].picture} alt="" width={100} height={100} className="w-full h-full object-cover rounded-3xl" />
                                    
                                </div>
                                <div className="w-full absolute top-[-15px] flex justify-center rounded-3xl z-10">
                                    <div className="bg-brown-dark w-5/6 rounded-3xl shadow text-center after:w-2 after:h-2 after:content-[''] after:rotate-45 after:absolute after:bottom-[-4px] after:right-6 after:bg-brown-dark">
                                        <span className="text-xs text-white brown-normal">
                                            {name}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    
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
    }, [])
    
    return (
        <>
            { loading ? 
                <div className="py-10 text-center">
                    <span className="text-brown-normal">درحال بارگیری...
                        <br />
                        <ThreeDot color={'#033B55'} />
                    </span>
                </div> :
                <Flickity options={flickityOptions} className={"carousel"} elementType={"div"}>
                    {
                        cafes?.map(cafe => [
                            <CafeCard key={cafe.id} id={cafe.id} name={cafe.name} slug={cafe.slug} about={cafe.about} pictures={cafe.pictures} />
                        ])
                    }
                </Flickity>
            }
        </>
    )


}