import { BackButton, MenuWrapper, TabsWrapper } from "@/components/CafeComponents"
import type { cafeInformation } from '@/components/CafeComponents/types'
import { LOCALHOST } from "@/lib/variebles"
import { faArrowLeft, faBackspace, faBackward, faCoffee } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Tabs } from "flowbite-react"
import Slider from "./Slider"
import Head from "next/head"


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

const Page = async ({params}: {params: {id:number}}) => {

    const {cafe, categories} = await fetchData(params.id)
    // console.log(data)

    return (
        <>
            <Head>
                <title>{cafe.name} - گپی</title>
            </Head>
            <div className=" w-full rounded-lg">
                <div className="w-full">

                    <div className="container fixed top-0 transform translate-x-[50%] right-[50%] z-0">
                        <Slider pictures={cafe.pictures} classNames="h-[200px] lg:h-[380px]" />
                    </div>
                    <div className="w-full relative z-10 lg:top-80 top-52 rounded-lg py-3 mt-[-20px] shadow bg-yellow-very-melo">
                        
                        <div className="container w-full  rounded-lg">
                            <div className="p-4">
                                <h1 className="text-3xl font-black">{cafe.name}</h1>
                                <span className="text-gray-400">{cafe.address}</span>
                                <p>{cafe.about}</p>
                            </div>
                            <div className="container w-full p-4">
                                <button className="btn btn-brown w-full items-center">
                                    دعوت دوستان <FontAwesomeIcon icon={faCoffee}/>
                                </button>
                            </div>
                            { cafe.club != null && 
                                <div className="container w-full p-4 bg-brown-dark ">
                                    <h1 className="text-lg text-white">باشگاه مشتریان</h1>
                                    <div className="py-4 w-full flex flex-wrap justify-center gap-2 items-center">
                                        <div className="img-container">
                                            <img src={ LOCALHOST + cafe.club.club_avatar } className='rounded-full w-20 h-20 object-cover' alt="" />
                                        </div>
                                        <div className="ps-4">
                                            <span className="text-xl font-black text-white">{cafe.club.name}</span>
                                            <br />
                                            <span className="text-lg font-normal text-white">{cafe.club.description}</span>
                                            <br />
                                            <span className="text-white">باشگاه مشتریان ما {cafe.club.members.length} عضو دارد.</span>
                                        </div>
                                    </div>
                                </div>
                            }
                            <BackButton/>
                        </div>
                        
                        <TabsWrapper menuItems={cafe.menu_item} categories={categories} club={cafe.club} />
                    </div>
                </div>
            </div>
        </>
    )

}

export default Page