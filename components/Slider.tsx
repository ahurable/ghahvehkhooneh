"use client"
import Image, { StaticImageData } from "next/image"
import { AriaAttributes, useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";




type SliderItemPropsInterface = {
    id: number,
    top_title: string,
    title: string,
    helper: string,
    description: string,
    youtube: boolean,
    aparat: boolean,
    readmore: boolean,
    image: string | StaticImageData,
}

interface SlidersPropsInterface {
    sliders: SliderItemPropsInterface[]
}

const SliderItem = (props: SliderItemPropsInterface) => {

    

    return (
        <div className="container" id={`slider-${props.id}`}>
            <div className="w-full grid grid-cols-12 justify-around">
                <div className="lg:col-span-6 md:col-span-6 col-span-12 w-full text-justify flex items-center justify-around">
                    <div>
                        { props.top_title ? <h3 className="my-2 lg:text-3xl text-xl font-semibold">{props.top_title}</h3> : ""}
                        { props.title ? <h1 className="md:my-4 my-2 lg:text-[45px] text-3xl text-brown-dark font-black">{props.title}</h1> : "" }
                        { props.helper ? <p className="text-gray-500 font-normal text-lg">{props.helper}</p> : "" }
                        { props.description ? <p className="text-black font-normal">{props.description}</p> : "" }
                        <div className="gap-2 flex  md:mt-12 mt-3 justify-between md:justify-start">
                            {props.youtube ? <button className="btn youtube-button hover:bg-red-500 transition-all">
                                <span className='text-lg font-normal block'> در یوتیوب</span>
                                <FontAwesomeIcon icon={faYoutube} className="ms-3 scale-125" />
                            </button> : ""}
                            {props.readmore ? <button className="btn btn-primary flex items-center hover:bg-brown-normal transition-all">
                                <span className='text-lg font-normal block'>بیشتر بدانید</span>
                                <FontAwesomeIcon icon={faBars} className="ms-3 scale-125" />
                            </button> : ""}
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-6 md:col-span-6 col-span-12 w-full float-end">
                    <Image src={props.image} alt="" width={500} height={500} className="w-full float-end" />
                </div>
            </div>
        </div>
    )
}





export default function SliderWrapper () {
    
    const [sliders, setSliders] = useState(null)
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/sliders?format=json')
            .then(res => res.json())
            .then(data => {
                setSliders(data)
            })
    }, [])
    
    console.log(sliders)
    return (
        <main>
            {sliders?.map((slider) => {
                return (
                    <SliderItem key={slider.id} {...slider} />
                )
            })}
        </main>
    )
}

