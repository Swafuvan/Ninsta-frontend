'use client'
import React, { useState } from 'react';

function UserModal({ user, isOpen, onClose }:any) {
  const [userData, setUserData] = useState(user);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleImageUpload = (e:any) => {
    // Handle image upload logic here
    console.log(e.target.files);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl mb-4">Edit User Details</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
            //   value={userData?.username}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
            //   value={userData?.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">FullName</label>
            <textarea
              name="fulName"
            //   value={userData.fullName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Product Images</label>
            <div className="flex space-x-4">
              {/* {userData.images.map((img:any, index:number) => (
                <div key={index} className="relative">
                  <img src={img} alt={`Product ${index}`} className="w-24 h-24 object-cover" />
                  <button className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">x</button>
                </div>
              ))} */}
              <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-md">
                <input type="file" className="hidden" onChange={handleImageUpload} />
                <span>Upload</span>
              </label>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserModal;
