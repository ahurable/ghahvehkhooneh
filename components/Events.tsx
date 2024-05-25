"use client"
import { eventType } from "@/lib/types"
import { LOCALHOST } from "@/lib/variebles"
import { useEffect, useState } from "react"



const EventWrapper = () => {

    const [loading, setLoading] = useState(true)
    const [events, setEvents] = useState<eventType[]>()

    useEffect(() => {
        const fetchEventList = async () => {
            const res = await fetch(LOCALHOST + 'api/events/all/')
            if (!res.ok)
                throw new Error('failed to fetch events list')
            return res.json()
        }
        const asyncHandler = async () => {
            const _events = await fetchEventList()
            setEvents(_events)
            setLoading(false)
        }
        asyncHandler()
    }, [EventWrapper])

    return (
        <>
            <div className="w-full gird-cols-12">
                {
                    loading ? 
                    <div className="container text-center">
                        <span className="pt-10 text-lg">
                            در حال بارگیری ...
                        </span>
                    </div> :
                    <div className="flex flex-wrap">
                        {events?.map(event => [
                            <div key={event.id} onClick={() => location.replace('/events/'+event.id)} className="w-full md:w-1/2 p-4">
                                <div className="w-full rounded-3xl shadow p-4 flex">
                                    <div className="w-1/4">
                                        <img src={ event.club.club_avatar} className="w-20 h-20 rounded-full" alt="" />
                                    </div>
                                    <div className="ps-4 w-3/4">
                                        <span className=" text-brown-normal m-0">{event.name}</span>
                                        <br />
                                        <span className="text-brown-normal text-sm">میزبان: {event.cafe.name}</span>
                                        <br />
                                        <span className="text-brown-normal text-sm">{event.description}</span>
                                    </div>
                                </div>
                            </div>
                        ])}
                    </div>
                }
            </div>
        </>
    )
}


export default EventWrapper