

import SliderWrapper from "@/components/Slider"
import { Metadata } from "next"
import { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import { StaticImageData } from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faVideo } from "@fortawesome/free-solid-svg-icons";
import { NextPageContext } from "next";
import Features from "@/components/Features";
import { useEffect } from "react";

export const metadata: Metadata = {
  title: 'قهوهخونه - آموزش و خرید برای کافه ها'
}

type SliderItemPropsInterface = {
  id: number,
  top_title: string,
  title: string,
  helper: string,
  description: string,
  youtube: boolean,
  aparat: boolean,
  readmore: boolean,
  image: string | StaticImageData,
} 

const BarLearn = (props: {
  title: string,
  image: string | StaticImageData
}[]) => {
  return (
    <main>
      <div className="w-full bg-brown-dark relative">
        <div className="container mx-auto py-12 grid grid-cols-12 items-center">
          <div className="md:col-span-6 lg:col-span-7 col-span-12 p-4 md:p-0">
            <h1 className="text-[45px] font-black text-white">بارلرن</h1>
            <p className="text-justify leading-10 text-lg text-white">در بارلرن یاد بگیر که چطوری خودت توی خونه با متریالی که بهت میگیم خوشمزه ترین دسر های گرم و سرد و غذا ها رو سرو کنی.</p>
          </div>
          <div className="md:col-span-6 lg:col-span-5 col-span-12 p-4 md:p-0 flex justify-end">
            <div className="w-max">
              <a href="" className="barlearn-button">
                <span className="block">تولید کننده محتوا شو</span>
                <span className="block">
                  <FontAwesomeIcon icon={faVideo}/>
                </span>
              </a>
              <a href="" className="barlearn-button">
                <span className="block">رفتن به بارلرن</span>
                <span className="block">
                  <FontAwesomeIcon icon={faArrowLeft} />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}



function Page({posts}) {
  
  return (
    <main className="min-h-screen flex-col items-center justify-between md:p-0">
      <div className="p-4 md:p-none">
        <SliderWrapper/>
      </div>
      <BarLearn />
      <Features />
    </main>
  )
}



export default Page