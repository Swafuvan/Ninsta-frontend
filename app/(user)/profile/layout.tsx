import React from 'react'
import './style.css'

function profilepageLayout({children}:Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div >
      {children}
    </div>
  )
}



export default profilepageLayout
