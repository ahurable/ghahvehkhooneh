"usec client"

import Footer from "@/components/Footer"
import { useAuth } from "@/lib/Context/AuthContext"
import { jwtDecode, JwtPayload } from "jwt-decode"
import localFont from "next/font/local"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

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


const MainLayout = ({children}:{children:React.ReactNode}) => {
    const { accessToken, refreshAccessToken, logout, user } = useAuth()
    const router = useRouter()
      useEffect(() => {
            
              if (accessToken && localStorage.getItem('refresh')) {
      
                      if (accessToken !== undefined && user != null){
                        console.log(user)
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
                              router.push('/login')
                          }
                      } else {
                        setTimeout(() => logout(), 1000)
                        router.push('/login')
                      }
      
                  }
              },
              [accessToken, refreshAccessToken, logout]
          )

        return (
                    <html lang="fa" dir="rtl">
                        <body className={yekanbakh.className}>
                            <div className="w-full relative bg-[url(/cafe-pattern.jpg)] z-[100]">
                                <div className="absolute w-full h-full z-10 bg-brown-normal bg-opacity-60 top-0 right-0"></div>

                                <div className="lg:container bg-yellow-very-melo relative z-[30] shadow-lg">
                                    {children}
                                </div>
                            </div>

                            <Footer />
                        </body>
                    </html>
        )
}

const NormalLayout = ({children}: {children:React.ReactNode}) => {

    const { accessToken, refreshAccessToken, logout } = useAuth()
    
      useEffect(() => {
      
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
              },
              [accessToken, refreshAccessToken, logout]
          )

          
    return (
        <html lang="fa" dir="rtl">
            <body className={yekanbakh.className}>
                {children}
            </body>
        </html> 
    )
}

export { MainLayout, NormalLayout }