'use server'
import React from 'react'
import { LOCALHOST } from '@/lib/variebles'
import { CafeCard, cafeCard } from '@/components/CafeComponents'
import Image from 'next/image'


async function getData():Promise<cafeCard[]>  {
    const res = await fetch(LOCALHOST + 'api/cafes/list/', {
        method: 'GET',
        headers: {
            'Content-Type':'application/json'
        }
    })

    if (!res.ok) {
        throw new Error("Failed to fetch data")
    }

    return res.json()
} 






export default async function Page() {
    
    const data = await getData();
    
    console.log(data)
    
    return (

        <React.Fragment>
            <div className="container">


                <div className="w-full relative border-b">

                    <div className="title-wrapper text-center p-5 ">
                        <h1 className=' text-lg'>کافه گردی</h1>
                    </div>
                
                </div>

                
                <div className="w-full md:grid grid-cols-12 relative">
                {  data.map((cafe) => [
                        <div className="md:col-span-6 p-3">

                            <CafeCard cafe={cafe}/>
                        </div>
                    ])
                }
                </div>
            </div>
        
        </React.Fragment>
    )
}
