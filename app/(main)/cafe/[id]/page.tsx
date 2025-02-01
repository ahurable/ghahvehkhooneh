import { BackButton, MenuWrapper, TabsWrapper, cafeInformation } from "@/components/CafeComponents"
import { LOCALHOST } from "@/lib/variebles"
import { faArrowLeft, faBackspace, faBackward, faCoffee } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Tabs } from "flowbite-react"
import Slider from "./Slider"


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
            <div className=" w-full rounded-lg">
                <div className="w-full">
                    <div className="w-full fixed top-0 right-0 z-0">
                        <Slider pictures={cafe.pictures} classNames="h-[200px]" />
                    </div>
                    <div className="w-full relative z-10 top-52 rounded-lg py-3 mt-[-20px] shadow bg-yellow-very-melo">
                        <div className="container w-full  rounded-lg">
                            <div className="p-4">
                                <h1 className="text-lg">{cafe.name}</h1>
                                <span className="text-gray-400">{cafe.address}</span>
                                <p>{cafe.about}</p>
                            </div>
                            <div className="container w-full p-4">
                                <button className="btn btn-brown w-full items-center">
                                    دعوت دوستان <FontAwesomeIcon icon={faCoffee}/>
                                </button>
                            </div>
                            { cafe.club != null && 
                                <div className="container w-full p-4">
                                    <h1 className="text-lg">باشگاه مشتریان</h1>
                                    <div className="py-4 w-full flex items-center">
                                        <div className="img-container">
                                            <img src={ LOCALHOST + cafe.club.club_avatar } className='rounded-full w-20 h-20 object-cover' alt="" />
                                        </div>
                                        <div className="ps-4">
                                            <span className="text-lg font-bold">{cafe.club.name}</span>
                                            <br />
                                            <span>{cafe.club.description}</span>
                                            <br />
                                            <span>تعداد اعضا:‌ {cafe.club.members.length} نفر</span>
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