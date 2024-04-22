import { Metadata } from 'next'
import Image from 'next/image'
import marketImage from  '../../../assets/img/market.png' 


export const metadata: Metadata = {
    title: 'قهوهخونه - لیست کافه ها'
}


const cafe = () => {
    return (

        <>
        
            <div className="container">


                <div className="w-full relative border-b">

                    <div className="title-wrapper text-center p-5 ">
                        <h1 className=' text-lg'>کافه گردی</h1>
                    </div>
                
                </div>


                <div className="w-full p-4 relative">
                    <div className="w-full rounded-lg bg-[#3297D9] text-white">
                        <div className="p-4">
                            <h1 className='text-md'>انتخاب شهر</h1>
                            <p>ابتدا شهر محل سکونتت رو انتخاب کن بعد بهترین کافه ها و رو پیدا کن.</p>
                        </div>
                        <form method='get' className='p-4'>
                            <select className='form-control w-full text-black'> 
                                <option value='default'>شهر خود را انتخاب کنید</option>
                                <option value="tehran">تهران</option>
                            </select>
                            <h1 className="text-md text-white my-4" >فیلتر ویژگی ها</h1>
                            <div className='my-4'>
                                <input type="checkbox" name="smoking" id="smokingCheck" className='me-2' />
                                <label htmlFor="smoking">امکان سیگار کشیدن</label>
                            </div>
                            <div className='my-4'>
                                <input type="checkbox" name="quitePlace" id="quitePlaceCheck" className='me-2' />
                                <label htmlFor="quitePlace">محیط آرام</label>
                            </div>
                            <div className='my-4'>
                                <input type="checkbox" name="scum" id="scumCheck" className='me-2' />
                                <label htmlFor="scum">امکان سیگار کشیدن</label>
                            </div>
                        </form>
                    </div>
                    <div className="w-full rounded-lg bg-white text-brown-dark shadow-md mt-6">
                        <div className="p-4">
                            <h1 className='text-lg'>کافه زیبا</h1>
                            <p>کافه زیبا مناسب افراد</p>
                        </div>
                    </div>
                </div>
            </div>
        
        </>
    )
}

export default cafe