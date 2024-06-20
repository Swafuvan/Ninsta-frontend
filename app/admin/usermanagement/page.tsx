"use client"
import React from 'react';
import AdminUserManagement from '@/pages/admin/AdminUserManagement';

const columns = ['Name', 'Email', 'Role'];
const initialData = [
    { Name: 'John Doe', Email: 'john@example.com', Role: 'Admin', isBlocked: false },
    { Name: 'Jane Smith', Email: 'jane@example.com', Role: 'User', isBlocked: true },
    // Add more data as needed
];

function UserManagement() {

    const [data, setData] = React.useState(initialData);

    const handleBlockToggle = (index:any) => {
        const newData = [...data];
        newData[index].isBlocked = !newData[index].isBlocked;
        setData(newData);
    };

    return (
        <AdminUserManagement columns={columns} data={data} />
    );

}   

export default UserManagement;
