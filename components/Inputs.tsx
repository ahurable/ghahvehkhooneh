"use client"
import { LOCALHOST } from "@/lib/variebles"
import { FormEvent, useEffect, useRef, useState } from "react"



type hobbyType = {
    id: number,
    name: string
}

export const InputWithLiveFetch = ({inputName, liveFetchAddress, placeholder, label, fetchAddress}:{
    inputName: string,
    liveFetchAddress: string,
    placeholder: string,
    label: string,
    fetchAddress: string
}) => {
    
    const [data, setData] = useState<hobbyType[]>()

    const fetchKeywords = async (e:FormEvent) => {
        e.preventDefault()
        if(e.currentTarget.value.length == 0) {
            setData([])
            return
        }

        const res = await fetch(LOCALHOST + liveFetchAddress, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': e.currentTarget.value
            })
        })
        if (!res.ok) {
            throw new Error('failed to fetch data from offer hook!')
        }
        const _data = await res.json()
        setData(_data)
    }

    const inputRef = useRef()

    const handleDataSubmission = async (inputValue:string) => {
        console.log(inputValue)
        const token = localStorage.getItem('access')

        const res = await fetch(LOCALHOST + fetchAddress, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({name: inputValue})
        })

        if(res.ok) {
            console.log(`added to your ${inputName}`)
        }
    }


    return (
        <>
            <div className="w-full mt-3">
                <label htmlFor="hobbies">{label}:‌</label>
                <input type="text" ref={inputRef} name={inputName} onChange={fetchKeywords} placeholder={placeholder} className="rounded-lg border p-3 w-full outline-brown-normal" />
            </div>
            <div className="flex w-full p-2">
                {
                    data?.length > 0 ? 
                        data.map(d => [
                            <button key={d.id} onClick={() => handleDataSubmission(d.name)} className="p-3 rounded-full bg-blue-400 text-white block m-3">
                              {d.name}
                            </button>
                        ])
                     :
                        inputRef.current?.value.length > 0 ? 
                        <button onClick={()=>handleDataSubmission(inputRef.current.value)}  className="p-3 rounded-full bg-blue-400 text-white block m-3">
                        {inputRef.current?.value}
                    </button>:
                    ""
                }
            </div>
            
        </>
    )

}