'use client'
import { MutableRefObject, useEffect, useRef, useState } from "react"
import { SendFollowButton, SendUnfollowButton, SubscribeButton } from "../Buttons"
import { LOCALHOST } from "@/lib/variebles"
import { fetchAllUsersInArea, sendFollowReq, sendUnfollowReq } from "@/lib/fetchs"
import { userType, clubsType } from "@/lib/types"
import { jwtDecode } from "jwt-decode"



const UsersWrapper = () => {


    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState<userType[]>()
    const [client, setClient] = useState()
    
    const [followed, setFollowed] = useState(false)

    useEffect(() => {
        try {
            setClient(jwtDecode(localStorage?.getItem('access')))
        } catch {
            location.replace('/login')
        }
        const fetchUsers = async () => {
            const _users = await fetchAllUsersInArea()
            setUsers(_users)
            setLoading(false)
        }
        fetchUsers()
        // console.log(client.user_id)
    }, [UsersWrapper])

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

                    users.map(user => [
                        <>
                        { client.username == user.username ? "" :
                            user.profile.followers.some(e => e == client.user_id) ? "" : (user.profile.first_name != null && user.profile.last_name != null) && 
                            <div key={user.id} className="md:col-span-6 lg:col-span-4 col-span-12 px-4 py-1 ">
                                <div className="w-full flex items-center">
                                    <div className="py-4 w-3/12" onClick={()=> location.replace('/profile/'+user.username)}>
                                        <img src={LOCALHOST + user.profile.avatar} className="w-14 h-14 rounded-full object-cover" alt="" />
                                    </div>
                                    <div className="py-4 pe-4 w-6/12" onClick={()=> location.replace('/profile/'+user.username)}>
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
                                            !followed &&    
                                            <SendFollowButton onClick={async (e) => {
                                                await sendFollowReq(user.id)
                                                setFollowed(true)
                                            }} />
                                        }
                                        {
                                            followed &&
                                            <SendUnfollowButton onClick={async (e) => {
                                                await sendUnfollowReq(user.id)
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
    const fetchClubs = async () => {
        try {
            const token = localStorage.getItem('access')

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
    }, [ClubsWrapper])

    return (
        <>
        {
            loading ? <div className="w-full text-center col-span-12">
            <h1 className="text-lg font-bold py-4 w-full text-center">
                درحال بارگزاری...
            </h1>
        </div>:
            clbs.map(
                club => [
                    <div key={club.id} className="p-4 mt-4">
                        <div className='w-full rounded-3xl md:flex md:items-center shadow p-3'>
                            <div className="p-4 w-full flex flex-wrap items-center">
                                <div className="img-container block">
                                    <img src={ club.club_avatar} className='rounded-full w-20 h-20 object-cover block' alt="" />
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
                                <SubscribeButton clubId={club.id}/>     
                            </div>
                        </div>
                    </div>
                ]
            )
        }
        </>
    )
}



export const SocialTabsWrapper = () => {

    const users = useRef()
    const clubs = useRef()
    const [tab, setTab] = useState('users')

    const toggleTabs = (buttonName:string) => {
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
                { tab == "users" && <UsersWrapper /> }
                
                { tab == "clubs" && <ClubsWrapper /> }
                
                
            </div>
        </>
    )
}