"use client"
import { useEffect } from "react"
import { LOCALHOST } from "@/lib/variebles"

export interface cafeCard {
    id: number,
    name: string,
    about: string,
    picture: string,
}

export const CafeCard = ({cafe}) => {
    
    
    return (
        <>
            <div className="w-full rounded-lg bg-white text-brown-dark shadow-md mt-6 p-3">
                <div className="w-full flex">
                    <div className="">
                        <div className="w-20 h-20 rounded-lg bg-gray-400">
                            <img src={LOCALHOST + cafe.picture} width="100" height="100" className="w-full h-full rounded-lg object-cover" alt=""/>
                        </div>
                    </div>
                    <div className="ps-4">
                        <h1 className='text-lg'>{cafe.name}</h1>
                        <p>{cafe.about}</p>
                    </div>
                </div>
                
                <a href={`cafe/${cafe.id}`} className="block w-full my-3 btn btn-blue text-center">مشاهده کافه</a>
            </div>
        </>
    )
}