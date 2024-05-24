"use client"
import Image from "next/image"
import image from "@/assets/img/personality.jpeg"
import { TrimedIconCard } from "@/components/Cards"
import { faFilm, faGamepad, faMusic } from "@fortawesome/free-solid-svg-icons"
import { HobbyModal, JobModal, MusicModal } from "@/layouts/Modals/PersonalityModals"
import { useAppDispatch } from "@/lib/hook"
import { setHobbyModalState } from "@/lib/features/hobbyModalSlice"
import { setJobModalState } from "@/lib/features/jobModalSlice"
import { setMGenreModalState } from "@/lib/features/mgenreModalSlice"
import InfoContentWrapper from "@/layouts/InfoContentWrapper"

const Personality = () => {

    const dispatch = useAppDispatch()

    return (
        <>  

            

            <InfoContentWrapper img={image}>
                <div className="container mt-80">
                    <div className="w-full p-4">
                        <div className="text-center w-full">
                            <h1 className="text-brown-dark">علاقه مندی های خودتون رو وارد کنید تا باشگاه ها و افراد شبیه به شما رو بهتون معرفی کنیم.</h1>
                        </div>
                            <TrimedIconCard iconName={faGamepad} altText="افزودن سرگرمی مورد علاقه" onClick={() => {dispatch(setHobbyModalState(true))}}/>
                            <TrimedIconCard iconName={faMusic} altText="افزودن موسیقی مورد علاقه" onClick={() => {dispatch(setMGenreModalState(true))}} />
                            <TrimedIconCard iconName={faFilm} altText="افزودن فیلم های مورد علاقه" onClick={() => {}}/>
                                    
                            <HobbyModal/>
                            <MusicModal/>
                    </div>
                </div>
            </InfoContentWrapper>
        </>
    )
}

export default Personality