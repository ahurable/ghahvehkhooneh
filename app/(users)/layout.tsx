import React from "react";
import localFont from "next/font/local";
import '../globals.css'
import StoreProvider from "@/lib/StoreProvider";



  

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


export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <StoreProvider>
            <html lang="fa" dir="rtl">
                <body className={yekanbakh.className}>
                    {children}
                </body>
            </html>
        </StoreProvider>
    )
}