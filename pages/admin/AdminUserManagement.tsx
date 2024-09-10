'use client';
import React, { useState, useEffect } from 'react';
import { User } from '@/type/users';
import { UserBlocked } from '@/lib/functions/admin/route';
import AlertDialogSlide from './ConfirmationModal';

interface AdminUserManagementProps {
    columns: string[];
    initialData: User[];  
    currentPage: number;
    totalPages: number;
    handlePageChange: (pageNumber: number) => void;
}

function AdminUserManagement({ columns, initialData, currentPage, totalPages, handlePageChange }: AdminUserManagementProps) {
    const [data, setData] = useState<User[]>(initialData);
    const [handleOpen,setHandleOpen] = useState(false);
    const [singleUser,setSingleUser] = useState<User>();

    function handleConfirmClose(){
        setHandleOpen(false)
    }

    useEffect(() => {
        setData(initialData);  
    }, [initialData]);

    async function onBlockToggle(email: string, isBlocked: boolean) {
        // Update local state
        const updatedData = data?.map(item => {
            if (item.email === email) {
                return { ...item, isBlocked: !isBlocked };
            }
            return item;
        });
        setData(updatedData);

    }

    // Calculate start and end index for pagination
    const startIndex = (currentPage - 1) * 8;
    const endIndex = startIndex + 8;

    // Slice data for the current page
    const paginatedData = data?.slice(startIndex, endIndex);

    return (
        <div className='pr-4'>
            <h1 className='text-4xl font-bold flex justify-center mb-10'>User Management</h1>

            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg mb-10">
                <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <tr>
                        <th className='py-3 px-6 text-left'>SlNo</th>
                        {columns.length>0 && columns?.map((column, index) => (
                            <th key={index} className="py-3 text-left">
                                {column}
                            </th>
                        ))}
                        <th className="py-3 px-6 text-left">Status</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {handleOpen && <AlertDialogSlide onBlockToggle={onBlockToggle} handleConfirmClose={handleConfirmClose} singleUser={singleUser} />}
                    {paginatedData?.length > 0 ? (
                        paginatedData?.map((item:User, index:number) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className='py-3 px-6 text-left'>{startIndex + index + 1}</td>
                                <td className='py-3 px-6 text-left'>{item.username}</td>
                                <td className="py-3 px-6 text-left">{item.email}</td>
                                <td className="py-3 px-6 text-left">{item.Gender}</td>
                                <td className="py-3 px-6 text-left">
                                    <button
                                        className='bg-slate-300 w-24 h-10 rounded-md font-bold'
                                        onClick={() => {setHandleOpen(true),setSingleUser(item)}}
                                    >
                                        {item?.isBlocked === true ? "Unblock" : "Block"}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns?.length + 2} className="text-center py-3">
                                No users found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {totalPages > 1 && (
                <div className="pagination flex justify-center mb-4">
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`pagination-button mx-1 px-4 py-2 border rounded ${index + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AdminUserManagement;
