import { LOCALHOST } from "@/lib/variebles"
import { menuItem } from "./types"
import Image from "next/image"

export const MenuItem = ({menuItem}:{menuItem: menuItem}) => {
    return (
        <div className="w-full">
            <div className="">
                <div className="w-full rounded-lg p-3 flex items-center">
                    <div className="w-3/12 p-2">
                        <Image src={LOCALHOST + menuItem.picture} alt="" className="w-20 h-20 rounded-lg object-cover" />
                    </div>
                    <div className="w-5/12 p-2">
                        <span className="text-lg">{menuItem.item}</span><br />
                        <span className="text-gray-600">{menuItem.description}</span>
                    </div>
                    <div className="w-3/12">
                        <span className="float-end">
                            <span className="text-xl">{menuItem.price}</span>
                            <span className="text-sm">تومان</span>
                        </span> 
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
