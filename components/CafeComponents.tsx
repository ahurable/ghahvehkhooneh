"use client"
import { useEffect, useRef, useState } from "react"
import { LOCALHOST } from "@/lib/variebles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { Rating } from "flowbite-react"


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
    cafe: number
}

export interface cafeInformation {
    id: number,
    name: string,
    address: string,
    about: string,
    picture: string,
    ratings: rating[],
    menu_item: menuItem[]
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

export const MenuItem = ({menuItem}:{menuItem: menuItem}) => {
    return (
        <div className="w-full">
            <div className="">
                <div className="w-full rounded-lg p-3 flex items-center">
                    <div className="col-span-3 p-2">
                        <img src={LOCALHOST + menuItem.picture} alt="" className="w-20 h-20 rounded-lg object-cover" />
                    </div>
                    <div className=" p-2">
                        <span className="text-lg">{menuItem.item}</span><br />
                        <span className="text-gray-600">{menuItem.description}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const MenuWrapper = ({menuItems}: {menuItems: menuItem[]}) => {


    return (
        <div className="">
            { menuItems.map(menuItem => [
                <MenuItem key={menuItem.id} menuItem={menuItem} />
            ])}
        </div>
    )
}

export const CafeCard = ({cafe}) => {
    
    
    return (
        <>
            <div className="w-full rounded-lg bg-white text-brown-dark shadow border-gray-200 p-3">
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



const RatingBox = ({rating}: {rating:rating}) => {

    useEffect(()=>{
        // console.log(rating.user)
    })
    

    return (
        <>
             <div className="w-full flex items-center">
                <div className="p-4">
                    <img src={LOCALHOST + rating.user.profile.avatar} className="w-20 h-20 rounded-full object-cover" alt="" />
                </div>
                <div className="p-4">
                    <span className="text-lg">{rating.user.profile.first_name} { rating.user.profile.last_name }</span> <br />
                    <span>{ rating.rating }</span>
                    <br />
                    <span>{rating.description}</span>
                </div>
            </div> 
        </>
    )

}



const RatingsWrapper = ({ratings}: {ratings:rating[]})  => {
    


    return (
        <>
        
            <div className="w-full">
                <div className="w-full p-4">
                    <form>
                        <textarea name="comment" id="commentId" placeholder="دیدگاهی بگذارید" className="form-control w-full"></textarea>
                        <button className="w-full btn-green mt-3 p-4 text-center">ثبت دیدگاه</button>
                    </form>
                </div>

                { ratings.length > 0 ?
                    ratings.map(rating => [
                        <RatingBox key={rating.id} rating={rating} />
                    ])
                    : 
                    <div className="w-full flex mt-10">
                        <div className="w-full text-center">
                            <span>داده ای برای نمایش وجود ندارد</span>
                        </div>
                    </div>
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

export const TabsWrapper = ({menuItems, ratings}:{menuItems: menuItem[], ratings: rating[]}) => {

    const menu = useRef()
    const ratingsButton = useRef()
    const events = useRef()
    const [tab, setTab] = useState('menu')

    const toggleMenu = (buttonName:string) => {
        switch (buttonName) {
            case 'menu':
                menu.current.classList.add('bg-white')
                menu.current.classList.add('shadow')

                ratingsButton.current.classList.remove('bg-white')
                ratingsButton.current.classList.remove('shadow')

                events.current.classList.remove('bg-white')
                events.current.classList.remove('shadow')

                setTab('menu')

                break


            case 'ratings':
                menu.current.classList.remove('bg-white')
                menu.current.classList.remove('shadow')

                ratingsButton.current.classList.add('bg-white')
                ratingsButton.current.classList.add('shadow')

                events.current.classList.remove('bg-white')
                events.current.classList.remove('shadow')

                setTab('ratings')

                break


            case 'events': 
                menu.current.classList.remove('bg-white')
                menu.current.classList.remove('shadow')

                ratingsButton.current.classList.remove('bg-white')
                ratingsButton.current.classList.remove('shadow')

                events.current.classList.add('bg-white')
                events.current.classList.add('shadow')

                setTab('events')

                break
        }
    }

    return (
        <>
            <div className="w-full grid grid-cols-12">
                <div className="col-span-4 p-4">
                    <button ref={menu} className="w-full block p-3 rounded-lg bg-white shadow" onClick={() => toggleMenu('menu')}>منو</button>
                </div>
                <div  className="col-span-4 p-4">
                    <button ref={ratingsButton} className="w-full block p-3 rounded-lg" onClick={() => toggleMenu('ratings')}>بازخوردها</button>
                </div>
                <div className="col-span-4 md:hidden p-4">
                    <button ref={events} className="w-full block p-3 rounded-lg" onClick={() => toggleMenu('events')}>رویداد ها</button>
                </div>
            </div>

            <div className="w-full">
                { tab == "menu" && <MenuWrapper menuItems={menuItems} /> }
                
                { tab == "ratings" && <RatingsWrapper ratings={ratings} /> }
                
                
            </div>
        </>
    )
}