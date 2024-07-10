import { faBackspace, faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ReactNode } from "react"


export const Modal = ({children, show}:{children:ReactNode, show:boolean}) => {

    return (
        <>
        
            <div className={show ? "w-full h-full fixed top-0 right-0 bg-black bg-opacity-30 overflow-auto block" : "w-full h-full fixed top-0 right-0 bg-black bg-opacity-30 hidden"} style={{zIndex:99}}>
                <div className="lg:w-[550px] w-full h-full bg-white">
                    <div className="h-max bg-white">
                    {children}
                    </div>
                </div>
            </div>
        
        </>
    )
}

export const ModalHeader = ({children, onClose}: {children:ReactNode, onClose:()=>void}) => {
    return (
        <>
            <div className="p-6 border-b">
                <div className="w-full grid grid-cols-12 items-center">
                    <div className="col-span-11">
                        {children}
                    </div>
                    <div className="col-span-1">
                        <button className="btn" onClick={onClose}><FontAwesomeIcon icon={faClose} /></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export const ModalFooter = ({children}: {children:ReactNode}) => {
    return (
        <>
            <div className="p-4 border-t h-max">
                {children}
            </div>
        </>
    )
}

export const ModalBody = ({children}: {children:ReactNode}) => {
    return (
        <>
            <div className="p-4">
                {children}
            </div>
        </>
    )
}