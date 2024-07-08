'use client'
import React, { useEffect, useState } from 'react'
import AdminSidebar from '@/pages/admin/adminSidebar';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Cookies from 'js-cookie'
import LoadingPage from '@/components/ui/loading';

function AdminLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(()=>{
        const userData =  Cookies.get('adminToken')
        if(userData){ 
            setLoading(true)
         }
    },[loading])

    if(!loading){
        return (<LoadingPage/>)
    }

    return (

        <div className='grid grid-flow-col '>
            <AdminSidebar />
            <div >
                {children}
            </div>
        </div>
    )
}

export default AdminLayout
