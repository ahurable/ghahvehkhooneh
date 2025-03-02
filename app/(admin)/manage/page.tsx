"use client"

import { cafeCardType } from "@/lib/types"
import { LOCALHOST } from "@/lib/variebles"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"





const Page = () => {

    const [loading, setLoading] = useState(true)
    const [cafes, setCafes] = useState<cafeCardType[]>()
    const router = useRouter()
    useEffect(() => {

        const fetchFunction = async () => {
            const token = localStorage.getItem('access')
            const res = await fetch(LOCALHOST + 'api/admin/',{
                
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res.ok) {
                const data = await res.json()
                setCafes(data)
                setLoading(false)
            } else if (res.status == 403) {
                router.push('/main')
            }
        }
        fetchFunction()

    }, [])

    return (
        <>
            <div className="container p-4">
                <div className="w-full text-center">
                    <h1 className="text-lg font-bold pt-8">انتخاب کافه</h1>
                </div>
                <div className="pt-4 flex flex-wrap">
                    {loading ? 
                    <span className="text-md w-full text-center">درحال بارگزاری</span>
                    : 
                    cafes?.map(cafe => [
                        <div key={cafe.id}  className="w-1/2 lg:w-1/6 md:w-1/3 p-2">
                            <a href={`/manage/cafes/${cafe.id}`} className="p-2 border rounded-lg w-full block">
                                {cafe.name}
                            </a>
                        </div>
                    ])
                    }
                </div>
            </div>
        </>
    )
}

export default Page