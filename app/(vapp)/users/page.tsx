import { SendFollowButton } from "@/components/Buttons"
import { LOCALHOST } from "@/lib/variebles"
import { faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { jwtDecode } from "jwt-decode"


export interface userInArea {
    id: number,
    username: string,
    profile: {
        first_name: string,
        last_name: string,
        avatar: string,
        bio: string
    }
}

const fetchUsers = async ():Promise<userInArea[]> => {
    const res = await fetch(LOCALHOST + 'api/users/all-in-area/')
    if (!res.ok) {
        throw new Error('failed to fetch data')
    }
    return res.json()
}





const Page = async () => {


    const users = await fetchUsers()



    return (
        <div className="w-full">
            <div className=" text-center border-b">
                <h1 className="title-wrapper text-lg text-brown-dark p-5">کاربران </h1>
            </div>
            <div className="grid grid-cols-12">
                {
                    users.map(user => [
                        <>
                        { user.profile.first_name && user.profile.last_name != null && 
                        <div key={user.id} className="md:col-span-6 lg:col-span-4 col-span-12 px-4 py-1">
                            <div className="w-full flex items-center">
                                <div className="py-4 w-3/12">
                                    <img src={LOCALHOST + user.profile.avatar} className="w-20 h-20 rounded-full object-cover" alt="" />
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
        </div>
    )


}

export default Page