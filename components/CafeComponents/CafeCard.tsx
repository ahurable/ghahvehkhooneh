import Slider from "@/app/(main)/cafe/[id]/Slider"


export type CafeCardProps = {
    id: number,
    name: string,
    slug: string,
    address: string,
    about: string,
    pictures: {
        picture: string,
        is_featured: boolean
    }[]
}

export const CafeCard = ({cafe}:{cafe:CafeCardProps}) => {
    
    
    return (
        <>
            <div className="w-full rounded-xl text-brown-dark lg:shadow border-gray-200 p-3">
                <div className="w-full lg:flex">
                    <div className="">
                        <div className="w-full h-full lg:w-[140px] lg:h-[130px]">
                            <Slider pictures={cafe.pictures} classNames="h-[130px] rounded-xl mx-4" />
                        </div>
                    </div>
                    <div className="lg:ps-4 lg:pt-0 pt-4">
                        <h1 className='text-lg'>{cafe.name}</h1>
                        <span className="text-gray-400">{cafe.address}</span>
                        <p>{cafe.about}</p>
                    </div>
                </div>
                
                <a href={`cafe/${cafe.slug}`} className="block w-full my-3 btn btn-brown rounded-xl text-center">بازدید از کافه</a>
            </div>
        </>
    )
}
