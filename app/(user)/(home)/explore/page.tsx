'use client'

import { ExplorePosts } from '@/lib/functions/Posts/route';
import ExplorePage from '@/pages/user/explorePage'
import { RootState } from '@/redux/store';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function Page() {
    const user = useSelector((state: RootState) => state.auth);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        ExplorePosts().then((response) => {
            setPosts(response.AllPosts);
        })
    }, [])
    return (
        <>
            <ExplorePage Posts={posts} />
        </>
    )
}

export default Page
