'use server'
import React from 'react'
import { LOCALHOST } from '@/lib/variebles'
import { CafeCard, type CafeCardProps } from '@/components/CafeComponents'
import Image from 'next/image'
import Head from 'next/head'


async function getData():Promise<CafeCardProps[]>  {
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
            <Head>
                <title>کافه های اطراف - گپی</title>
                <meta name="description" content='بهترین کافه های شهر رو الان پیدا کن'/>
            </Head>
            <div className="container">


                <div className="w-full relative border-b">
                    <div className="w-full h-[150px] relative">
                         <div className="bg-[url('/cafe-pattern.jpg')] bg-[length:130px_130px] w-full h-full z-10 relative"></div>
                         <div className="w-full h-full absolute z-20 top-0 bg-brown-normal bg-opacity-40">
                            <div className="title-wrapper h-full relative text-center p-5 ">
                                <h1 className='text-[2rem] text-white font-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>کافه گردی</h1>
                            </div>
                         </div>
                    </div>
                
                </div>

                
                <div className="w-full md:grid grid-cols-12 relative">
                {  data.map((cafe) => [
                        <div key={cafe.id} className="md:col-span-6 p-3">
                            <CafeCard cafe={cafe}/>
                        </div>
                    ])
                }
                </div>
            </div>
        
        </React.Fragment>
    )
}
