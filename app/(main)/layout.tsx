"use client"
import React, { useEffect } from "react";
import Footer from '../../components/Footer'
import localFont from "next/font/local";
import '../globals.css'
import StoreProvider from "@/lib/StoreProvider";
import { jwtDecode, JwtPayload } from "jwt-decode";
// import { refreshToken } from "@/lib/utils";
import { AuthProvider } from "@/lib/Context/AuthContext";
// font declaration

const yekanbakh = localFont({
    src: [
        {
        path: '../../assets/font/YekanBakhFaNum-Thin.woff',
        weight: '300',
        style: 'normal'
        },
        {
        path: '../../assets/font/YekanBakhFaNum-Light.woff',
        weight: '400',
        style: 'normal'
        },
        {
        path: '../../assets/font/YekanBakhFaNum-Regular.woff',
        weight: '500',
        style: 'normal'
        },
        {
        path: '../../assets/font/YekanBakhFaNum-SemiBold.woff',
        weight: '600',
        style: 'normal'
        },
        {
        path: '../../assets/font/YekanBakhFaNum-Bold.woff',
        weight: '700',
        style: 'normal'
        },
        {
        path: '../../assets/font/YekanBakhFaNum-ExtraBold.woff',
        weight: '800',
        style: 'normal'
        },
        {
        path: '../../assets/font/YekanBakhFaNum-Black.woff',
        weight: '900',
        style: 'normal'
        },
        {
        path: '../../assets/font/YekanBakhFaNum-ExtraBlack.woff',
        weight: '950',
        style: 'normal'
        }
    ]
    })



// layout declaration




type MyProps = {
    children: React.ReactNode
}

export default class RootLayout extends React.Component<MyProps> {


    componentDidMount(): void {
        

        if (localStorage.getItem('access') && localStorage.getItem('refresh')) {

            if (localStorage.getItem('access') !== undefined){
                // let token: any = localStorage.getItem('access')
                // let refresh = localStorage.getItem('refresh')
                // if (token && token != null) {
                //     console.log(jwtDecode(token).exp)
                //     console.log(Date.now() / 1000)
                //     if (jwtDecode<JwtPayload & {exp:any}>(token).exp < (Date.now() / 1000)) {
                //         typeof(refresh) == 'string' && refresh.length>0 && refreshToken(refresh) || location.replace('/logout')
                //     } 
                // }
            } else {
                location.replace('/logout')
            }

        }

    }

    render(): React.ReactNode {
        return (
            <StoreProvider>
                <AuthProvider>
                <html lang="fa" dir="rtl">
                    <body className={yekanbakh.className}>
                        <div className="w-full relative bg-[url(/cafe-pattern.jpg)] z-[100]">
                            <div className="absolute w-full h-full z-10 bg-brown-normal bg-opacity-60 top-0 right-0"></div>

                            <div className="lg:container bg-yellow-very-melo relative z-[30] shadow-lg">
                                {this.props.children}
                            </div>
                        </div>

                        <Footer />
                    </body>
                </html>
                </AuthProvider>
            </StoreProvider>
        )
    }
    
}