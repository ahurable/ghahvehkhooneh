import { BackButton, MenuWrapper, TabsWrapper, cafeInformation } from "@/components/CafeComponents"
import { LOCALHOST } from "@/lib/variebles"
import { faArrowLeft, faBackspace, faBackward, faCoffee } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Tabs } from "flowbite-react"


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
    return res.json()
}

const Page = async ({params}: {params: {id:number}}) => {

    const data = await fetchData(params.id)

    return (
        <>
            <div className="md:container w-full rounded-lg">
                <div className="w-full">
                    <div className="w-full fixed top-0 z-0">
                        <img src={LOCALHOST + data.picture} alt="" className="w-full h-60 object-cover" />
                    </div>
                    <div className="w-full relative z-10 top-52 rounded-lg py-3 mt-[-20px] bg-yellow-very-melo">
                        <div className="w-full  rounded-lg">
                            <div className="p-4">
                                <h1 className="text-lg">{data.name}</h1>
                                <span className="text-gray-400">{data.address}</span>
                                <p>{data.about}</p>
                            </div>
                            <div className="w-full p-4">
                                <button className="btn btn-brown w-full items-center">
                                    دعوت دوستان <FontAwesomeIcon icon={faCoffee}/>
                                </button>
                            </div>
                            <BackButton/>
                        </div>
                        
                        <TabsWrapper menuItems={data.menu_item} ratings={data.ratings} />
                    </div>
                </div>
            </div>
        </>
    )

}

export default Page