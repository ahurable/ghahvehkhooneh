"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserMinus, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { sendFollowReq } from "@/lib/fetchs"
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState, useRef, MouseEventHandler } from "react"
import { LOCALHOST } from "@/lib/variebles"



export const SendFollowButton = ({onClick}:{onClick:MouseEventHandler<HTMLButtonElement>}) => {
    return <button className="btn-circle-slate w-10 h-10 float-left" onClick={onClick}>
        <FontAwesomeIcon icon={faUserPlus} />
    </button>
}

export const SendUnfollowButton = ({classNames, onClick}:{classNames?:string, onClick:MouseEventHandler<HTMLButtonElement>}) => {
    return <button className={`btn-circle-slate w-10 h-10 float-left ${classNames}`} onClick={onClick}>
    <FontAwesomeIcon icon={faUserMinus} />
</button>
}

export const SubscribeButton = ({classNames, clubId}:{classNames?:string, clubId:number}) => {
    const [subscribed, setSubscribed] = useState<boolean>(false)
    const [haveLogin, setHaveLogin] = useState<boolean>(false)
    const token = localStorage.getItem('access')
    const subscribeClub = async (id:number) => {
        if (token){
            try {
                const res = await fetch(`${LOCALHOST}api/club/add/member/${id}/`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (res.status == 201)
                    return true
                return false
            } catch(error) {
                console.log(error)
            }
        }
    }
    useEffect(() => {
        if (token != null && token.length > 0) {
            console.log('fetching')
            fetch(`${LOCALHOST}api/club/is/member/${clubId}/`, {
                method: 'post',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if (res.status == 201)
                    setSubscribed(true)
            })
            .catch((error) => console.log(error))
            // console.log(subscribed)
        }
        else {
            setHaveLogin(true)
        }
    }, [])
    return (
        <>
            {!subscribed && 
                <button 
                onClick={async () => {
                    const sub = await subscribeClub(clubId)
                    sub && setSubscribed(true)
                }}
                className="md:w-max w-full text-center my-4 block border-brown-normal border border-b-4 relative z-20 rounded-3xl p-4 mt-7 object-contain">
                    عضویت در باشگاه
                </button>
            }
            {
                subscribed &&
                <button 
                disabled
                className="md:w-max w-full text-center my-4 block border-brown-normal border border-b-4 relative z-20 rounded-3xl p-4 mt-7 object-contain">
                    عضو شده اید
                </button>
            }
        </>
    )
}

export const AddButton = ({url, show}:{url:string, show:boolean}) => {

    const AddButtonRef = useRef<HTMLAnchorElement | null>(null)
    const [sy, setSy] = useState(0)
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > sy) {
                if (AddButtonRef.current)
                    AddButtonRef.current.style.marginBottom = "-80px"

                setSy(window.scrollY)
            } else if (window.scrollY < sy) {

                if (AddButtonRef.current)
                    AddButtonRef.current.style.marginBottom = "0px"
                
                setSy(window.scrollY)
            }
        })
    })

    return (
        <a href={url} ref={AddButtonRef} className={show ? `btn rounded-full w-16 h-16 transition-all text-center text-2xl fixed bottom-24 right-4 bg-brown-normal text-white  z-[1000] ` + `block` : `hidden`}>
            <FontAwesomeIcon icon={faPlus} className='my-2'/>
        </a>
    )
}