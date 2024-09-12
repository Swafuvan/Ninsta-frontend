'use client'

import { savedPosts } from '@/lib/functions/user/route';
import CommentsPage from '@/pages/user/commentPage';
import { RootState } from '@/redux/store'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function SavedPage() {
    const [savePost, setSavePost] = useState(false);
    const [allSavePost, setAllSavePost] = useState([]);
    const user = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (user.user?._id) {
            savedPosts(user.user._id + '').then((res) => {
                console.log(res.savedData);
                setAllSavePost(res.savedData);
            })

        }
    }, [user.user?._id])

    const savedPostsShow = () => {
        setSavePost(false)
    }

    return (
        <div className='lg:w-11/12 lg:mx-auto  mb-8'>
            <header className="flex flex-wrap ml-16 items-center p-4 md:py-8">

                <div className="md:w-3/12 md:ml-16">
                    {/* <!-- profile image --> */}
                    <img className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full
                    border-2 border-pink-600 p-1" src={user.user?.image + ''} alt="profile" />
                </div>

                {/* <!-- profile meta --> */}
                <div className="w-8/12 md:w-7/12 ml-4">
                    <div className="md:flex md:flex-wrap md:items-center mb-4">
                        <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
                            {user.user?.username}
                        </h2>

                        {/* <!-- badge --> */}
                        <span className="inline-block fas fa-certificate fa-lg text-blue-500 
                            relative mr-6  text-xl transform -translate-y-2" aria-hidden="true">
                            <i className="fas fa-check text-white text-xs absolute inset-x-0 ml-1 mt-px"></i>
                        </span>

                        {/* <!-- follow button -->
                            <a href="#" className="bg-blue-500 px-2 py-1 
                            text-white font-semibold text-sm rounded block text-center 
                            sm:inline-block">Follow</a> */}
                    </div>

                    {/* <!-- post, following, followers list for medium screens --> */}
                    <ul className="hidden md:flex space-x-8 mb-4">
                        <li>
                            <span className="font-semibold">{ } </span>
                            posts
                        </li>

                        <li>
                            <span className="font-semibold">{user.user?.followers?.length ?? 0} </span>
                            followers
                        </li>
                        <li>
                            <span className="font-semibold">{user.user?.following?.length ?? 0} </span>
                            following
                        </li>
                    </ul>

                    {/* <!-- user meta form medium screens --> */}
                    <div className="hidden md:block">
                        <h1 className="font-semibold">ByteWebster</h1>
                        <span className="bioclassName">Internet company</span>
                        <p>ByteWebster is a web development and coding blog website. Where we provide professional web projects🌍</p>
                        <span><strong>{user.user?.email}</strong></span>
                    </div>

                </div>

                {/* <!-- user meta form small screens --> */}
                <div className="md:hidden text-sm my-2">
                    <h1 className="font-semibold">ByteWebster</h1>
                    <span className="bioclassName">Internet company</span>
                    <p>ByteWebster is a web development and coding blog website. Where we provide professional web projects🌍</p>
                    <span><strong>{user.user?.email}</strong></span>
                </div>

            </header>
            <br />

            <ul className="flex ml-24 items-center justify-around md:justify-center space-x-12  
                    uppercase tracking-widest font-semibold text-xs text-gray-600
                    border-t">

                <li className=" ">
                    <a className=" flex p-3" href="/profile">
                        <i className="fas mt-0.5 fa-th-large text-xl md:text-xs">
                            <svg aria-label="" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><title></title><rect fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="14.985" y2="14.985"></line></svg>
                        </i>
                        <span className="hidden md:inline">post</span>
                    </a>
                </li>
                <li>
                    <a className="flex p-3" href="#">
                        <i className="far mt-0.5 fa-square text-xl md:text-xs">
                            <svg aria-label="" className="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><title></title><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="2.049" x2="21.95" y1="7.002" y2="7.002"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="13.504" x2="16.362" y1="2.001" y2="7.002"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="7.207" x2="10.002" y1="2.11" y2="7.002"></line><path d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z" fill-rule="evenodd"></path></svg>
                        </i>
                        <span className="hidden md:inline">Reels</span>
                    </a>
                </li>
                <li className='md:border-t md:border-gray-700 md:-mt-px md:text-gray-700'>
                    <a className="flex p-3" href="/saved">
                        <i className="far mt-0.5 fa-square text-xl md:text-xs">
                            <svg aria-label="" className="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><title></title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
                        </i>
                        <span className="hidden md:inline">Saved</span>
                    </a>
                </li>

            </ul>
            {/* Saved posts */}
            <div className="flex items-start gap-2.5 ml-32 mt-3">
                <div className="flex flex-col gap-1">
                    {!savePost ?
                        <div onClick={() => setSavePost(true)} className="cursor-pointer flex flex-col w-full max-w-[326px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">Saved Posts</span>
                            </div>
                            <div className="grid gap-4 grid-cols-2 my-2.5">
                                <div className="group relative">

                                    <img src="https://imgs.search.brave.com/lZWWYcCRpYT6aU6HyKEGyjFAKnk5Ik1fEIYWJi3VvDE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNi8x/MS8yMy8xNy8yNS93/b21hbi0xODUzOTM5/XzY0MC5qcGc" className="rounded-lg" />
                                </div>
                                <div className="group relative">

                                    <img src="https://imgs.search.brave.com/lZWWYcCRpYT6aU6HyKEGyjFAKnk5Ik1fEIYWJi3VvDE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNi8x/MS8yMy8xNy8yNS93/b21hbi0xODUzOTM5/XzY0MC5qcGc" className="rounded-lg" />
                                </div>
                                <div className="group relative">

                                    <img src="https://imgs.search.brave.com/lZWWYcCRpYT6aU6HyKEGyjFAKnk5Ik1fEIYWJi3VvDE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNi8x/MS8yMy8xNy8yNS93/b21hbi0xODUzOTM5/XzY0MC5qcGc" className="rounded-lg" />
                                </div>
                                <div className="group relative">

                                    <img src="https://imgs.search.brave.com/lZWWYcCRpYT6aU6HyKEGyjFAKnk5Ik1fEIYWJi3VvDE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNi8x/MS8yMy8xNy8yNS93/b21hbi0xODUzOTM5/XzY0MC5qcGc" className="rounded-lg" />
                                </div>
                            </div>
                            <div className="flex justify-between items-center">

                            </div>
                        </div>
                        :
                        <SavePosts savedPostsShow={savedPostsShow} allSavePost={allSavePost} />
                    }
                </div>

            </div>
        </div >

    )
}

export default SavedPage

function SavePosts({ savedPostsShow, allSavePost }: any) {
    console.log(allSavePost);
    const [open, setOpen] = useState(false);
    const [singlePost, setSinglePost] = useState([]);


    const handleClickOpen = () => {
        setOpen(false);
    };
    return (
        <div className="flex flex-wrap -mx-px md:-mx-3">
            {open && <CommentsPage handleClickOpen={handleClickOpen} singlePost={singlePost} />}
            {allSavePost.length>0 ? allSavePost.map((data: any, index: number) => {
                return (
                    <div key={index} className="w-[200px]  p-px md:px-3">
                        {/* <!-- post 1--> */}
                        <a href="#">
                            <article className="post bg-gray-100 text-white relative pb-full md:mb-6">
                                {/* <!-- post images--> */}
                                {data.postId?.Url[0]?.fileType === 'video' ? (
                                    <video controls className="absolute left-0 h-56 top-0 object-cover"
                                    onClick={() => { setOpen(true), setSinglePost(data.postId) }}
                                    >
                                        <source src={data.postId.Url[0].url} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <img onClick={() => { setOpen(true), setSinglePost(data.postId) }} className="absolute left-0 top-0 h-56 object-cover" src={data.postId.Url[0].url} alt="image" />
                                )}

                                <i className="fas fa-square absolute right-0 top-0 m-1"></i>
                                {/* <!-- overlay--> */}
                                <div className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute 
                                left-0 top-0 hidden">
                                    <div className="flex justify-center items-center 
                                    space-x-4 h-full">
                                        <span className="p-2">
                                            <i className="fas fa-heart"></i>
                                            {data.postId.likes.length + ''} likes
                                        </span>
                                    </div>
                                </div>

                            </article>
                        </a>
                    </div>
                )
            })  :
            <>
            <div className="flex justify-center items-center h-full">
                <p className="text-gray-400 text-lg">No saved posts found</p>
            </div>
            </>
            }

        </div>
    )
}
