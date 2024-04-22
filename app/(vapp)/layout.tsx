"use client"
import React, { useEffect } from "react";
import Footer from '../../components/Footer'
import localFont from "next/font/local";
import '../globals.css'
import StoreProvider from "@/lib/StoreProvider";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import { LOCALHOST } from "@/lib/variebles";
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


const refreshToken = async (refresh:string) => {
    // console.log(JSON.stringify({refresh: refresh}))
    const res = await fetch(LOCALHOST + 'api/auth/refresh/', {
        method:'POST',
        body: JSON.stringify({refresh: refresh}),
        headers: {
            "Content-Type": "application/json",
        }
    })
    const data = await res.json()

    if ('access' in data){
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        localStorage.setItem('access', data.access)
        localStorage.setItem('refresh', data.refresh)
    }
}

type MyProps = {
    children: React.ReactNode
}

export default class RootLayout extends React.Component<MyProps> {


    componentDidMount(): void {
        

        if(localStorage.getItem('access')){
            let token: string | null = localStorage.getItem('access')
            let refresh = localStorage.getItem('refresh')
            if (token !== null && refresh !== null) {
                let exp = jwtDecode(token).exp
                if (exp !== undefined){
                    if(exp < Date.now()/10){
                        refreshToken(refresh)
                    }
                } else {
                    redirect('/logout')
                }
            } else redirect('/logout')
        }

    }

    render(): React.ReactNode {
        return (
            <StoreProvider>
            <html lang="fa" dir="rtl">
                <body className={yekanbakh.className}>
                    {this.props.children}
                    <Footer />
                </body>
            </html>
            </StoreProvider>
        )
    }
    
}