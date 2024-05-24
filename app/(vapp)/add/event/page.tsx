'use client'
import { useAppSelector } from "@/lib/hook"
import { SelectCafe, SelectClubs, CreateEventForm } from "../event/components"



const Page = () => {

    const step = useAppSelector(state => state.eventStep.steps)

    return (
        <>

            <div className="text-center w-full p-4 shadow">
                <h1 className="text-lg">خلق رویداد جدید</h1>
            </div>
            
            { step == 0 && <SelectCafe />}
            { step == 1 && <SelectClubs /> }
            { step == 2 && <CreateEventForm/>}

        </>
    )
}

export default Page