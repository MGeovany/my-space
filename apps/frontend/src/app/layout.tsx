import { Inter } from 'next/font/google'
import './globals.css'
import '../styles/custom-styles.css'
import '../styles/dracula.css'
import '../styles/prose-styles.css'
import { Providers } from '@/components/providers'
import { SiteLayout } from '@/components/layouts'
import { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
  pageProps,
}: Readonly<{
  children: ReactNode
  pageProps: any
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers pageProps={pageProps}>
          <SiteLayout>{children}</SiteLayout>
        </Providers>
      </body>
    </html>
  )
}
