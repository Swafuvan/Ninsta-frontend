import React, { useEffect, useState } from 'react';
import { User } from '@/type/users';
import { EditIcon } from 'lucide-react';
import { SingleUserDetails, UserBlocked, getUsers } from '@/lib/functions/admin/route';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import EditUserDetails from './EditUserDetails';
import { Button } from '@mui/material';
import UserModal from './EditUserDetails';

interface AdminUserManagementProps {
    columns: string[];
    data: User[];
    setData:any
}

function AdminUserManagement({ columns, data,setData }: AdminUserManagementProps) {

    
    // const [isEdit, setIsEdit] = useState(false);

    async function onBlockToggle({email,isBlock}:any) {
        const newUser = [...data].map(item => {
            if(item.email === email) {
                console.log({...item, isBlocked:!item.isBlocked });
                return {...item, isBlocked:!item.isBlocked };
            }
            return item;
        })
        console.log(newUser,"thia ia thw user")
        setData(newUser)
        const UserBlock = await UserBlocked(email,isBlock)
    };

    // function CloseModal(){
    //     setIsEdit(false);
    // }

    // async function onEditUser(Userdata: any) {
    //     alert('vannu')
    //     // await setIsEdit(true);
    //     console.log(Userdata)
    //     const UserDataSending = await SingleUserDetails(Userdata)
    //     await setData(Userdata)
    //     if (UserDataSending) {
    //         console.log(UserDataSending);
    //     }
    
    // }
    return (
        <div className='pr-4'>
            {/* {isEdit === false ? ( */}
                <>
                    <h1 className='text-4xl font-bold flex justify-center mb-10'>User Management</h1>

                    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal ">
                            <tr>
                                <th className='py-3 px-6 text-left'>SlNo</th>
                                {columns.map((column, index) => (
                                    <th key={index} className="py-3 text-left">
                                        {column}
                                    </th>
                                ))}
                                <th className="py-3 px-6 text-left">Status</th>
                                {/* <th className="py-3 px-6 text-left">Edit</th> */}
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {data.length > 0 && data.map((item, index) => (
                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className='py-3 px-6 text-left'>
                                        {index + 1}
                                    </td>
                                    <td className='py-3 px-6 text-left'>
                                        {item?.username}
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        {item?.email}
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        {item?.Gender}
                                    </td>

                                    <td className="py-3 px-6 text-left">
                                        <div className="form-check">
                                            <button
                                                className='bg-slate-300 w-24 h-10 rounded-md font-bold'
                                                onClick={() => onBlockToggle({ email: item?.email, isBlock: item?.isBlocked })}
                                            >
                                                {item?.isBlocked === true ? "Unblock" : "Block"}
                                            </button>
                                        </div>
                                    </td>

                                    {/* <td className="py-3 px-6 text-left">
                                        <div className="form-check">
                                            <EditIcon
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => onEditUser(item)} />
                                        </div>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            {/* ) : (
               <UserModal user={user} isOpen={isEdit} onClose={CloseModal}/>
            )} */}
        </div>
    );
}

export default AdminUserManagement;
