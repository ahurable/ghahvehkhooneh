"use client"
import localFont from 'next/font/local'
import Header from '@/components/Header'
import '../globals.css'
import StoreProvider from '@/lib/StoreProvider'
import { useEffect } from 'react'
import { AuthProvider, useAuth } from '@/lib/Context/AuthContext'
import { jwtDecode, JwtPayload } from 'jwt-decode'
// import { ManagedUserContext } from '@/lib/context/user'
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
  children,
}: {
  children: React.ReactNode
}) {

  useEffect(() => {
          const { accessToken, refreshAccessToken, logout } = useAuth()
  
          if (accessToken && localStorage.getItem('refresh')) {
  
                  if (accessToken !== undefined){
                      let token: any = accessToken
                      let refresh = localStorage.getItem('refresh')
                      if (token && token != null) {
                          console.log(jwtDecode(token).exp)
                          console.log(Date.now() / 1000)
                          if (jwtDecode<JwtPayload & {exp:any}>(token).exp < (Date.now() / 1000)) {
                              typeof(refresh) == 'string' && refresh.length>0 && refreshAccessToken || location.replace('/logout')
                          } 
                      } else {
                          setTimeout(() => logout(), 1000)
                          location.replace('/login')
                      }
                  } else {
                    setTimeout(() => logout(), 1000)
                    location.replace('/login')
                  }
  
              }
          }
      )
  return (
    <StoreProvider>
      <AuthProvider>
      <html lang="fa" dir="rtl">
        <body className={yekanbakh.className}>
            {children}
        </body>
      </html>
      </AuthProvider>
    </StoreProvider>
  )
}
