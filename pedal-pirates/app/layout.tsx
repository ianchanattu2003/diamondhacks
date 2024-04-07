import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Darker_Grotesque } from 'next/font/google'
import { DM_Sans } from 'next/font/google'
import './globals.css'

const font = DM_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pedal Pirates',
  description: 'who is stealing YOUR bike??'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={font.className}>{children}</body>
    </html>
  )
}
