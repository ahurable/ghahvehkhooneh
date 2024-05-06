"use client"

import { faCheckCircle } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react"
import { useState } from "react"


export const SuccessModal = ({title, description, state, redirectPath}:{title:string, description:string, state:boolean, redirectPath:string}) => {

    

    return (

        <Modal show={state} onClose={() => location.replace(redirectPath)}>
            <ModalHeader>
                <h1>{title}</h1>
            </ModalHeader>
            <ModalBody>
                <div className="w-full text-center">
                    <span className="text-[90px] text-green-400 block">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-green-400"/>
                    </span>
                    <span className="block mt-3">
                        {description}
                    </span>
                </div>
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-green p-4" onClick={() => location.replace(redirectPath)}>
                    تایید
                </button>
            </ModalFooter>
        </Modal>

    )

}