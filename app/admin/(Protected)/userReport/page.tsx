'use client'
import { UserReports } from '@/lib/functions/admin/route';
import ReportModalPage from '@/pages/admin/ReportModal';
import ReportUserModalPage from '@/pages/admin/ReportUserModal';
import { RootState } from '@/redux/store';
import { userReports } from '@/type/users';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function UserReportPage() {

    const [openAction,setOpenAction] = useState(-1);
    const [userReport,setUserReport] = useState<userReports[]>([]);
    const user = useSelector((state:RootState) => state.auth);

    useEffect(()=>{
        UserReports().then((res) => {
            setUserReport(res.userReports);
            console.log(res.userReports)
        })
    },[]);

    function closeModal(){
        setOpenAction(-1);
    }

    return (
        <div className='mr-3'>
            <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
                <div className="w-full mb-1">
                    <div className="mb-4">
                        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">All Users Reports</h1>
                    </div>
                    <div className="md:flex">
                        <div className="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-700">
                            <form className="lg:pr-3" action="#" >
                                <label htmlFor="users-search" className="sr-only">Search</label>
                                <div className="relative mt-1 lg:w-64 xl:w-96">
                                    <input type="text" name="search" id="users-search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search for users" />
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden shadow">
                            <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                                <thead className="bg-gray-100 dark:bg-gray-700">
                                    <tr>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                            Name
                                        </th>

                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                            reason
                                        </th>

                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                            Status
                                        </th>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                    {userReport && userReport.length === 0 &&
                                        <div className="flex items-center justify-center w-full h-full">
                                            <span className="text-gray-500 dark:text-gray-400">No reports found.</span>
                                        </div>
                                    }
                                    {userReport && userReport.length > 0 && userReport.map((data:any, idx:number) => {
                                        return (
                                            <tr key={idx} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <td className="flex items-center p-4 mr-12 space-x-6 whitespace-nowrap">
                                                    <img className="w-10 h-10 rounded-full" src={data?.reportedBy?.image+''} alt=" avatar" />
                                                    <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                                        <div className="text-base font-semibold text-gray-900 dark:text-white">{data?.reportedBy?.username}</div>
                                                        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">{data?.reportedBy?.email}</div>
                                                    </div>
                                                </td>
                                                <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">{data.reason}</td>

                                                <td className="p-2 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
                                                    <div className={data && data?.solve === true ? "text-green-600" : "text-red-600"} >
                                                        {data && data?.solve === true ? "Solved" : "Pending"}
                                                    </div>
                                                </td>
                                                <td className="p-4 space-x-2 whitespace-nowrap">

                                                    <button type="button" onClick={() => setOpenAction(idx)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-600 rounded-lg hover:bg-orange-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-black">
                                                        Action
                                                    </button>
                                                </td>
                                                {openAction === idx && <ReportUserModalPage closeModal={closeModal} data={data} />}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default UserReportPage
