"use client"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "flowbite-react";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { setHobbyModalState } from "@/lib/features/hobbyModalSlice";
import { InputWithLiveFetch } from "@/components/Inputs";

export const HobbyModal = () => {

    const modalState = useAppSelector(state => state.hobbymodal.isOpen)
    const dispatch = useAppDispatch()
    return (

        <>
        
            <Modal show={modalState} onClose={() => dispatch(setHobbyModalState(!modalState))}>
                <ModalHeader>
                    <h1 className="text-lg">سرگرمی ها</h1>
                </ModalHeader>
                <ModalBody>
                    <InputWithLiveFetch inputName="hobby" label="سرگرمی" liveFetchAddress="hook/offer-hobby/" placeholder="افزودن سرگرمی به پروفایل خود" fetchAddress="hook/add-hobby/"/>
                </ModalBody>
                <ModalFooter>
                    <button className="btn w-full btn-red p-4" onClick={dispatch(setHobbyModalState(!modalState))}>انصراف</button>
                </ModalFooter>
            </Modal>
        </>

   )
}