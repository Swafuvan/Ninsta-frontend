import TemporaryDrawer from '@/components/ui/sidebar';
import React from 'react'

function UserHomeLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div >
      <TemporaryDrawer />
      <div className='ml-16'>
        {children}
      </div>
    </div>
  )
}

export default UserHomeLayout
