'use client'
import { useEffect, useRef, useState } from "react"
import { SendFollowButton } from "../Buttons"
import { LOCALHOST } from "@/lib/variebles"

interface profileType {
    first_name: string,
    last_name: string,
    avatar: string ,
    bio: string
}
interface userType {
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



const UsersWrapper = ({users}:{users:userType[]}) => {

    return (
        <>
        <div className="grid grid-cols-12 p-4">
                {
                    users.map(user => [
                        <>
                        { user.profile.first_name && user.profile.last_name != null && 
                        <div key={user.id} className="md:col-span-6 lg:col-span-4 col-span-12 px-4 py-1 ">
                            <div className="w-full flex items-center">
                                <div className="py-4 w-3/12">
                                    <img src={LOCALHOST + user.profile.avatar} className="w-14 h-14 rounded-full object-cover" alt="" />
                                </div>
                                <div className="py-4 pe-4 w-6/12">
                                    <span className="text-lg">
                                        {user.profile.first_name} {user.profile.last_name}
                                    </span>
                                    <br />
                                    <span className="text-justify">
                                        {user.profile.bio.length > 20 ? user.profile.bio.substring(0, 20) + '...' : user.profile.bio }
                                    </span>
                                </div>
                                <div className="p-4 w-3/12">
                                    <SendFollowButton userId={user.id} />
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
    })

    return (
        <>
        {
            loading ? <span className="mt-10 w-full text-center">درحال بارگزاری</span> :
            clbs.map(
                club => [
                    <div key={club.id} className="p-4 mt-4">
                        <div className='w-full rounded-lg shadow p-3'>
                            <div className="p-4 w-full flex items-center">
                                <div className="img-container">
                                    <img src={ club.club_avatar} className='rounded-full w-20 h-20 object-cover' alt="" />
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
                                <button className="btn-green w-full p-4">بازدید از پاتوق</button>
                            </div>
                        </div>
                    </div>
                    
                ]
            )
        }
        </>
    )
}



export const SocialTabsWrapper = ({usersObject}:{usersObject: userType[]}) => {

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
                    <button ref={users} className="w-full block p-3 rounded-lg shadow" onClick={() => toggleTabs('users')}>کاربران</button>
                </div>
                <div  className="col-span-6 p-4">
                    <button ref={clubs} className="w-full block p-3 rounded-lg" onClick={() => toggleTabs('clubs')}>پاتوق ها</button>
                </div>
            </div>

            <div className="w-full md:container">
                { tab == "users" && <UsersWrapper users={usersObject} /> }
                
                { tab == "clubs" && <ClubsWrapper /> }
                
                
            </div>
        </>
    )
}