import React from 'react'
import AdminSidebar from '@/pages/admin/adminSidebar';
import AdminNavbar from '@/pages/admin/AdminNavbar';

function AdminLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='grid grid-flow-col'>
            <AdminSidebar />
            <div className="admin-layout__content w-auto ml-0">
                <AdminNavbar/>
                {children}
            </div>
        </div>
    )
}

export default AdminLayout
