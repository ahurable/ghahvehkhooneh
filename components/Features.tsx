"use client"
import Image, { StaticImageData } from "next/image"
import { useEffect, useState } from "react"

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
        <div className="lg:col-span-2 md:col-span-4 relative col-span-6 h-64">
            <Image src={props.image} width={200} height={200} alt="" className="absolute w-full h-full top-0 left-0 z-10 object-cover" />
            <div className="bg-black bg-opacity-40 z-20 text-white w-full h-full absolute top-0 left-0 p-2">
               </div>
            <div className="absolute bottom-0 p-2 z-30 w-full">
                <div className="relative w-full">
                    <h1 className="mb-5 text-lg text-white">{props.title}</h1>
                    <a href="" className="border-t block w-100 text-center border-white p-3 text-sm text-white hover:bg-white hover:text-black transition-all mt-4">بیشتر بخوانید</a>
                </div>
            </div>
        </div>
    )
}


export default function Features() {

    const [posts, setPosts] = useState(null)
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/posts?format=json')
            .then(res => res.json())
            .then(posts => setPosts(posts))
    }, [])

    return (
        
        <main className="w-full grid grid-cols-12 gap-0">
            {posts?.map(post => {
                // console.log(post.image)
               return(
                <Feature key={post.id} {...post} />
               ) 
            })}
        </main>

    )
}