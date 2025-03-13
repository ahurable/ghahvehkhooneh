import React from 'react'
import { LOCALHOST } from '@/lib/variebles'
import { CafeCard, type CafeCardProps } from '@/components/CafeComponents'
import type { Metadata } from "next"
import CafeList from './CafeList'

export const metadata: Metadata = {
    title: 'گپی - لیست کافه ها',
    description: "کافه های اطراف شما",
}







export default async function Page() {
    
    
    
    return (

        <React.Fragment>
            <div className="container">


                <div className="w-full relative border-b">
                    <div className="w-full h-[150px] relative">
                         <div className="bg-[url('/cafe-pattern.jpg')] bg-[length:130px_130px] w-full h-full z-10 relative"></div>
                         <div className="w-full h-full absolute z-20 top-0 bg-brown-light bg-opacity-40">
                            <div className="title-wrapper h-full relative text-center p-5 ">
                                <h1 className='text-[2rem] text-white font-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>کافه گردی</h1>
                            </div>
                         </div>
                    </div>
                
                </div>

                
                <div className="w-full md:grid grid-cols-12 relative">
                    <CafeList />
                </div>
            </div>
        
        </React.Fragment>
    )
}
