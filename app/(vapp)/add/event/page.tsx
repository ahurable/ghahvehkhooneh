'use client'
import { fetchOffeCafeHook } from "@/lib/fetchs"
import { cafeIdNameType } from "@/lib/types"
import { LOCALHOST } from "@/lib/variebles"
import { ChangeEvent, FormEvent, useState } from "react"


const SearchCafes = () => {

    const [suggestions, setSuggestions] = useState<cafeIdNameType[]>()
    
    
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        
        const asyncHandle = async (e:ChangeEvent<HTMLInputElement>) => {
            const _suggests = await fetchOffeCafeHook(e)
            setSuggestions(_suggests)
        }
        
        asyncHandle(e)
    }

    return (
        <>
            <input type="text" className="form-control" placeholder="جستجوی کافه" onChange={handleChange} />
            <div className="w-full">
                {suggestions?.map(suggestion => [
                    <div key={suggestion.id} className="w-full border-b p-3">
                        {suggestion.name}
                    </div>
                ])}
            </div>
        </>
    )
}


const Page = () => {


    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        console.log('')
    } 

    return (
        <>
        

            <div className="w-full">
                <div className="container w-full p-8 justify-center">
                    <div className="text-center">
                        <h1 className="text-lg">خلق رویداد جدید</h1>
                    </div>
                    <div className="my-4">
                        <form onSubmit={handleSubmit}>

                            <input type="text" name="name" className="w-full md:w-3/5 form-control block my-2" placeholder="نام رویداد" />

                            <textarea name="description" className="w-full md:w-3/5 form-control block my-2" placeholder="درباره این رویداد توضیح بدهید" id="" cols="30" rows="10"></textarea>

                            <SearchCafes />

                        </form>
                    </div>
                </div>
            </div>
            
        
        </>
    )
}

export default Page