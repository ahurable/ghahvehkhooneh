import { setPhoneValidationModal } from "@/lib/features/profileModalSlice"
import { useAppDispatch } from "@/lib/hook"
import { ValidateModal } from "./ValidateModal"


export const PhoneValidation = ({phoneNumber}:{phoneNumber:string|false}) => {4
    const dispatch = useAppDispatch()
    return (
        <>
        <div className="w-full p-4">
            <div className="rounded-xl shadow-lg p-4">
                <div className="w-full flex flex-col items-center justify-center">
                    <span className="block text-lg font-bold">شماره همراه خود را تایید کنید.</span>
                    <span className="block font-bold">{phoneNumber}</span>
                    <button className="btn btn-primary" onClick={() => dispatch(setPhoneValidationModal(true))}>تایید شماره همراه</button>
                </div>
            </div>
        </div>
        { phoneNumber != false &&
        <ValidateModal phoneNumber={phoneNumber} />
        }
      </>
    )
}