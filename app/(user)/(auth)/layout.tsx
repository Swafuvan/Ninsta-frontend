import Image from 'next/image';
import React from 'react'
import LoginImg from '../../../public/side-img.svg'
import { GoogleOAuthProvider } from '@react-oauth/google';

import { config } from 'dotenv';
config()


function UserAuthLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <section className="flex flex-1 items-center flex-col py-10 w-full xl:w-1/2">

        <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID ?? ""}>
        {children}
        </GoogleOAuthProvider>
      </section>
      <div className="hidden xl:block xl:w-1/2">
        <Image alt="image" src={LoginImg} className="h-screen w-full object-cover transition-all duration-300 rounded-lg cursor-pointer filter grayscale hover:grayscale-0" />
      </div>
    </div>
  )
}

export default UserAuthLayout
