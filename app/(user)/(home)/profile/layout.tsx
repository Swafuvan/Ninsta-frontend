import React from 'react'
import './style.css'

function profilepageLayout({children}:Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='sm:ml-16 md:ml-44'>
      {children}
    </div>
  )
}



export default profilepageLayout
