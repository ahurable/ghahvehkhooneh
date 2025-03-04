'use client'
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import { AddButtons } from "./event/components"
import InfoContentWrapper from "@/layouts/InfoContentWrapper"
import img from "@/assets/img/cafe-night.jpeg"

const Page = () => {

    const step = useAppSelector(state => state.eventStep.steps)

    return (
        <>
            <div className=" w-full">
                <InfoContentWrapper img={img}>
                    <div className="container">
                        <div className="w-full p-4">
                            <div className="text-center w-full">
                                <h1 className="text-brown-dark">شروع کنید به ایجاد یک رخداد یا به عنوان صاحب کافه میتوانید درخواست ایجاد پروفایل کافتون رو اینجا برای ما ارسال کنید..</h1>
                            </div>
                                <AddButtons/>
                        </div>
                    </div>
                </InfoContentWrapper>
            </div>
        </>
    )
}

export default Page