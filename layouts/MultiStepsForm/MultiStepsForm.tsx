"use client"

import { useState } from "react"
import { FormEvent } from "react"
import { redirect } from "next/navigation"
import { LOCALHOST } from "@/lib/variebles"
import { ErrorModal, SuccessModal } from "@/layouts/Modals/MessageModals"


type MultiStepsFormProps = {
    pageTitle: string;
    steps: {
        idx: number;
        label: string;
        input: {
            type: string;
            placeholder: string;
            name: string;
            id: string;
            classNames: string | null;
        };
        helpText: string;
        isLastStep: boolean;
        nextButtonText: string;
    }[];
    // submitFunction: () => Promise<void>;
    fetchUrl: string;
    successMessage: string;
    errorMessage: string;
    redirectPath: string | null;
}


export const MultiStepsForm = ({props}:{props:MultiStepsFormProps}) => {

    const [wstep, setStep] = useState(1)
    const [successState, setSuccessState] = useState(false)
    const [errorState, setErrorState] = useState(false)
    const nextStep = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setStep(wstep+1)
    }

    const prevStep = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setStep(wstep-1)
    }

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const formData = new FormData(e.currentTarget)
            const token = localStorage.getItem('access')
            const response = await fetch(props.fetchUrl, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            })
            const data = await response.json()
            
            if(response.ok){
                setSuccessState(true)
            } else {
                setErrorState(true)
            }
        } catch {
            setErrorState(true)
        }
        
    }

    return (
        <main className="w-full h-full fixed overflow-auto top-0 bg-brown-light">
            <SuccessModal state={successState} title={''} description={props.successMessage} redirectPath={props.redirectPath} />
            <ErrorModal state={errorState} title={''} description={props.errorMessage} redirectPath={null} />
            <div className="md:w-[720px] lg:w-[1000px] w-11/12 mx-auto relative h-full">
                <h1 className="text-center text-[34px] pt-10 text-brown-dark font-bold">قهوه خونه</h1>
                <h1 className="text-center text-[50px] pb-10 font-black text-brown-dark">{props.pageTitle}</h1>
                <div className="form-wrapper h-mx absolute bottom-0 pb-20 md:pb-4 mt-4">
                    <div className="flex justify-center">
                        <form onSubmit={onSubmit}>
                            {
                                props.steps.map(step => [
                                    <div key={step.idx} className={wstep == step.idx ? "step py-10 flex justify-center flex-col" : "step hidden"}>
                                        
                                        <span className="font-normal text-md md:w-[620px] w-full">{step.helpText}</span>

                                        
                                        <div className="md:w-[620px] mt-14 text-start">
                                            <label htmlFor="username" className="text-md my-4">{step.label}</label>
                                            <input type={step.input.type} id={step.input.id} name={step.input.name} className={`form-control md:w-[620px] w-full ${step.input.classNames}`} placeholder={step.input.placeholder} />
                                        </div>

                                        {
                                            step.isLastStep == false && step.idx ==1 && <div className={wstep == step.idx ? "mt-10 text-center lg:w-[620px]" : "hidden"}>
                                                <button id="continue" onClick={nextStep} className="btn btn-blue">{step.nextButtonText}</button>
                                            </div>
                                        } {
                                            step.isLastStep == false && step.idx > 1 && <div className={ "mt-10 text-center " }>
                                                <button id="back" onClick={prevStep} className="btn btn-red">قبلی</button>
                                                <button id="continue" onClick={nextStep} className="btn btn-blue mt-4">{step.nextButtonText}</button>
                                            </div>
                                        }
                                        {
                                            step.isLastStep == true && <>
                                                <div className={ "mt-10 text-center " }>
                                                    <button id="back" onClick={prevStep} className="btn btn-blue">قبلی</button>
                                                    <button id="register" type="submit" className="btn btn-green mt-4">ثبت نام</button>
                                                </div>
                                            </>
                                        }
                                    </div>
                                ])
                            }
                        </form>
                    </div>
                </div>
            </div>
        </main>
        )
    }
