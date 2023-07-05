import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Medicine Application',
  description: 'Medicine Application - portfolio project by Volodymyr Nerovnia',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
