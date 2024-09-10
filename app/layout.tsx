"use client";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ClientProvider from "@/components/Provider/clientProvider";
import { ToastContainer } from 'react-toastify';

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({ children, }: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" >
      <title></title>
      <body className={cn(
        fontSans.variable
      )}>
        <div >
          <main className="flex-grow">
            <Toaster position="top-center" />
            <ToastContainer />
            <ClientProvider>
              {children}
            </ClientProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
