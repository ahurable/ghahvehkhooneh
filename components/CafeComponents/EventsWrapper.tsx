"use client"

import { eventDetail } from "@/lib/types"
import { useEffect } from "react"


export function EventsWrapper({events}:{events:eventDetail[] | null}) {
    useEffect(()=>{
        console.log(events)
    })
    return (
        <>
            <div className="w-full">
                { events ? events.map(event => [
                    <div key={event.id} className="p-2 w-full">
                        <div className="p-3 rounded-xl shadow">
                            <h1 className="text-lg">{event.name}</h1>
                            <br />
                            <span className="text-gray">{event.date}</span>
                            <p>{event.description}</p>
                        </div>
                    </div>
                ]) :
                <>
                    <div className="w-full text-center p-4 text-lg">هیچ رویدادی در این کافه وجود ندارد</div>
                </>
                }
            </div>
        </>
    )
}