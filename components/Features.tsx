"use client"
import Image, { StaticImageData } from "next/image"
import { useEffect, useState } from "react"
import Loader from "./Loader"
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

type FeaturePropsType = {
    id: number,
    title: string,
    subtitle: string,
    description: string,
    image: string | StaticImageData,
    author: number
}

const Feature = (props: FeaturePropsType) => {
    return (
        <div className="relative lg:w-1/5 md:w-1/4 w-full md:h-64 h-[220px]">
            <Image src={props.image} width={200} height={200} alt="" className="absolute w-full h-full top-0 left-0 z-10 object-cover" />
            <div className="bg-black bg-opacity-40 z-20 text-white w-full h-full absolute top-0 left-0 p-2">
               </div>
            <div className="absolute flex bottom-0 items-center md:top-auto p-2 z-30 w-full">
                <div className="w-full">
                    <div className="relative w-full h-14">
                        <h1 className="mb-5 text-lg text-white font-bold">{props.title}</h1>
                    </div>
                    
                    <a href="" className="border rounded-lg block w-100 text-center border-white p-3 text-sm text-white hover:bg-white hover:text-black transition-all mt-4">بیشتر بخوانید</a>
                </div>
            </div>
        </div>
    )
}


export default function Features() {
    const [loader, setLoader] = useState(true)
    const [posts, setPosts] = useState(null)
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/posts?format=json')
            .then(res => res.json())
            .then(posts => { 
                setPosts(posts)
                setLoader(false)
            })
    }, [])

    return (
        
        <main className="w-full">
            {loader ? <Loader height={300} /> : <Flickity 
            className={"carousel"}
            elementType={"div"}
            options={flickityOptions}
            > {posts?.map(post => {
                // console.log(post.image)
               return(
                <Feature key={post.id} {...post} />
               ) 
            })} </Flickity> }
        </main>

    )
}