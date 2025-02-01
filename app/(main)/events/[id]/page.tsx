"use client"
import { SuccessModal } from "@/layouts/Modals/MessageModals"
import { eventDetail } from "@/lib/types"
import { LOCALHOST } from "@/lib/variebles"
import { jwtDecode } from "jwt-decode"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const fetchData = async (id:number):Promise<eventDetail> => {
    const res  = await fetch(LOCALHOST + 'api/events/details/' + id + '/')
    if(!res.ok)
        throw new Error('failed to fetch')
    return res.json()
}




const Page = ({params}:{params:{id:number}}) => {

    const participentBtn = useRef()
    const [data, setData] = useState<eventDetail>()
    const [ loading , setLoading ] = useState(true)
    const [success, setSuccess] = useState(false)
    const [participanted, setParticipanted] = useState(false)

    useEffect(() => {
        const handleAsync = async () => {
            const _data = await fetchData(params.id)
            setData(_data)
            setLoading(false)
        }
        handleAsync()
        
        
        
    }, [Page])


    useEffect(() => {
        
        if (loading == false) {
            try {

                const token = localStorage.getItem('access')
    
                if (token == null)
                    console.log('you have to login')
                console.log(loading ? 'loading' : 'loaded')
                console.log(jwtDecode(token).user_id)
                const participents:number[] = []
                data?.participents.map(p => participents.push(p.id))
                // console.log(participents)
                if (participents.includes(jwtDecode(token).user_id)){
                    setParticipanted(true)
                }
    
                participentBtn.current.onclick = async () => {
                    const token = localStorage.getItem('access')
                    const res = await fetch(LOCALHOST + 'hook/participant/' + params.id + '/', {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    if (res.ok) {
                        setSuccess(true)
                        setParticipanted(true)
                    }
                }
            } catch {
    
            }
        }
        
    }, [loading])

    return (
        <>

            <div className="w-full p-4">
                <div className="w-full">
                    <div className="w-full ">
                        <div className="w-full relative rounded-xl">
                            <div className="bg-[url('/cafe-pattern.jpg')] py-20 bg-[length:130px_130px] w-full h-full z-10 relative rounded-xl"></div>
                            <div className="w-full h-full absolute z-20 top-0 bg-brown-normal bg-opacity-40 rounded-xl">
                                <div className="title-wrapper h-full relative text-center p-5 ">
                                    <div className="w-full flex items-center">
                                        <div className="block">
                                            <img src={data?.club.club_avatar} width={100} height={100} className="w-20 h-20 rounded-full object-cover" alt="" />
                                        </div>
                                        <div className="ps-4">
                                            <div className="block w-max">
                                                <span className="text-brown-normal text-xl font-black text-white block text-start">{data?.name}</span>
                                                <span className="text-lg font-semibold text-white block text-start">میزبان:‌{data?.cafe.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full shadow rounded-3xl p-4 mt-8">
                            
                            <div className="pt-4">
                                <p className="text-brown-normal">{data?.description}</p>
                            </div>
                            { 
                                localStorage.getItem('access')?.length > 0 ? participanted ? <button className="block btn-brown mt-4 text-center p-4 w-full grayscale" disabled>
                                شما قبلا شرکت کردید
                                </button> : <button className="block btn-brown mt-4 text-center p-4 w-full" ref={participentBtn}>
                                    شرکت در رویداد
                                </button> :
                                <button className="block btn-brown mt-4 text-center p-4 w-full" onClick={() => location.replace('/login')}>
                                    ورود به حساب برای شرکت
                                </button>
                            }
                            
                        </div>
                        <div className="w-full shadow rounded-3xl p-4 my-4">
                            {
                              data?.participents != undefined &&  data?.participents.length > 0 ?
                                <div className="w-full flex flex-wrap">
                                    <span className="text-brown-normal w-full block">شرکت کنندگان: </span>
                                    {data?.participents.map(perticipent => [
                                        <div key={perticipent.id} className="w-20 h-20 block p-2">
                                            <img src={perticipent.profile.avatar} alt="" className="rounded-full w-full h-full object-cover" />
                                        </div>
                                    ])}
                                </div> :
                                <span className="block w-full text-center text-brown-normal">
                                    اولین شرکت کننده باشید
                                </span>
                            }
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
            {
                success && <SuccessModal description='به عنوان شرکت کننده ثبت شدید' state={success} />
            }
        </>
    )

}

export default Page