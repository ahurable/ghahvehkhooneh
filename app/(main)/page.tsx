

import SliderWrapper from "@/components/Slider"
import { Metadata } from "next"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBasketShopping, faCoffee, faGraduationCap, faPeopleGroup, faVideo } from "@fortawesome/free-solid-svg-icons";
import Features from "@/components/Features";
import { faServicestack } from "@fortawesome/free-brands-svg-icons";

export const metadata: Metadata = {
  title: 'قهوهخونه - آموزش و خرید برای کافه ها'
}

const BarLearn = () => {
  return (
    <main className="mt-16 lg:mt-0">
      <div className="w-full bg-brown-dark relative">
        <div className="container mx-auto py-12 grid grid-cols-12 items-center">
          <div className="md:col-span-6 lg:col-span-7 col-span-12 p-4 md:p-0">
            <h1 className="text-[45px] font-black text-white">بارلرن</h1>
            <p className="text-justify leading-10 text-lg text-white">در بارلرن یاد بگیر که چطوری خودت توی خونه با متریالی که بهت میگیم خوشمزه ترین دسر های گرم و سرد و غذا ها رو سرو کنی.</p>
          </div>
          <div className="md:col-span-6 lg:col-span-5 col-span-12 p-4 md:p-0 flex md:justify-end">
            <div className="md:w-max w-full">
              <a href="" className="barlearn-button w-full">
                <span className="block">تولید کننده محتوا شو</span>
                <span className="block">
                  <FontAwesomeIcon icon={faVideo}/>
                </span>
              </a>
              <a href="" className="barlearn-button w-full">
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

const WhyUs = () => {
  return (
    <main className="container mt-20">
      <div className="text-center w-full font-black mb-10">
        <h1 className="text-3xl text-brown-dark">خدمات قهوهخونه</h1>
      </div>
      <div className="w-full grid grid-cols-12">
        <div className="md:col-span-3 group col-span-12 p-6">
          <div className="w-full flex md:justify-center items-center md:flex-col md:items-start">
            <div className="relative mx-auto md:w-20 md:h-20
            flex justify-center rounded-full 
            border-2 transition-all border-brown-normal 
            group-hover:bg-brown-normal duration-700
            p-[1.3rem]">
              <span className="md:text-3xl block relative my-auto transition-all
               text-brown-normal group-hover:text-white
                group-hover:rotate-[360deg] duration-700"><FontAwesomeIcon icon={faBasketShopping} /></span>
            </div>
            <div className="md:text-center md:mt-4 ps-3 md:p-0">
              <h1 className="font-bold text-2xl">
                فروشگاه
              </h1>
              <p className="mt-3 leading-[2rem]">
                متریال های کافه رو از ما بخر، در اصفهان و تحویل فوری
              </p>
            </div>
          </div>
        </div>

        <div className="md:col-span-3 group col-span-12 p-6">
          <div className="w-full flex md:justify-center items-center md:flex-col md:items-start">
            <div className="relative mx-auto md:w-20 md:h-20
            flex justify-center rounded-full 
            border-2 transition-all border-brown-normal 
            group-hover:bg-brown-normal duration-700
            p-[1.3rem]">
              <span className="md:text-3xl block relative my-auto transition-all
               text-brown-normal group-hover:text-white
                group-hover:rotate-[360deg] duration-700"><FontAwesomeIcon icon={faCoffee} /></span>
            </div>
            <div className="md:text-center md:mt-4 ps-3 md:p-0">
              <h1 className="font-bold text-2xl">
                کافیتو
              </h1>
              <p className="mt-3 leading-[2rem]">
                کافیتو برای کافه گردها ، کافه های خفن شهرتو ببین و بشناس، حتی میتونی انتقاد ها و امتیاز های کاربران رو ببینی
              </p>
            </div>
          </div>
        </div>

        <div className="md:col-span-3 group col-span-12 p-6">
          <div className="w-full flex md:justify-center items-center md:flex-col md:items-start">
            <div className="relative mx-auto md:w-20 md:h-20
            flex justify-center rounded-full 
            border-2 transition-all border-brown-normal 
            group-hover:bg-brown-normal duration-700
            p-[1.3rem]">
              <span className="md:text-3xl block relative my-auto transition-all
               text-brown-normal group-hover:text-white
                group-hover:rotate-[360deg] duration-700"><FontAwesomeIcon icon={faGraduationCap} /></span>
            </div>
            <div className="md:text-center md:mt-4 ps-3 md:p-0">
              <h1 className="font-bold text-2xl">
                بارلرن
              </h1>
              <p className="mt-3 leading-[2rem]">
                در بارلرن آموزش های مختلفی وجود داره که تورو تبدیل به یه باریستا تو خونه میکنه :)
              </p>
            </div>
          </div>
        </div>

        <div className="md:col-span-3 group col-span-12 p-6">
          <div className="w-full flex md:justify-center items-center md:flex-col md:items-start">
            <div className="relative mx-auto md:w-20 md:h-20
            flex justify-center rounded-full 
            border-2 transition-all border-brown-normal 
            group-hover:bg-brown-normal duration-700
             p-[1.3rem]">
              <span className="md:text-3xl block relative my-auto transition-all
               text-brown-normal group-hover:text-white
                group-hover:rotate-[360deg] duration-700"><FontAwesomeIcon icon={faPeopleGroup} /></span>
            </div>
            <div className="md:text-center md:mt-4 ps-3 md:p-0">
              <h1 className="font-bold text-2xl">
                شبکه اجتماعی
              </h1>
              <p className="mt-3 leading-[2rem]">
                تنهایی؟ یه نفر رو به قهوه دعوت کن! ما این امکان رو بهتون میدیم :)
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}


function Page() {
  
  return (
    <main className="min-h-screen flex-col items-center justify-between md:p-0">
      <div className="p-4 md:p-none">
        <SliderWrapper/>
      </div>
      <BarLearn />
      <Features />
      <WhyUs />
    </main>
  )
}



export default Page