"use client";

import React, { useEffect, useState } from 'react';
import AdminUserManagement from '@/pages/admin/AdminUserManagement';
import { getUsers } from '@/lib/functions/admin/route';
import { User } from '@/type/users';

const columns = ['Name', 'Email', 'Gender'];

function UserManagement() {
    const [data, setData] = useState<User[]>([]);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const users: any = await getUsers();
                await setData(users.data.userData);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        }

        fetchUserData();
    }, []);

    

    return (
        <AdminUserManagement columns={columns} data={data} setData={setData}  />
    );
}

export default UserManagement;

