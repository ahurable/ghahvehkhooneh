"use client"
import React, { useEffect, useState } from "react";
import Footer from '../../components/Footer'
import localFont from "next/font/local";
import '../globals.css'
import StoreProvider from "@/lib/StoreProvider";
import { jwtDecode, JwtPayload } from "jwt-decode";
// import { refreshToken } from "@/lib/utils";
import { AuthProvider, useAuth } from "@/lib/Context/AuthContext";
import { NotificationProvider } from "@/lib/Context/NotificationContext";
import { MainLayout } from "@/layouts/layout";
import { usePathname } from "next/navigation";
// font declaration




// layout declaration


export default function RootLayout({ children }: { children: React.ReactNode }) {
   
    return (

        <StoreProvider>
            <AuthProvider>
                <NotificationProvider>
                    <MainLayout>{children}</MainLayout>
                </NotificationProvider>
            </AuthProvider>
        </StoreProvider>
    )
    
}