"use client"

import { MultiStepsForm } from "@/layouts/MultiStepsForm/MultiStepsForm"

import { LOCALHOST } from "@/lib/variebles"


type Steps = {
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

const steps: Steps = [
    {
        idx: 1,
        label: "نام کافه",
        input: {
            type: "text",
            placeholder: "نام کافه خود را وارد کنید",
            name: "name",
            id: "name",
            classNames: null,
        },
        helpText: "در مرحله اول شما لازم است نام کافه خود را وارد کنید. این کار قابلیت جستجو برای کاربران محلی و شناسایی شما را راحت میکنید",
        isLastStep: false,
        nextButtonText: "ادامه"
    },
    {
        idx: 2,
        label: "توضیحات",
        input: {
            type: "textarea",
            placeholder: "توضیحات کافه را وارد کنید",
            name: "about",
            id: "about",
            classNames: null,
        },
        helpText: "راجب کافه خود و محیط آن توضیحاتی دهید که منجر به جذب کاربر شود",
        isLastStep: false,
        nextButtonText: "ادامه"
    },
    {
        idx: 3,
        label: "آدرس کافه",
        input: {
            type: "textarea",
            placeholder: "آدرس کافه را وارد کنید",
            name: "address",
            id: "description",
            classNames: null,
        },
        helpText: "راجب کافه خود و محیط آن توضیحاتی دهید که منجر به جذب کاربر شود",
        isLastStep: false,
        nextButtonText: "ادامه"
    },
    {
        idx: 4,
        label: "تصویر پروفایل کافه",
        input: {
            type: "file",
            placeholder: "تصویرپروفایل کافه را وارد کنید",
            name: "pictures",
            id: "pictures",
            classNames: null,
            multiple: true,
        },
        helpText: "تصویر پروفایل کمک میکند که کافه شما بهتر دیده شود",
        isLastStep: true,
        nextButtonText: ""
    },
]

const Page = () => <MultiStepsForm props={{
    pageTitle: "ثبت کافه",
    steps: steps,
    errorMessage: "مشکلی در ثبت کافه شما به وجود آمده است",
    successMessage: "کافه شما با موفقیت ثبت شد",
    fetchUrl: `${LOCALHOST}api/cafes/add/`,
    redirectPath: "",
}} />

export default Page