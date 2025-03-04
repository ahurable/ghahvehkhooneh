'use client'
import { MutableRefObject, useEffect, useRef, useState } from "react"
import { SendFollowButton, SendUnfollowButton, SubscribeButton } from "../Buttons"
import { LOCALHOST } from "@/lib/variebles"
import { fetchAllUsersInArea, sendFollowReq, sendUnfollowReq } from "@/lib/fetchs"
import { userType, clubsType } from "@/lib/types"
import { jwtDecode } from "jwt-decode"
import { useAuth } from "@/lib/Context/AuthContext"
import NotificationComponent from "@/layouts/Modals/MessageModals"
import { NotificationProvider, useNotification } from "@/lib/Context/NotificationContext"
import { useRouter } from "next/navigation"
import Image from "next/image"



const UsersWrapper = ({accessToken}:{accessToken:string|null}) => {


    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState<userType[]>()
    const [client, setClient] = useState<{
        user_id: number,
        username: string
    }>({
        user_id: 0,
        username: ""
    })
    const { showNotification } = useNotification()
    const [followed, setFollowed] = useState(false)
    const router = useRouter()
    useEffect(() => {
        setTimeout(() => null, 10000)
        if ( accessToken === null){
            showNotification(
                'خطا',
                'error',
                true,
                'لطفا برای داشتن دسترسی به این صفحه وارد حساب کاربری خود شوید'
            )
        } else {
            try {
                setClient(jwtDecode(accessToken))
            } catch {
                // router.push('/login')
            }
        }
        
        const fetchUsers = async () => {
            const _users = await fetchAllUsersInArea()
            setUsers(_users)
            setLoading(false)
        }
        fetchUsers()
        // console.log(client.user_id)
    }, [accessToken, router])

    return (
        <>
        <div className="grid grid-cols-12 p-4">
                {   
                    loading ?

                    <div className="w-full text-center col-span-12">
                        <h1 className="text-lg font-bold py-4 w-full text-center">
                            درحال بارگزاری...
                        </h1>
                    </div> :

                    users != undefined && users.map((user, idx) => [
                        <>
                        <NotificationComponent />
                        { client != undefined && client.username == user.username ? "" :
                            user.profile.followers.some(e => e == client.user_id) ? "" : (user.profile.first_name != null && user.profile.last_name != null) && 
                            <div key={idx} className="md:col-span-6 lg:col-span-4 col-span-12 px-4 py-1 ">
                                <div className="w-full flex items-center">
                                    <div className="py-4 w-3/12" onClick={()=> router.push('/profile/'+user.username)}>
                                        <Image src={LOCALHOST + user.profile.avatar} width={60} height={60} className="w-14 h-14 rounded-full object-cover" alt="" />
                                    </div>
                                    <div className="py-4 pe-4 w-6/12" onClick={()=> router.push('/profile/'+user.username)}>
                                        <span className="text-lg">
                                            {user.profile.first_name ? user.profile.first_name + ' ' + user.profile.last_name && user.profile.last_name : user.username}
                                        </span>
                                        <br />
                                        <span className="text-justify">
                                            {user.profile.bio.length > 20 ? user.profile.bio.substring(0, 20) + '...' : user.profile.bio }
                                        </span>
                                    </div>
                                    <div className="p-4 w-3/12">
                                        {
                                            accessToken && !followed && 
                                            <SendFollowButton onClick={async (e) => {
                                                await sendFollowReq(user.id, accessToken, showNotification)
                                                setFollowed(true)
                                            }} />
                                        }
                                        {
                                            accessToken && followed &&
                                            <SendUnfollowButton onClick={async (e) => {
                                                await sendUnfollowReq(user.id, accessToken)
                                                setFollowed(false)
                                            }} /> 
                                        }
                                    </div>
                                </div>
                                <div className="w-full">
                                
                                </div>
                            </div>
                        }
                        </>
                    ]) 
                }
            </div>
        </>
    )
}

const ClubsWrapper = () => {
    const [loading, setLoading] = useState(true)
    const [clbs, setClubs] = useState<clubsType[]>()
    const { accessToken, user } = useAuth()
    const fetchClubs = async () => {
        try {
            const token = accessToken

            const res = await fetch(LOCALHOST + 'api/cafes/clubs/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (!res.ok) {
                throw new Error('Failed to fetch clubs using your token')
            }
            return res.json()
        } catch {
            const res = await fetch(LOCALHOST + 'api/cafes/clubs/')
            if (!res.ok) {
                throw new Error('Failed to fetch clubs')
            }
            return res.json()
        }
    }

    

    useEffect(() => {
        const getClubs  = async () => {
            const allClubs = await fetchClubs()
            setClubs(allClubs)
            setLoading(false)
        }
        getClubs()
    }, [fetchClubs])

    return (
        <>
        {
            loading ? <div className="w-full text-center col-span-12">
            <h1 className="text-lg font-bold py-4 w-full text-center">
                درحال بارگزاری...
            </h1>
        </div>:
            clbs !== undefined &&  clbs.map(
                club => [
                    <div key={club.id} className="p-4 mt-4">
                        <div className='w-full rounded-3xl md:flex md:items-center shadow p-3'>
                            <div className="p-4 w-full flex flex-wrap items-center">
                                <div className="img-container block">
                                    <Image src={ club.club_avatar} width={60} height={60} className='rounded-full w-20 h-20 object-cover block' alt="" />
                                </div>
                                <div className="ps-4">
                                    <span className="text-lg">{club.name}</span>
                                    <br />
                                    <span>{club.description}</span>
                                    <br />
                                    <span>تعداد اعضا:‌ {club.members.length} نفر</span>
                                </div>
                            </div>
                            <div className="px-4 pb-4">
                                {user && <SubscribeButton clubId={club.id}/>}     
                            </div>
                        </div>
                    </div>
                ]
            ) || "باشگاهی وجود ندارد"
        }
        </>
    )
}



export const SocialTabsWrapper = () => {

    const users = useRef<HTMLButtonElement | null>(null)
    const clubs = useRef<HTMLButtonElement | null>(null)
    const [tab, setTab] = useState('users')
    const { accessToken } = useAuth()
    const access = accessToken

    const toggleTabs = (buttonName:string) => {
        if (users.current == null || clubs.current == null)
            return
        switch (buttonName) {
            case 'users':
                // users.current.classList.add('bg-white')
                users.current.classList.add('shadow')

                // clubs.current.classList.remove('bg-white')
                clubs.current.classList.remove('shadow')

                setTab('users')

                break


            case 'clubs':
                // users.current.classList.remove('bg-white')
                users.current.classList.remove('shadow')

                // clubs.current.classList.add('bg-white')
                clubs.current.classList.add('shadow')

                setTab('clubs')

                break

        }
    }

    return (
        <>
            <div className="w-full grid grid-cols-12 border-b">
                <div className="col-span-6 p-4">
                    <button ref={users} className="w-full block p-3 rounded-2xl shadow" onClick={() => toggleTabs('users')}>کاربران</button>
                </div>
                <div  className="col-span-6 p-4">
                    <button ref={clubs} className="w-full block p-3 rounded-2xl" onClick={() => toggleTabs('clubs')}>پاتوق ها</button>
                </div>
            </div>

            <div className="w-full md:container">
                { tab == "users" && <UsersWrapper accessToken={access} /> }
                
                { tab == "clubs" && <ClubsWrapper /> }
                
                
            </div>
        </>
    )
}