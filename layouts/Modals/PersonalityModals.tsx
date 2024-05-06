"use client"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "flowbite-react";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { setHobbyModalState } from "@/lib/features/hobbyModalSlice";
import { InputWithLiveFetch } from "@/components/Inputs";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setJobModalState } from "@/lib/features/jobModalSlice";
import { setMGenreModalState } from "@/lib/features/mgenreModalSlice";


interface personalitiesInterface {
    label: string,
    inputName: string,
    placeholder: string,
    liveFetchAddress: string,
    fetchAddress:string,
    modalState:boolean,
    modalFor: string
}

export const PersonalitiesModal = ({label, inputName, placeholder, liveFetchAddress, fetchAddress, modalState, modalFor}:personalitiesInterface) => {

    
    const dispatch = useAppDispatch()
    let closeFunction:any
    if (modalFor == 'hobby') {
        closeFunction = setHobbyModalState(!modalState)
    } else if (modalFor == 'music') {
        closeFunction = setMGenreModalState(!modalState)
    }

    return (

        <>
        
            <Modal  show={modalState} onClose={() => dispatch(closeFunction)}>
                <ModalHeader>
                    <h1 className="text-lg">{label}</h1>
                </ModalHeader>
                <ModalBody>
                    <InputWithLiveFetch inputName={inputName} label={label} liveFetchAddress={liveFetchAddress} placeholder={placeholder} fetchAddress={fetchAddress}/>
                </ModalBody>
                <ModalFooter>
                    <button className="btn w-full btn-red p-4" onClick={()=>dispatch(closeFunction)}>انصراف</button>
                </ModalFooter>
            </Modal>
        </>

   )
}



export const HobbyModal = () => {

    return (
        <>
            <PersonalitiesModal label="سرگرمی ها" inputName="name" placeholder="با انجام دادن چه کار هایی سرگرم میشوید؟" liveFetchAddress="hook/offer-hobby/" fetchAddress="hook/add-hobby/" modalState={useAppSelector(state => state.hobbymodal.isOpen)} modalFor="hobby"/>
        </>
    )
}

export const MusicModal = () => {
    return (
        <PersonalitiesModal label="سلیقه موسیقی" inputName="music" placeholder="به چه سبک هایی از موسیقی علاقه دارید؟" liveFetchAddress="hook/offer-music-genre/" fetchAddress="hook/add-music-genre/" modalState={useAppSelector(state => state.mgenremodal.isOpen)} modalFor="music" />
    )
}