import { menuItem, rating } from "@/components/CafeComponents";
import { StaticImageData } from "next/image";

export interface profileType {
    first_name: string,
    last_name: string,
    avatar: string ,
    bio: string,
    user: number,
    following: number[],
    followers: number[],
    city: number,
}

export interface userType {
    id: number,
    username: string,
    profile: profileType,
}

export interface clubsType {
    id: number,
    name: string,
    description: string,
    club_avatar: string,
    cafe: number,
    members: number[],
}

export interface clubsWithMembersType {
    id: number,
    name: string,
    description: string,
    club_avatar: string,
    cafe: number,
    members: userWithAnyProfileType[],
}

export interface allFieldClub {
    id: number,
    name: string,
    description: string,
    club_avatar: StaticImageData | string,
    cafe: number,
    owner: number,
    members: number[],
}




export interface cafeCardType {
    id: number,
    name: string,
    about: string,
    pictures?: StaticImageData[],
}

export interface cafeIdNameType {
    id: number,
    name: string
}

export interface smallClubType {
    id:number,
    name:string,
    club_avatar: string | StaticImageData
}

export interface eventType {
    id: number,
    name: string,
    description: string | null,
    club: smallClubType,
    cafe: cafeIdNameType
}


export interface anyProfileType {
    id: number,
    first_name: string,
    last_name: string,
    avatar: StaticImageData | string
}

export interface userWithAnyProfileType {
    id: number,
    profile: anyProfileType
}

export interface eventDetail {
    id: number,
    club: allFieldClub,
    cafe: cafeIdNameType,
    participents: userWithAnyProfileType[] ,
    name: string,
    description: string | null,
    date: string,
    invited: userWithAnyProfileType[],
    created_by: userWithAnyProfileType,
}

export interface Picture {
    picture: string | StaticImageData;
    cafe: number;
}

export interface cafeDetailedType {
    id: number,
    name: string,
    address: string,
    about: string,
    pictures: Picture[],
    ratings: rating[],
    club: clubsWithMembersType,
    categories: {
        id: number,
        name: string
    }[]
}

export interface MenuItem {
    id?: number,
    item?: string,
    description?: string,
    picture?: string,
    price?: string
}

export interface categoryFood {
    id: number,
    name: string,
    items: MenuItem[]
}