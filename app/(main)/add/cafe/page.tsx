"use client"

import { SelectWithLiveFetch } from "@/components/Inputs"
import { SuccessModal } from "@/layouts/Modals/MessageModals"
import { LOCALHOST } from "@/lib/variebles"
import { FormEvent, useState } from "react"

const Page = () => {

    const [success, setSuccess] = useState(false)
    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const token = localStorage.getItem('access')
        const formData = new FormData(e.currentTarget)
        const res = await fetch(LOCALHOST + 'api/cafes/add/', {
            method: 'POST',
            headers :{
                Authorization: `Bearer ${token}`
            },
            body: formData,
        })
        if(res.ok){
            setSuccess(true)
        }
    }

    return (
        <>
        <SuccessModal title="موفق" description="درخواست شما با موفقیت ثبت شد" state={success} redirectPath="/" />
            <div className="w-full">
                <div className="p-4 shadow text-center">
                    <h1 className="text-lg text-brown-dark">ایجاد پروفایل کافه</h1>
                </div>
            </div>
            <div className="container mt-8">
                <div className="w-full flex justify-center">
                    <div className="w-full md:w-2/3 p-4">
                        <div className="w-full rounded-3xl shadow p-4">
                            <form onSubmit={handleSubmit}>

                                <div className="w-full">
                                    <label htmlFor="name">نام کافه:</label>
                                    <br />
                                    <input type="text" placeholder="کافه زیبا" name="name" className="form-control w-full bg-yellow-very-melo" />
                                </div>

                                <div className="w-full mt-3">
                                    <label htmlFor="description">توضیحات کافه:</label>
                                    <br />
                                    <textarea placeholder="یک کافه با محیط آرام و موسیقی بی کلام در مرکز شهر" name="about" className="form-control bg-yellow-very-melo w-full" ></textarea>
                                </div>

                                <div className="w-full mt-3">
                                    <label htmlFor="address">آدرس:</label>
                                    <br />
                                    <textarea placeholder="تهران - ولی عصر - خیابان جمعوری - کوچه ۴" name="address" className="form-control bg-yellow-very-melo w-full" ></textarea>
                                </div>

                                <div className="w-full mt-3">
                                    <label htmlFor="picture">تصویر:</label>
                                    <br />
                                    <input type="file" placeholder="تهران - ولی عصر - خیابان جمعوری - کوچه ۴" name="picture" className="form-control bg-yellow-very-melo w-full" />
                                </div>

                                <SelectWithLiveFetch liveFetchAddress="hook/get-cities/" defaultValue='انتخاب شهر' />

                                <div className="w-full mt-4">
                                    <button type="submit" className="btn btn-green w-full p-4">ثبت اطلاعات</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page