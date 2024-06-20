import React from 'react'

function AdminAuthLayout({children}:Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-96'>
      {children}
    </div>
  )
}

export default AdminAuthLayout
