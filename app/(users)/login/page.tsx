

const Login = () => {
    return (
        <main className="w-full  relative bg-purple-600">
            <div className="md:w-[720px] lg:w-[1000px] w-11/12 mx-auto relative h-full">
                <h1 className="text-center text-[34px] pt-10 text-white font-bold">قهوه خونه</h1>
                <h1 className="text-center text-[50px] pb-10 font-black text-white">ایجاد حساب</h1>
                <div className="form-wrapper">
                    <div className="flex justify-centent-center">
                        <form action="">
                            <input type="text" id="name" name="name" className="form-control mx-2 md:w-[420px] w-full mt-20" placeholder="نام خود  را بنویسید" />
                            <input type="text" id="name" name="name" className="form-control mx-2 md:w-[420px] w-full mt-4" placeholder="نام خود  را بنویسید" />
                            <input type="text" id="name" name="name" className="form-control mx-2 md:w-[420px] w-full mt-4" placeholder="نام خود  را بنویسید" />
                            <input type="text" id="name" name="name" className="form-control mx-2 md:w-[420px] w-full mt-4" placeholder="نام خود  را بنویسید" />
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login