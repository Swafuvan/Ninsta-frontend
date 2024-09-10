"use client"
import React, { useState } from 'react'
import CommentsPage from './commentPage';

function ExplorePage({ Posts }: any) {

    const [open, setOpen] = useState(false);
    const [singlePost, setSinglePost] = useState([]);


    const handleClickOpen = () => {
        setOpen(false);
    };

    return (
        <div className="flex sm:ml-16 md:ml-20">

            {open && <CommentsPage handleClickOpen={handleClickOpen} singlePost={singlePost} />}

            {/* <!-- Main Content --> */}
            <div className="flex-1 p-4 ">
                <div className="grid cursor-pointer md:ml-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {Posts?.length>0 && Posts?.map((data: any, index: number) => {
                        return (
                            <div onClick={() => { setOpen(true), setSinglePost(data) }}
                                key={index} className="relative ml-auto">
                                {data?.Url[0]?.fileType === 'image' ?
                                    <img src={data?.Url[0]?.url + ''} alt="Image 1" className="w-full h-full object-cover" />
                                    :
                                    <video className="w-full h-full object-cover" controls>
                                        <source src={data?.Url[0]?.url} type="video/mp4" className="w-full h-full object-cover" />
                                        Your browser does not support the video tag.
                                    </video>
                                }
                                <div className="absolute top-2 right-2">

                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ExplorePage
