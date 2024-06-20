import React from 'react'

function AdminUserManagement({columns,data}:any) {

    function handleBlockToggle(data:any){
        alert('hello')
    }

  return (
    <div>
            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <tr>
                        {columns.map((column: any, index: any) => (
                            <th key={index} className="py-3 px-6 text-left">
                                {column}
                            </th>
                        ))}
                        <th className="py-3 px-6 text-left">Status (blocked)</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {data.map((item:any, i:any) => (
                        <tr key={i} className="border-b border-gray-200 hover:bg-gray-100">
                            {columns.map((column:any, index:any) => (
                                <td key={index} className="py-3 px-6 text-left">
                                    {item[column]}
                                </td>
                            ))}
                            <td className="py-3 px-6 text-left">
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        type="checkbox"
                                        role="switch"
                                        id={`flexSwitchCheckDefault${i}`}
                                        checked={item.isBlocked}
                                        onChange={() => handleBlockToggle(i)}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>    
        </div>
  )
}
 
export default AdminUserManagement
