'use client'
import { FollowUsers, FriendSuggession, UserfindById, UserNotification } from '@/lib/functions/user/route';
import {  store } from '@/redux/store'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function Notifications() {

  const user = store.getState().auth
  const [userdData, setUserData] = useState([]);
  const [suggession, setSuggession] = useState([]);

  useEffect(() => {
    if (user.user?._id) {
      console.log(user.user._id)
      UserNotification(user.user?._id + '').then((res) => {
        console.log(res);
        setUserData(res.userResult);
        if (res.userResult) {
          console.log(res.userResult.senderId)
        }
        FriendSuggession(user.user?._id + '').then((data) => {
          console.log(data)
          setSuggession(data.suggessions);
        })
      })
    }
  }, [user.user]);

  function handleSuggession(user: any) {
    window.location.href = `/profile?Values=${user._id}`
  }

  async function FollowUser(follower: any) {
    try {
      const followUser = await FollowUsers(user.user?._id + '', follower);
      console.log(followUser);
    } catch (error) {
      console.log(error);
    }
  }

  return (

    <div>

      <div className='grid grid-flow-col justify-between'>
        <div className="max-w-xl mt-5 items-center h-screen md:ml-4 lg:ml-48 overflow-hidden">
          {userdData.length > 0 ?
            <>
              {userdData && userdData.map((data: any, index: number) => {
                return (
                  <div key={index} className="flex justify-between px-5 py-2 bg-white items-center gap-1 rounded-lg border border-gray-100 my-3">
                    <div className="relative w-16 h-16 rounded-full hover:bg-red-700 bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gray-200 rounded-full border-2 border-white ">
                        <img className="w-full h-full object-cover rounded-full" src={data?.senderId?.image} alt="" />
                      </div>
                    </div>
                    <div className='ml-2 '>
                      {
                        data.type === 'message' ?
                          <span className="font-mono">{data?.senderId?.username === user?.user?.username ? `You ${data.content}` : `${data?.senderId?.username} send message *${data.content}*`}</span>
                          :
                          <span className="font-mono"> {data?.senderId?.username === user?.user?.username ? `You ${data.content}` : `${data?.senderId?.username} ${data.content}`}</span>
                      }
                    </div>
                    {data.postId ?
                      <>
                        <div className="relative w-16 h-16 rounded-full ">
                          <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gray-200 border-2 border-white ">
                            {data?.postId?.Url[0]?.fileType === 'video' ? (
                              <video className='w-full h-full object-cover ' controls>
                                <source src={data?.postId?.Url[0]?.url} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            ) : (
                              <img className='w-full h-full object-cover ' src={data?.postId?.Url[0]?.url} alt="post" />
                            )}
                          </div>
                        </div>
                      </>
                      :
                      <>

                      </>
                    }
                    <>
                      {data.type === 'follow' ?
                        <button className={data?.senderId?.following.includes(user.user?._id) ? 'bg-gray-300 text-black rounded-full px-3 py-1.5' : 'bg-blue-500 text-white rounded-full px-3 py-1.5'}>
                          {data?.senderId?.following.includes(user.user?._id) ? 'following' : 'follow'}
                        </button>
                        :
                        data.type === 'message' ?
                          <>
                            <button className='' >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </>
                          :
                          <></>
                      }
                    </>
                  </div>
                )
              })}
            </>
            :
            <>
              <div>
                <div className="text-center">
                  <p className="mt-2 text-xl text-gray-700">No Notifications Found</p>
                </div>
              </div>
            </>
          }

        </div>

        <div className="hidden md:block w-96 ml-16 h-screen p-8 overflow-y-auto bg-white">
          <div className="top-8 right-28 bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4">Suggestions For You</h2>
            <ul className="space-y-4">
              {suggession && suggession.sort(() => 0.5 - Math.random())
                .slice(0, 4)
                .map((res: any, index: number) => {
                  return (
                    <li key={index} className="flex items-center justify-between">

                      <div className="flex items-center space-x-4">
                        <img onClick={() => handleSuggession(res)} className="w-12 h-12 rounded-full cursor-pointer" src={res?.image} alt="User avatar" />
                        <div>
                          <h3 onClick={() => handleSuggession(res)} className="font-semibold cursor-pointer">{res?.username}</h3>
                          <p className="text-sm text-gray-600">Followed by friends</p>
                        </div>
                      </div>
                      <button onClick={() => FollowUser(res)} className={res.followers.includes(user.user?._id) ? 'bg-slate-200 text-black px-3 py-2 rounded-full' : "bg-blue-500 text-white px-4 py-2 rounded-full"}>
                        {res?.followers.includes(user.user?._id) ? 'following' : 'follow'}
                      </button>
                    </li>
                  )
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Notifications
