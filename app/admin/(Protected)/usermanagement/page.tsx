'use client';
import React, { useState, useEffect } from 'react';
import AdminUserManagement from '@/pages/admin/AdminUserManagement'; 
import { getUsers } from '@/lib/functions/admin/route'; 
import { User } from '@/type/users';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const columns = ['Name', 'Email', 'Gender'];
const usersPerPage = 8; 

function UserManagement() {
    const [data, setData] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const admin = useSelector((state:RootState) => state.auth);

    useEffect(() => {
        
        async function fetchUserData() {
            try {
                const response = await getUsers();
                console.log(response)
                setData(response?.data?.userData);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        }

        fetchUserData();
    }, []);

    // Calculate the total pages and slice data based on the current page
    const totalPages = Math.ceil(data.length / usersPerPage);

    // Function to handle page change
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <AdminUserManagement
                columns={columns}
                initialData={data}  // Changed to initialData
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            />
        </div>
    );
}

export default UserManagement;
