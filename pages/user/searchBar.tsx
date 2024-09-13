'use client'
import { UserSearch } from '@/lib/functions/user/route';
import { store } from '@/redux/store';
import { User } from '@/type/users';
import { TextField } from '@mui/material';
import { Link } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function SearchBarPage({ handleSearchClick }: any) {
    const [query, setQuery] = useState('');
    const [error, setError] = useState('');
    const [searchData, setSearchData] = useState<User[]>([]);
    const user = store.getState().auth

    async function handleSearch(val:any){
        window.location.href= `/profile?Values=${val._id}` 
    } 
    
    
    
    async function userSearch(e: any) {
        e.preventDefault();
        const search = e.target.search.value;
        console.log(search);
        const SearchDetails = await UserSearch(search,user.user?._id+'');
        if (SearchDetails.searchResult) {
            setSearchData(SearchDetails.searchResult);
        } else {
            if(SearchDetails.message){
                setError(SearchDetails.message);
            }
        }
    }
    
    return (
        <div style={{ zIndex: 1000 }} className='fixed inset-0 '>
            {/* Background Overlay */}
            <div className="flex absolute z-50 w-full" />

            {/* Search Bar Container */}
            <div className="absolute md: top-0 h-full left-16 w-96 bg-white shadow-lg p-4">
                <div className='mt-3'>
                    <h2 className="text-2xl font-bold text-gray-800">Search</h2>
                    <hr className='border-b-black' />

                    {/* Search Input */}
                    <div className='mt-10'>
                        <form onSubmit={userSearch}>
                            <TextField
                                label="Search"
                                name='search'
                                id='search'
                                variant="outlined"
                                fullWidth
                                value={query}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </form>
                    </div>

                    {/* Error Message */}
                    {error && <span className='text-red-500 text-2xl'>{error}</span>}
                    <hr className='border-b-0 border-black mt-3' />
                </div>

                {/* Search Results */}
                <div className='overflow-auto'>
                    {searchData.map((data, index) => (
                        <div onClick={
                            () => handleSearch (data)
                        } key={index} className='mt-2 flex overflow-y-auto'>
                            <img src={data.image+''} className='w-12 rounded-full' alt="user" />
                            <div className='ml-3'>
                                <p className='text-gray-800 text-md'>{data.username}</p>
                                <span className='text-gray-600'>{data.fullName}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SearchBarPage;
