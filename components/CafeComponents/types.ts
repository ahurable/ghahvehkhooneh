import { categoryFood, eventDetail, userWithAnyProfileType } from "@/lib/types"

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
        location: string,
        pictures: {
            picture:string,
            is_featured:boolean
        }[],
        ratings: rating[],
        menu_item: menuItem[],
        club: any,
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