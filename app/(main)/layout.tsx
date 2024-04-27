
import localFont from 'next/font/local'
import Header from '@/components/Header'
import '../globals.css'
import StoreProvider from '@/lib/StoreProvider'
import { Metadata } from 'next'
// font declaration

export const metadata: Metadata = {
  manifest: '/manifest.json'
}

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
  return (
    <StoreProvider>
    <html lang="fa" dir="rtl">
      <body className={yekanbakh.className}>
        <Header/>
        {children}
        
      </body>
    </html>
    </StoreProvider>
  )
}
