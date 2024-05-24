import { TrimedIconCard } from "@/components/Cards"
import { SuccessModal } from "@/layouts/Modals/MessageModals"
import { cafeCardType, cafeIdNameType, smallClubType } from "@/lib/types"
import { LOCALHOST } from "@/lib/variebles"
import { faTable } from "@fortawesome/free-solid-svg-icons"
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import { setEventCafe, setEventClub, setEventStep } from "@/lib/features/eventStep"

export const CreateEventForm = () => {
    const [success, setSuccess] = useState(false)

    const cafe = useAppSelector(state => state.eventStep.cafe)
    const club = useAppSelector(state => state.eventStep.club)

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const token = localStorage.getItem('access')
        const res = await fetch(
            LOCALHOST + 'api/events/create/',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.get('name'),
                    description: formData.get('description'),
                    cafe: cafe,
                    club: club
                })
            }
        )
        if (res.ok) {
            setSuccess(true)
        }
    } 

    return (
        <>
            <SuccessModal title="موفق" description="رویداد شما با موفقیت ایجاد شد" state={success} redirectPath="/main" /> 

            <div className="w-full">
                <div className="container w-full p-8 justify-center">
                    <div className="my-4">
                        <form onSubmit={handleSubmit}>

                            <input type="text" name="name" className="w-full md:w-3/5 form-control block my-3" placeholder="نام رویداد" />

                            <textarea name="description" className="w-full md:w-3/5 form-control block my-3" placeholder="درباره این رویداد توضیح بدهید" id="" cols="30" rows="10"></textarea>

                            <button type="submit" className="btn btn-green w-full p-4 mt-4">ایجاد رویداد</button>
                        </form>
                    </div>
                </div>
            </div>
            
        
        </>
    )
}


export const SelectClubs = () => {

    const [loading, setLoading] = useState(true)
    const [clubs, setClubs] = useState<smallClubType[]>()

    useEffect(() => {
        const fetchUserClubs = async () => {
            const token = localStorage.getItem('access')
            const res = await fetch(LOCALHOST + 'hook/user-clubs/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (!res.ok) {
                throw new Error('cant fetch from user clubs')
            }
            return res.json()
        }
        const asyncHandler = async () => {
            const _clubs = await fetchUserClubs()
            setClubs(_clubs)
            setLoading(false)
        }
        asyncHandler()
    })
    const dispatch = useAppDispatch()

    return (
        <>
        <div className="w-full">
            <div className="container p-4">
                <div className="grid grid-cols-12">
                {   loading ? 
                    <div className="col-span-12 pt-14">
                        <span className="text-lg font-bold text-center">در حال بارگیری...</span>
                    </div>
                    :
                    clubs?.map(club => [
                    <div key={club.id} onClick={() => {
                        dispatch(setEventClub(club.id))
                        dispatch(setEventStep(1))
                    }} className="col-span-6 md:col-span-4 lg:col-span-3 p-2">
                        <div className="rounded-lg shadow p-3">
                            <div className="w-full flex justify-center">
                                <img src={LOCALHOST + club.club_avatar} alt="" className="rounded-full w-20 h-20 object-cover" />
                            </div>
                            <div className="w-full text-center pt-3">
                                <span>{club.name}</span>
                            </div>
                        </div>
                    </div>         
                    ])
                }
                </div>
            </div>
        </div>
        </>
    )

}


export const SelectCafe = () => {

    const [loading, setLoading] = useState(true)
    const [cafes, setCafes] = useState<cafeCardType[]>()
    const dispatch = useAppDispatch()

    useEffect(() => {
        const fetchAllCafeInArea = async () => {
            const res = await fetch( LOCALHOST + 'api/cafes/list/')
            if (!res.ok)
                throw new Error('Failed to fetch list of cafes for creating event')
            return res.json()
        }
        const handleAsync = async () => {
            const _cafes = await fetchAllCafeInArea()
            setCafes(_cafes)
            setLoading(false)
        }
        handleAsync()
    }, [SelectCafe])


    return (
        <>

            <div className="w-full">
                <div className="container p-4">
                    <div className="grid grid-cols-12">
                        {
                            loading ? <div className="col-span-12 text-center">
                                <span className="text-lg font-bold pt-10">درحال بارگیری...</span>
                            </div> : cafes?.map(cafe => [
                                <div key={cafe.id} className="col-span-6 md:col-span-4 lg:col-span-3 p-2" onClick={() => {
                                    dispatch(setEventCafe(cafe.id))
                                    dispatch(setEventStep(1))
                                }}>
                                    <div className="w-full bg-brown-normal text-white rounded-3xl shadow p-4">
                                        <div className="w-full">
                                            <img src={LOCALHOST + cafe.picture} alt="" srcset="" className="rounded-2xl object-cover w-full h-32" />
                                        </div>
                                        <div className="w-full pt-2">
                                            <span className="font-normal text-lg block">{cafe.name}</span>
                                        </div>
                                    </div>
                                </div>
                            ])
                        }
                    </div>
                </div>
            </div>
        
        </>
    )
}


export const AddEventButton = () => {
    const dispatch = useAppDispatch()

    return (
        <div className="w-full">
            <div className="container">
                <div className="lg:w- md:w- w-full p-4">
                    <div className="py-4">
                        <TrimedIconCard iconName={faTable} altText="ایجاد یک رویداد جدید" onClick={() => {location.replace('/add/event')}} />
                    </div>
                </div>
            </div>
        </div>
    )
}
