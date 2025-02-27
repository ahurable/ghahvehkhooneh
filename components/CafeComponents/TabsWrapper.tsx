"use client"

import { useRef, useState } from "react"
import { menuItem } from "./types"
import { categoryFood, club } from "@/lib/types"
import { MenuWrapper } from "./MenuWrapper"
import { EventsWrapper } from "./EventsWrapper"



export const TabsWrapper = ({menuItems, club, categories}:{menuItems: menuItem[], club: club, categories: categoryFood[]}) => {

    const menu = useRef<HTMLButtonElement|null>(null)
    // const ratingsButton = useRef()
    const events = useRef<HTMLButtonElement|null>(null)
    const [tab, setTab] = useState('menu')
    

    const toggleMenu = (buttonName:string) => {
        switch (buttonName) {
            case 'menu':
                // menu.current.classList.add('bg-white')
                menu.current?.classList.add('shadow')

                // ratingsButton.current.classList.remove('bg-white')
                // ratingsButton.current.classList.remove('shadow')

                // events.current.classList.remove('bg-white')
                events.current?.classList.remove('shadow')

                setTab('menu')

                break


            // case 'ratings':
            //     // menu.current.classList.remove('bg-white')
            //     menu.current.classList.remove('shadow')

            //     // ratingsButton.current.classList.add('bg-white')
            //     ratingsButton.current.classList.add('shadow')

            //     // events.current.classList.remove('bg-white')
            //     events.current.classList.remove('shadow')

            //     setTab('ratings')

            //     break


            case 'events': 
                // menu.current.classList.remove('bg-white')
                menu.current?.classList.remove('shadow')

                // ratingsButton.current.classList.remove('bg-white')
                // ratingsButton.current.classList.remove('shadow')

                // events.current.classList.add('bg-white')
                events.current?.classList.add('shadow')

                setTab('events')

                break
        }
    }

    return (
        <>
            <div className="container w-full grid grid-cols-12">
                <div className="col-span-6 p-4">
                    <button ref={menu} className="w-full block p-3 rounded-lg shadow" onClick={() => toggleMenu('menu')}>منو</button>
                </div>
                <div className="col-span-6 p-4">
                    <button ref={events} className="w-full block p-3 rounded-lg" onClick={() => toggleMenu('events')}>رویداد ها</button>
                </div>
            </div>

            

            <div className="w-full container">
                { tab == "menu" && <MenuWrapper categories={categories} /> }
                
                {/* { tab == "ratings" && <RatingsWrapper ratings={ratings} /> } */}
                
                { tab == "events" && <EventsWrapper events={club?.events}/>}
            </div>
        </>
    )
}