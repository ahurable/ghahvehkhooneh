"use client"

import { CafeCard, CafeCardProps } from "@/components/CafeComponents"
import { cafeCardType } from "@/lib/types"
import { LOCALHOST } from "@/lib/variebles"
import { useEffect, useState } from "react"
import { ThreeDot } from "react-loading-indicators"



const CafeList = () => {
    const [cafes, setCafes] = useState<CafeCardProps[]>()
    useEffect(() => {
        const handleAsync = async () => {
             const res = await fetch(LOCALHOST + 'api/cafes/list/', {
                method: 'GET',
                headers: {
                    'Content-Type':'application/json'
                }
            })
        
            if (!res.ok) {
                throw new Error("Failed to fetch data")
            }
        
            const data = await res.json()
            setCafes(data)
        }
        handleAsync()
    },[])

    return (
        <>
            {  
            cafes != undefined ?
            cafes.map((cafe) => [
                <div key={cafe.id} className="md:col-span-6 p-3">
                    <CafeCard cafe={cafe}/>
                </div>
            ]) :
                <div className="w-full text-center pt-16">
                    <span className="text-lg font-bold text-brown-dark">درحال بارگیری</span>
                    <br />
                    <ThreeDot color={'#033B55'} />
                </div>
             }
        </>
    )
}

export default CafeList