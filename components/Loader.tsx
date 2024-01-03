import { Props } from "next/script"
import React from "react"

const Loader: React.FC<{height:number}> = (props:{ height: number }) => {
    return (
        <>
            <div className="w-full flex col-span-12 justify-center items-center" style={{
                height: props.height
            }}>
                <span className="loader"></span>
            </div>
        </>
    )
}

export default Loader