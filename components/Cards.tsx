import { IconDefinition, faCoffee, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { MouseEvent, MouseEventHandler } from "react"



export const TrimedIconCard = ({iconName, altText, onClick}:{iconName: IconDefinition, altText:string, onClick:MouseEventHandler}) => {
    return (
        <>
        
            <div className="w-full relative" onClick={onClick}>
                <div className="border-brown-normal border border-b-4 relative z-20 rounded-3xl p-4 mt-7 object-contain">
                    <div className="w-full flex items-center">
                        <span className="block text-2xl mx-4 text-brown-normal">
                            <FontAwesomeIcon icon={faPlus} />
                        </span>
                        <span className="block text-brown-normal">
                            { altText }
                        </span>
                    </div>
                    <span className="absolute h-full left-2 top-0 opacity-35 text-brown-normal z-10 overflow-hidden">
                        <FontAwesomeIcon icon={iconName} className="text-[90px]" />
                    </span>
                </div>
            </div>
        </>
    )
}