"use client"
import { eventDetail } from "@/lib/types"
import { LOCALHOST } from "@/lib/variebles"
import Image from "next/image"
import { useEffect, useState } from "react"

const fetchData = async (id:number):Promise<eventDetail> => {
    const res  = await fetch(LOCALHOST + 'api/events/details/' + id + '/')
    if(!res.ok)
        throw new Error('failed to fetch')
    return res.json()
}



const Page = ({params}:{params:{id:number}}) => {

    const [data, setData] = useState<eventDetail>()
    useEffect(() => {
        const handleAsync = async () => {
            const _data = await fetchData(params.id)
            console.log(_data)
            setData(_data)
        }
        handleAsync()
    }, [Page])

    return (
        <>

            <div className="w-full p-4">
                <div className="grid grid-cols-12 w-full">
                    <div className="col-span-12 md:col-span-6 lg:col-span-8">
                        <div className="w-full shadow rounded-3xl p-4 mt-8">
                            <div className="w-full flex items-center">
                                <div className="w-1/4 flex">
                                    <img src={data?.club.club_avatar} width={100} height={100} className="w-20 h-20 rounded-full object-cover" alt="" />
                                </div>
                                <div className="w-3/4 ps-4">
                                    <div className="items-center flex">
                                        <span className="text-brown-normal text-md">{data?.name}</span>
                                    </div>
                                    <span className="text-sm">میزبان:‌{data?.cafe.name}</span>
                                </div>
                            </div>
                            <div className="pt-4">
                                <p className="text-brown-normal">{data?.description}</p>
                            </div>
                            <a className="block btn-brown mt-4 text-center p-4 w-full">
                                شرکت در رویداد
                            </a>
                        </div>
                        <div className="w-full shadow mt-4 text-center rounded-3xl p-4">
                            <span className="text-md">
                                این رویداد در کافه {data?.cafe.name} برگزار میشود
                            </span>
                            <a href={`/cafe/${data?.cafe.id}`} className="block btn-blue mt-4 text-center p-4 w-full">
                                مشاهده کافه
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        
        </>
    )

}

export default Page