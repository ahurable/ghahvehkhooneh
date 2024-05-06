"use client"
import Image from "next/image"
import image from "@/assets/img/personality.jpeg"
import { PersonalityCard } from "@/components/Cards"
import { faFilm, faGamepad, faMusic } from "@fortawesome/free-solid-svg-icons"
import { HobbyModal, JobModal, MusicModal } from "@/layouts/Modals/PersonalityModals"
import { useAppDispatch } from "@/lib/hook"
import { setHobbyModalState } from "@/lib/features/hobbyModalSlice"
import { setJobModalState } from "@/lib/features/jobModalSlice"
import { setMGenreModalState } from "@/lib/features/mgenreModalSlice"

const Personality = () => {

    const dispatch = useAppDispatch()

    return (
        <>  

            

            <div className="w-full relative">
                <div className="w-full">
                    <Image src={image} width={1000} height={1000} className="w-full fixed top-0 z-0" alt=""/>
                </div>
                <div className="relative z-10 top-80 bg-yellow-very-melo rounded-lg">
                    <div className="p-4 text-center w-full">
                        <span className="text-center text-brown-normal text-xl font-bold block">
                            علاقه مندی های خود را وارد کنید
                        </span>
                        <br />
                        <span className=" text-brown-normal">
                            بر اساس علاقه مندی های شما کاربران برای ارسال پیشنهاد دوستی به شما معرفی میشوند.
                        </span>
                    </div>
                    <div className="p-4 pt-0">
                        <PersonalityCard iconName={faGamepad} altText="افزودن سرگرمی مورد علاقه" onClick={() => {dispatch(setHobbyModalState(true))}}/>
                        <PersonalityCard iconName={faMusic} altText="افزودن موسیقی مورد علاقه" onClick={() => {dispatch(setMGenreModalState(true))}} />
                        <PersonalityCard iconName={faFilm} altText="افزودن فیلم های مورد علاقه" onClick={() => {}}/>
                    </div>
                    
                </div>

                
            </div>
            <HobbyModal/>
            <MusicModal/>
        
        </>
    )
}

export default Personality