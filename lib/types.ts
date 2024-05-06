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


export interface cafeCardType {
    id: number,
    name: string,
    about: string,
    picture: string | StaticImageData,
}

export interface cafeIdNameType {
    id: number,
    name: string
}