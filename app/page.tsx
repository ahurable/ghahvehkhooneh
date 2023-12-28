import SliderWrapper from "@/components/Slider"
import { Metadata } from "next"
import { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import { StaticImageData } from "next/image";

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

async function getData() {
  const res = await fetch('http://127.0.0.1:8000/api/sliders?format=json')
  const sliders = await res.json()

  return sliders

}

export default async function Page() {
  const sliders = await getData()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <SliderWrapper/>
    </main>
  )
}