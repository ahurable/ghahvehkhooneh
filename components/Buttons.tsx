"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { sendFollowReq } from "@/lib/fetchs"

export const SendFollowButton = ({userId}:{userId:number}) => {
    return <button className="btn-green p-4" onClick={() => sendFollowReq(userId)}>
        <FontAwesomeIcon icon={faUserPlus} />
    </button>
}

