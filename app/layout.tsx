import type React from "react"
import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import { CartProvider } from "@/contexts/cart-context"
import { LocationProvider } from "@/contexts/location-context"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "Delightful - Food Delivery",
  description: "Delicious food delivered to your doorstep",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} antialiased`}>
      <body className="font-sans">
        <LocationProvider>
          <CartProvider>{children}</CartProvider>
        </LocationProvider>
      </body>
    </html>
  )
}
