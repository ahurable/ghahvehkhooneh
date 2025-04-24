"use client"
import { NormalLayout } from "@/layouts/layout/Layout";
import { AuthProvider } from "@/lib/Context/AuthContext";
import { NotificationProvider } from "@/lib/Context/NotificationContext";
import StoreProvider from "@/lib/StoreProvider";
import '../globals.css'


export default function RootLayout ({children}:{children: React.ReactNode}) {
    return (
    <StoreProvider>
        <AuthProvider>
            <NotificationProvider>
                <NormalLayout>
                    {children}
                </NormalLayout>
            </NotificationProvider>
        </AuthProvider>
    </StoreProvider>
    )
}