"use client"
import { useEffect, useRef, useState } from "react"
import { LOCALHOST } from "@/lib/variebles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { Rating } from "flowbite-react"
import { clubsType } from "./tabs/SocialTabs"
import { categoryFood, eventDetail, MenuItem, userWithAnyProfileType } from "@/lib/types"


export interface cafeCard {
    id: number,
    name: string,
    address: string,
    about: string,
    picture: string,
    rating: rating[]
}

export interface menuItem {
    id: number,
    item: string,
    description: string,
    picture: string,
    price: string,
    cafe: number
}

export interface cafeInformation {
    cafe: {
        id: number,
        name: string,
        address: string,
        about: string,
        picture: string,
        ratings: rating[],
        menu_item: menuItem[],
        club: clubsType,
    },
    categories: categoryFood[]
}


export interface rating {
    id: number,
    description: string,
    rating: number,
    created_at: string,
    cafe: number,
    user: anyProfile,
}

export interface anyProfile {
    profile: {
        first_name: string,
        last_name: string,
        avatar: string ,
        bio: string
    }
}

interface club {
    id: number,
    members: userWithAnyProfileType[],
    events: eventDetail[]
}

export const MenuItem = ({menuItem}:{menuItem: menuItem}) => {
    return (
        <div className="w-full">
            <div className="">
                <div className="w-full rounded-lg p-3 flex items-center">
                    <div className="w-3/12 p-2">
                        <img src={LOCALHOST + menuItem.picture} alt="" className="w-20 h-20 rounded-lg object-cover" />
                    </div>
                    <div className="w-5/12 p-2">
                        <span className="text-lg">{menuItem.item}</span><br />
                        <span className="text-gray-600">{menuItem.description}</span>
                    </div>
                    <div className="w-3/12">
                        <span className="float-end">
                            <span className="text-xl">{menuItem.price}</span>
                            <span className="text-sm">تومان</span>
                        </span> 
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export const MenuWrapper = ({categories}: {categories: categoryFood[]}) => {

    const [menu, setMenu] = useState<MenuItem[]>([
        {id: undefined,
        item: undefined,
        picture: "",
        price:"",}
    ])

    useEffect(() => {
        console.log(menu)
    }, [menu])
    return (
        <div className="">
            <div className="container w-full flex overflow-auto scrollbar">
                {
                    categories.map((cat)=> [
                        <div key={cat.id} className="w-[300px] p-4">
                            <button className="w-[150px] block p-3 rounded-lg shadow" onClick={() => setMenu(cat.items)} >{cat.name}</button>
                        </div>
                    ])
                }
            </div>
            
            {
                    menu.length < 1 ?
                    categories[0].items.map(item => [
                    <div key={item.id} className="w-full p-2">
                        <div className="w-full rounded-2xl shadow p-4">
                            <div className="w-full flex items-center">
                                <div className="w-[40px] h-[40px]"></div>
                                <div className="w-full">
                                    <h1>{item.item}</h1>
                                </div>
                            </div>
                        </div>
                     </div> 
                    ])
                    :
                    menu.map(item => [
                    <div key={item.id} className="w-full p-2">
                        <div className="w-full rounded-2xl shadow-lg p-4">
                            <div className="w-full flex items-center">
                                <div className="w-[40px] h-[40px]"></div>
                                <div className="w-full">
                                    <h1>{item.item}</h1>
                                </div>
                            </div>
                        </div>
                    </div> 
                    ])
            }
        </div>
    )
}

export const CafeCard = ({cafe}) => {
    
    
    return (
        <>
            <div className="w-full rounded-3xl text-brown-dark shadow border-gray-200 p-3">
                <div className="w-full flex">
                    <div className="">
                        <div className="w-20 h-20 rounded-lg bg-gray-400">
                            <img src={LOCALHOST + cafe.picture} width="100" height="100" className="w-full h-full rounded-lg object-cover" alt=""/>
                        </div>
                    </div>
                    <div className="ps-4">
                        <h1 className='text-lg'>{cafe.name}</h1>
                        <span className="text-gray-400">{cafe.address}</span>
                        <p>{cafe.about}</p>
                    </div>
                </div>
                
                <a href={`cafe/${cafe.id}`} className="block w-full my-3 btn btn-blue text-center">مشاهده کافه</a>
            </div>
        </>
    )
}



function EventsWrapper({events}:{events:eventDetail[] | null}) {
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



export const BackButton = () => {

    return (

        <button className="absolute left-4 top-4 p-4 text-brown-normal" onClick={() => history.back()}>
            <FontAwesomeIcon icon={faArrowLeft} />
        </button>
    )
}

export const TabsWrapper = ({menuItems, club, categories}:{menuItems: menuItem[], club: club, categories: categoryFood[]}) => {

    const menu = useRef<HTMLButtonElement>()
    // const ratingsButton = useRef()
    const events = useRef<HTMLButtonElement>()
    const [tab, setTab] = useState('menu')
    

    const toggleMenu = (buttonName:string) => {
        switch (buttonName) {
            case 'menu':
                // menu.current.classList.add('bg-white')
                menu.current.classList.add('shadow')

                // ratingsButton.current.classList.remove('bg-white')
                // ratingsButton.current.classList.remove('shadow')

                // events.current.classList.remove('bg-white')
                events.current.classList.remove('shadow')

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
                menu.current.classList.remove('shadow')

                // ratingsButton.current.classList.remove('bg-white')
                // ratingsButton.current.classList.remove('shadow')

                // events.current.classList.add('bg-white')
                events.current.classList.add('shadow')

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