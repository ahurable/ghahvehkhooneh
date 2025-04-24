import { BackButton, MenuWrapper, TabsWrapper } from "@/components/CafeComponents"
import type { cafeInformation } from '@/components/CafeComponents/types'
import { IMAGE_HOST, LOCALHOST } from "@/lib/variebles"
import { faArrowLeft, faBackspace, faBackward, faCoffee, faUserGroup } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Tabs } from "flowbite-react"
import Slider from "./Slider"
import Head from "next/head"
import Image from "next/image"
import type { Metadata } from "next"
import { faMap } from "@fortawesome/free-regular-svg-icons"
import JoinClubBtn from "./JoinClubBtn"
import DefaultTemplate from "./DefaultTemplate"
import DarkBlueTemplate from "./DarkBlueTemplate"
import RootLayout from "../../layout"

export const metadata: Metadata = {
    title: 'گپی - قهوه به صرف دوست',
}


async function fetchData (id:number):Promise<cafeInformation> {
    const res = await fetch(LOCALHOST + 'api/cafes/detail/' + id + '/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (!res.ok){
        throw new Error('Could not fetch data')
    }
    const _data = res.json()
    console.log(_data)
    return _data
}

const joinClub = () => {

}

const Page = async ({params}: {params: {id:number}}) => {

    const {cafe, categories} = await fetchData(params.id)
    console.log(cafe)

    if (!cafe?.theme?.name || cafe.theme.name === "default")
        return <DefaultTemplate cafe={cafe} categories={categories}/>
    if (cafe.theme.name == "darkblue") {
        return (
                <DarkBlueTemplate cafe={cafe} categories={categories} />
        )
    }
}

export default Page