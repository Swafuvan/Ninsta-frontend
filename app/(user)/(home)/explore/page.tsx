'use client'

import { ExplorePosts } from '@/lib/functions/Posts/route';
import ExplorePage from '@/pages/user/explorePage'
import { RootState, store } from '@/redux/store';
import React, { useEffect, useState } from 'react'

function Page() {
    const [posts, setPosts] = useState([]);
    const user = store.getState().auth
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
