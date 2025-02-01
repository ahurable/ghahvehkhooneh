"use client"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const BackButton = () => {

    return (

        <button className="absolute left-4 top-4 p-4 text-brown-normal" onClick={() => history.back()}>
            <FontAwesomeIcon icon={faArrowLeft} />
        </button>
    )
}
