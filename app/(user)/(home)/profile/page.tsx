'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { UserPosts } from '@/lib/functions/Posts/route';

function ProfilePage() {

  const [posts, setPosts] = useState([])
    // const user = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.auth);

  console.log(user.user,"what is thia");

  // const userPost = UserPosts(user.user?._id)

  useEffect(() => {
    console.log(user)
    if (user.user?._id) {
      UserPosts(user.user?._id).then((Userpost) => {
        console.log(Userpost,"tjis is poyuhiuig")
        setPosts(Userpost.UserPostData ?? [])
      })
    }
    console.log(user.user?._id)
  }, [user])

  return (

    <main className="bg-gray-100 bg-opacity-25 flex justify-end">

      <div className="lg:w-11/12 lg:mx-auto mb-8">

        <header className="flex flex-wrap items-center p-4 md:py-8">

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
                <i className="fas fa-check text-white text-xs absolute inset-x-0
                               ml-1 mt-px"></i>
              </span>

              {/* <!-- follow button -->
                <a href="#" className="bg-blue-500 px-2 py-1 
                        text-white font-semibold text-sm rounded block text-center 
                        sm:inline-block">Follow</a> */}
            </div>

            {/* <!-- post, following, followers list for medium screens --> */}
            <ul className="hidden md:flex space-x-8 mb-4">
              <li>
                <span className="font-semibold">{posts && posts?.length ? posts.length : 0 } </span>
                posts
              </li>

              <li>
                <span className="font-semibold">{user.user?.follower?.length ?? 0} </span>
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

        {/* <!-- posts --> */}
        <div className="px-px md:px-3">

          {/* <!-- user following for mobile only --> */}
          <ul className="flex md:hidden justify-around space-x-8 border-t 
                text-center p-2 text-gray-600 leading-snug text-sm">
            <li>
              <span className="font-semibold text-gray-800 block">6</span>
              posts
            </li>

            <li>
              <span className="font-semibold text-gray-800 block">{user.user?.follower?.length ?? 0}</span>
              followers
            </li>
            <li>
              <span className="font-semibold text-gray-800 block">{user.user?.following?.length ?? 0}</span>
              following
            </li>
          </ul>
          <br />
          <br />
          {/* <!-- insta freatures --> */}
          <ul className="flex items-center justify-around md:justify-center space-x-12  
                    uppercase tracking-widest font-semibold text-xs text-gray-600
                    border-t">
            {/* <!-- posts tab is active --> */}
            <li className="md:border-t md:border-gray-700 md:-mt-px md:text-gray-700">
              <a className="inline-block p-3" href="#">
                <i className="fas fa-th-large text-xl md:text-xs"></i>
                <span className="hidden md:inline">post</span>
              </a>
            </li>
            <li>
              <a className="inline-block p-3" href="#">
                <i className="far fa-square text-xl md:text-xs"></i>
                <span className="hidden md:inline">Reels</span>
              </a>
            </li>
            {/* <li>
                    <a className="inline-block p-3" href="#">
                      <i className="fas fa-user border border-gray-500
                             px-1 pt-1 rounded text-xl md:text-xs"></i>
                      <span className="hidden md:inline">tagged</span>
                    </a>
                  </li> */}
          </ul>
          {/* <!-- flexbox grid --> */}
          <div className="flex flex-wrap -mx-px md:-mx-3">
          {posts?.length > 0 ? posts && posts.map((data:any, index) => {
              return (
                <div className="w-1/3 p-px md:px-3">
                  {/* <!-- post 1--> */}
                  <a href="#">
                    <article className="post bg-gray-100 text-white relative pb-full md:mb-6">
                      {/* <!-- post images--> */}
                      <img className="w-full h-full absolute left-0 top-0 object-cover" src={data?.Url} alt="image" />

                      <i className="fas fa-square absolute right-0 top-0 m-1"></i>
                      {/* <!-- overlay--> */}
                      <div className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute 
                                left-0 top-0 hidden">
                        <div className="flex justify-center items-center 
                                    space-x-4 h-full">
                          <span className="p-2">
                            <i className="fas fa-heart"></i>
                            {data?.likes.length + ''} likes
                            
                          </span>

                          
                        </div>
                      </div>

                    </article>
                  </a>
                </div>
               ) 
             }): <>

             </>
             } 

          </div>
        </div>
      </div>
    </main>

  )
}

export default ProfilePage


