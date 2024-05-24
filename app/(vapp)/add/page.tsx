'use client'
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import { AddEventButton, SelectCafe, SelectClubs, CreateEventForm } from "./event/components"



const Page = () => {

    const step = useAppSelector(state => state.eventStep.steps)

    return (
        <>

            <div className="text-center w-full p-4 shadow">
                <h1 className="text-lg">ایجاد</h1>
            </div>
            
            <AddEventButton/>

        </>
    )
}

export default Page