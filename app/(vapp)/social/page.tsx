import { LOCALHOST } from "@/lib/variebles"
import { SocialTabsWrapper } from "@/components/tabs/SocialTabs"

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


    return (
        <div className="w-full">
            <div className=" text-center border-b">
                <h1 className="title-wrapper text-lg text-brown-dark p-5"> اجتماعی </h1>
            </div>
            <SocialTabsWrapper />
        </div>
    )


}

export default Page