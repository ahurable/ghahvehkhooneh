"use client"

import { ChangeEvent, useState } from "react"
import { FormEvent } from "react"
import { Calendar, DateObject } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { ErrorModal, SuccessModal } from "@/layouts/Modals/MessageModals"
import { useAuth } from "@/lib/Context/AuthContext"
import { useRouter } from "next/navigation"
import { ThreeDot } from "react-loading-indicators"


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
            multiple?: boolean;
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
    redirectPath: string | undefined;
    club?: number,
}


export const MultiStepsForm = ({props}:{props:MultiStepsFormProps}) => {


    const initializeFormValues = () => {
        const initialValues: { [key: string]: string | number | File[] | undefined } = {};
    
        props.steps.forEach(step => {
            const input = step.input;
    
            if (input.type === "datepicker") {
                initialValues[input.name] = undefined; // Date initially unset
            } else if (input.type === "clock") {
                initialValues[input.name] = undefined; // Time initially unset
            } else if (input.type === "file") {
                initialValues[input.name] = []; // Empty array for file inputs
            } else {
                initialValues[input.name] = ""; // Default empty string for text inputs
            }
        });
    
        return initialValues;
    };

    const [wstep, setStep] = useState(1)
    const [formValues, setFormValues] = useState(initializeFormValues);
    const [successState, setSuccessState] = useState(false)
    const [pictures, setPictures] = useState<File[]>([])
    const [errorState, setErrorState] = useState(false)
    const [date, setDate] = useState<number | undefined>()
    const [loading, setLoading] = useState<boolean>(false)
    const [time, setTime] = useState<number | undefined>()
    const nextStep = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setStep(wstep+1)
                                                
    }
    
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
          const files = Array.from(event.target.files); // Convert FileList to an array
          setPictures(files);
        }
      };

    const prevStep = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setStep(wstep-1)
    }
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
    
        if (type === "file" && e.target instanceof HTMLInputElement) {
            const files = e.target.files ? Array.from(e.target.files) : [];
            setFormValues(prevValues => ({
                ...prevValues,
                [name]: files
            }));
        } else {
            setFormValues(prevValues => ({
                ...prevValues,
                [name]: value
            }));
        }
    };
    
    const isStepValid = (stepIdx: number) => {
        const step = props.steps.find(s => s.idx === stepIdx);
        if (!step) return false;
        console.log(stepIdx)
        // Find all required fields in the current step
        const requiredInputs = props.steps
            .filter(s => s.idx === stepIdx)
            .map(s => s.input);
    
        const isValid = requiredInputs.every(input => {
            const value = formValues[input.name];
            console.log(formValues)
            if (input.type === "datepicker") return date !== undefined;
            if (input.type === "clock") return time !== undefined;
            if (input.type === "file") return pictures.length > 0;
            return typeof value === "string" && value.trim().length > 0;
        });
        console.log(isValid)
        return(isValid)
    };

    const { accessToken } = useAuth()
    const router = useRouter()

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // const formData = new FormData(e.currentTarget)
        // console.log(formData)
        setLoading(true)
        try {
            
            const formData = new FormData(e.currentTarget)
            const token = accessToken
            if (pictures.length > 0) {
                pictures.forEach((picture, index) => {
                    formData.append(`pictures`, picture); // You can name them as needed
                });
            }
            if (props.club != undefined && props.club > 0) {
                formData.append('club',props.club.toString())
            }
            if(props.steps.some(step => step.input.type === "datepicker")) {
                if (typeof date == "number") {
                    formData.append('date', date.toString())
                } else if (date == undefined)
                    alert("از تقویم یک تاریخ انتخاب نمایید")
                console.log(date)
            }
            // if(props.steps.some(step => step.input.type === "clock")) {
            //     if (typeof time == "number") {
            //         formData.append('time', time.toString())
            //     } else if (time == undefined)
            //         alert("ساعت برگزاری رویداد را مشخص نمایید")
            //     console.log(time)
            // }
            const response = await fetch(props.fetchUrl, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            })
            const data = await response.json()
            
            if(response.ok || response.status == 201){
                setSuccessState(true)
                setLoading(false)
                if (props.redirectPath && props.redirectPath.length > 0)
                    router.push(props.redirectPath)
            } else {
                setLoading(false)
                setErrorState(true)
            }
        } catch {
            setLoading(false)
            setErrorState(true)
        }
        
    }

    return (
        <main className="w-full h-full fixed overflow-auto right-[50%] transform translate-x-[50%] top-0  bg-[url(/cafe-pattern.jpg)]">

            <div className="absolute w-full h-full z-10 bg-brown-normal bg-opacity-60 top-0 right-0"></div>
            <SuccessModal state={successState} title={''} description={props.successMessage} redirectPath={props.redirectPath} />
            <ErrorModal state={errorState} title={''} description={props.errorMessage} redirectPath={null} />
            <div className="md:w-[720px] lg:w-[1000px] w-11/12 mx-auto relative h-full z-20">
                <h1 className="text-center text-[34px] pt-10 font-bold text-white">قهوه خونه</h1>
                <h1 className="text-center text-[50px] pb-10 font-black text-white">{props.pageTitle}</h1>
                <div className="form-wrapper h-mx absolute bottom-0 pb-20 md:pb-4 mt-4">
                    <div className="flex justify-center">
                        <form onSubmit={onSubmit}>
                            {
                                props.steps.map(step => [
                                    <div key={step.idx} className={wstep == step.idx ? "step py-10 flex justify-center flex-col" : "step hidden"}>
                                        
                                        <span className="font-normal text-md md:w-[620px] w-full">{step.helpText}</span>

                                        
                                        <div className="md:w-[620px] mt-14 text-start">
                                            <label htmlFor="username" className="text-md my-4">{step.label}</label>
                                              
                                                {
                                                 step.input.type == "textarea" &&
                                                    <textarea rows={3} 
                                                    id={step.input.id} 
                                                    name={step.input.name} 
                                                    onChange={handleInputChange}
                                                    className={`form-control md:w-[620px] w-full ${step.input.classNames}`} 
                                                    placeholder={step.input.placeholder} ></textarea>
                                                }
                                                 
                                                {
                                                 step.input.multiple && step.input.multiple == true &&
                                                    <input type={step.input.type} 
                                                    accept="images/*" 
                                                    onChange={(e) => {
                                                        handleFileChange(e)
                                                        handleInputChange(e)
                                                    }} 
                                                    multiple 
                                                    id={step.input.id} 
                                                    name={step.input.name} 
                                                    className={`form-control md:w-[620px] w-full ${step.input.classNames}`} 
                                                    placeholder={step.input.placeholder} />
                                                }

                                                {
                                                 step.input.type =="text" &&
                                                    <input type={step.input.type} 
                                                    id={step.input.id} name={step.input.name} 
                                                    onChange={handleInputChange}
                                                    className={`form-control md:w-[620px] w-full ${step.input.classNames}`} 
                                                    placeholder={step.input.placeholder} />
                                                }
                                            
                                                {
                                                 step.input.type=="datepicker" &&
                                                    <Calendar
                                                        calendar={persian}
                                                        locale={persian_fa}
                                                        disableMonthPicker={true}
                                                        disableYearPicker={true}
                                                        onChange={e => {setDate(e?.unix)
                                                            console.log(typeof e)
                                                        }}
                                                        buttons={false}
                                                        minDate={new DateObject({ calendar: persian }).subtract(2, "days")}
                                                        maxDate={new DateObject({ calendar: persian }).add(5, "days")}
                                                    />
                                                }
                                                {
                                                    step.input.type == "clock" && 
                                                        <input type="time" 
                                                        name="time"
                                                        onChange={e => setTime(e.timeStamp)}
                                                        value={"13:00"}
                                                        className={`form-control md:w-[620px] w-full ${step.input.classNames}`} 
                                                        />
                                                }
                                            
                                            </div>

                                        {
                                            step.isLastStep == false && step.idx ==1 && <div className={wstep == step.idx ? "mt-10 text-center lg:w-[620px]" : "hidden"}>
                                                <button id="continue" onClick={nextStep} disabled={!isStepValid(wstep)} className="btn btn-blue">{step.nextButtonText}</button>
                                            </div>
                                        } {
                                            step.isLastStep == false && step.idx > 1 && <div className={ "mt-10 text-center " }>
                                                <button id="back" onClick={prevStep} className="btn btn-red">قبلی</button>
                                                <button id="continue" onClick={nextStep} disabled={!isStepValid(wstep)} className="btn btn-blue mt-4">{step.nextButtonText}</button>
                                            </div>
                                        }
                                        {
                                            step.isLastStep == true && <>
                                                <div className={ "mt-10 text-center " }>
                                                    <button id="back" onClick={prevStep} className="btn btn-blue">قبلی</button>
                                                    <button id="register" type="submit" disabled={!isStepValid(wstep) && loading} className="btn btn-green mt-4">
                                                        { loading ? <ThreeDot color={'#ffffff'} /> : "ثبت"}
                                                    </button>
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
