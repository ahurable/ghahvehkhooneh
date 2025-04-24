import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Slider from "./Slider"
import Image from "next/image"
import JoinClubBtn from "./JoinClubBtn"
import { BackButton, TabsWrapper } from "@/components/CafeComponents"
import { cafeInformation } from "@/components/CafeComponents/types"
import { IMAGE_HOST } from "@/lib/variebles"
import { faMap } from "@fortawesome/free-regular-svg-icons"
import Head from "next/head"

const DefaultTemplate = ({cafe, categories}:cafeInformation) => {
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
                                {
                                    typeof(cafe.location) == 'string' && cafe.location.length > 0 &&
                                    <a href={cafe.location} className="btn btn-brown block text-center w-full items-center">
                                        مشاهده روی نقشه <FontAwesomeIcon icon={faMap}/>
                                    </a>
                                }
                            </div>
                            { cafe.club != null && 
                                <div className="container w-full p-4 bg-brown-dark ">
                                    <div className="py-4 w-full flex flex-wrap justify-center gap-2 items-center">
                                        <div className="img-container">
                                            <Image src={ IMAGE_HOST + cafe.club.club_avatar } width={100} height={100} className='rounded-full w-20 h-20 object-cover' alt="" />
                                        </div>
                                        <div className="ps-4">
                                            <span className="text-xl font-black text-white">{cafe.club.name}</span>
                                            <br />
                                            <span className="text-lg font-normal text-white text-justify">{cafe.club.description}</span>
                                            <br />
                                            <span className="text-white">باشگاه مشتریان ما {cafe.club.members.length} عضو دارد.</span>
                                            <JoinClubBtn clubId={cafe.club.id} />
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

export default DefaultTemplate