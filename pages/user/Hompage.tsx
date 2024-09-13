"use client";
import { AllUserData, FriendSuggession, UserfindById, FollowUsers, AllUsersStory, OwnStory } from '@/lib/functions/user/route';
import { Modal, ModalContent, ModalHeader, ModalBody, } from "@nextui-org/react";
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie'
import { store } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { User, userStory } from '@/type/users';
import { getPosts, likePost, SavePosts } from '@/lib/functions/Posts/route';
import StoryShowPage from './storyShow'; 
import StoryCreatePage from './storyCreate'; 
import PostEditModal from './PostEditModal';
import toast from 'react-hot-toast';
import InfiniteScroll from 'react-infinite-scroll-component'
import moment from 'moment';
import CommentsPage from './commentPage';

const HomePage = () => {

  const [Posts, setPosts] = useState<any[]>([]);
  const [allUsersData, setAllUsersData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [report, setReport] = React.useState(false);
  const [singlePost, setSinglePost] = useState([]);
  const [suggession, setSuggession] = useState<User[]>([]);
  const [likedUser, setlikedUser] = useState(false)
  const [UserStory, setUserStory] = useState([]);
  const [addStory, setAddStory] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [storyUser, setStoryUser] = useState('');
  const [ownStoryData, setOwnStoryData] = useState<userStory>()

  let isMobile = false
  let isTablet = false
  useEffect(() => {
    if (typeof window !== 'undefined') {
      isMobile = window.innerWidth <= 680;
      isTablet = window.innerWidth > 680 && window.innerWidth <= 900;
    }
  }, [])

  const router = useRouter();


  // @ts-ignore
  const user = store.getState().auth

  useEffect(() => {
    if (user?.user?._id) {
      FriendSuggession(user.user?._id + '').then((datas) => {
        console.log(datas)
        setSuggession(datas.suggessions);
      })
      AllUserData(user.user._id).then((dataa) => {
        console.log(dataa)
        setAllUsersData(dataa.UserDetails);
      })
    }
  }, [, user?.user?._id]);

  useEffect(() => {
    if (Cookies.get('userToken')) {
      if (user?.user?._id) {
        AllUsersStory(user.user?._id + '').then((result) => {
          console.log(result);
          setUserStory(result.userDetail)
        })
        OwnStory(user.user._id).then((resp) => {
          setOwnStoryData(resp.userOwnStory)
        })
      }
    }
  }, [user?.user?._id])

  useEffect(() => {
    if (Cookies.get('userToken')) {
      getPosts().then(async (response) => {
        if (response) {
          console.log(response)
          const { allPost } = response
          for (const data of allPost) {
            data.userDetails = (await UserfindById(data.userId))?.userDetail
          }
          console.log(allPost)
          await setPosts(allPost);
        }
      })
      console.log(user)

    } else {
      router.push('/Login')
    }
  }, [])



  const handleClickOpen = () => {
    setOpen(false);
  };

  async function PostEdits() {
    setReport(false)
  }

  async function UserLike(post: any) {
    try {
      const Postsdetail = await likePost(post, user?.user?._id + '')
      if (Postsdetail) { console.log(Postsdetail) }
      const updatedPost = [...Posts]

      if (user && user.user) {
        const index = updatedPost.findIndex((item: any) => item._id === post._id)

        if (index !== -1 && !updatedPost[index].likes.includes(user.user._id)) {
          updatedPost[index].likes.push(user.user._id)
        } else {
          updatedPost[index].likes = updatedPost[index].likes.filter((like: any) => like !== user.user?._id + "")
        }
        setPosts(updatedPost)


      }
    } catch (error) {
      console.log(error)
    }
  }

  async function handleSavePost(post: any) {
    try {
      const savedPost = await SavePosts(post, user?.user?._id + '')
      console.log(savedPost)
      if (savedPost?.data) {
        const updatedPost = [...Posts]
        const postIndex = updatedPost.findIndex((item: any) => item._id === post._id)
        updatedPost[postIndex].saved = !updatedPost[postIndex].saved;
        console.log(updatedPost);
        setPosts(updatedPost);
        toast.success('post saved');
      } else {
        toast.error("Post Did't Saved")
      }
    } catch (error) {
      console.log(error)
    }
  }

  function handleSuggession(user: any) {
    if (typeof window !== "undefined") {
      window.location.href = `/profile?Values=${user._id}`
    }
  }

  function ShowLikers(likes: any) {
    setlikedUser(false);
  }

  async function FollowUser(follower: any, index: number) {
    try {
      const followUser = await FollowUsers(user?.user?._id + '', follower);
      const updatedSuggession = [...suggession];
      const userSuggession = suggession.findIndex((data: any) => data._id === follower._id);
      console.log(userSuggession);
      if (followUser && !updatedSuggession[userSuggession].followers.includes(user?.user?._id + '')) {
        updatedSuggession[userSuggession].followers.push(user?.user?._id + '');
      } else {
        updatedSuggession[userSuggession].followers = updatedSuggession[userSuggession].followers.filter((item: any) => item !== user?.user?._id + '');
      }
      setSuggession(updatedSuggession);
    } catch (error) {
      console.log(error);
    }
  }

  function CloseStory() {
    setAddStory(false);
  }


  function StoryShowing() {
    setShowStory(false);
  }

  // const [scrollLeft, setScrollLeft] = useState(0);
  // const scrollRef = useRef(null);

  // const handleScroll = (event:any) => {
  //   setScrollLeft(event.target.scrollLeft);
  // };

  // const handlePrevClick = () => {
  //   scrollRef?.current?.scrollLeft -= 150; 
  // };

  // const handleNextClick = () => {
  //   scrollRef?.current?.scrollLeft += 150; 
  // };

  // const showNavigationButtons = allUsersData.length > 7;

  return (
    <div className='flex justify-center md:ml-44 '>
      {/* Left side (Stories and Posts) */}
      {user && (
        <>
          <div className="w-full ">
            <div className="z-10 p-3 ml-9">
              <ul className="flex space-x-2 ">
                <li className="flex flex-col items-center space-y-1 ">
                  <div className={ownStoryData ? "relative  bg-gradient-to-tr from-yellow-400 to-purple-600 z-0 p-1 rounded-full" : 'relative  bg-gradient-to-tr from-gray-400 to-white z-0 p-1 rounded-full'}>
                    <a href="#" className="block bg-white p-1 rounded-full transform transition z-0 hover:-rotate-6">
                      <img onClick={() => { setStoryUser(user?.user?._id + ''), setShowStory(true) }} className="z-10 w-12 h-12 rounded-full" src={user.user?.image + ""} alt="cute User" />
                    </a>
                    <button
                      onClick={() => setAddStory(true)}
                      className="absolute bg-blue-500 text-white text-2xl font-medium w-6 h-6 rounded-full bottom-0 right-1 border-4 border-white flex justify-center items-center font-mono hover:bg-blue-700 focus:outline-none"
                    >
                      <div className="transform -translate-y-px">+</div>
                    </button>

                  </div>
                  <a href="#">{user.user?.username}</a>
                </li>
                {UserStory.length > 0 ? (
                  UserStory.slice(0, isMobile ? 3 : isTablet ? 4 : 7).map((story: any, index: number) => {
                    return (
                      <li key={index} className="flex flex-col items-center space-y-1 ">
                        <div className={UserStory.length > 0 ? "relative  bg-gradient-to-tr from-yellow-400 to-purple-600 z-0 p-1 rounded-full" : 'relative  bg-gradient-to-tr from-gray-400 to-white z-0 p-1 rounded-full'}>
                          <a href="#" className="block bg-white p-1 rounded-full transform transition hover:-rotate-6">
                            <img onClick={() => { setStoryUser(story.user._id), setShowStory(true) }} className="w-12 h-12 rounded-full" src={story.user.image} alt="post" />
                          </a>
                        </div>
                        <a className='pl-1 w-20 truncate text-gray-800' href="#">
                          {story.user.username}
                        </a>
                      </li>
                    )
                  })
                ) : (
                  allUsersData &&
                  allUsersData.slice(0, isMobile ? 4 : 7).map((data: any, index: number) => {
                    return (
                      <li key={index} className="flex flex-col items-center space-y-1 ">
                        <div className={UserStory.length > 0 ? "relative  bg-gradient-to-tr from-yellow-400 to-purple-600 z-0 p-1 rounded-full" : 'relative  bg-gradient-to-tr from-gray-400 to-white z-0 p-1 rounded-full'}>
                          <a href="#" className="block bg-white p-1 rounded-full transform transition hover:-rotate-6">
                            <img onClick={() => { setStoryUser(data?._id), setShowStory(true) }} className="w-12 h-12 rounded-full" src={data.image} alt="post" />
                          </a>
                        </div>
                        <a className='pl-2 w-20 truncate text-gray-800 ' href="#">
                          {data.username}
                        </a>
                      </li>
                    );
                  })
                )}

              </ul>
            </div>

            {/* Posts component */}
            {showStory && <StoryShowPage StoryShowing={StoryShowing} storyUser={storyUser} />}
            {addStory && <StoryCreatePage userData={user.user} CloseStory={CloseStory} />}
            {report && <PostEditModal singlePost={singlePost} PostEdits={PostEdits} />}
            {likedUser && <LikedUser singlePost={singlePost} ShowLikers={ShowLikers} />}
            {open && <CommentsPage handleClickOpen={handleClickOpen} singlePost={singlePost} />}
            <div className="bg-gray-100 flex flex-col items-center p-4 ml-10 w-full">
              {Posts &&
                Posts?.length === 0 && (
                  <div className="text-center text-gray-600 text-sm">No posts yet.</div>
                )
              }
              {/*Put the scroll bar always on the bottom*/}
              <InfiniteScroll
                dataLength={Posts.length}
                next={getPosts}
                inverse={true} //
                hasMore={true}
                loader={<h4>Loading...</h4>}
                scrollableTarget="scrollableDiv"
              >
                {Posts && Posts.map((item, idx) => {
                  return (
                    <div key={idx} className="bg-white border rounded-sm max-w-lg mb-4 justify-center">
                      <div className="flex items-center justify-between px-2 py-2">
                        <div className='flex '>
                          <img onClick={() => handleSuggession(item.userDetails)} className="h-8 mt-2 w-8 rounded-full" src={item.userDetails.image} alt="user" />
                          <div className="ml-2 ">
                            <span onClick={() => handleSuggession(item.userDetails)} className="cursor-pointer text-sm font-semibold ">{item.userDetails.username}</span>
                            <span className="text-gray-600 text-xs block">{item.userDetails.fullName}</span>
                          </div>
                        </div>
                        <div className='flex  justify-end' ><img className='cursor-pointer' onClick={() => { setReport(true), setSinglePost(item) }} src="/icons8.png" alt="image" /></div>
                      </div>
                      {item?.Url[0]?.fileType === 'video' ? (
                        <video controls>
                          <source src={item.Url[0].url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img src={item.Url[0].url} alt="post" />
                      )}
                      {/* <img src={item.Url[0].url} alt="post" /> */}
                      <div className="flex items-center justify-between mx-4 mt-3 mb-2">
                        <div className="flex gap-5">

                          {item.likes.includes(user.user?._id + "") ?
                            <svg onClick={() => UserLike(item)} style={{ cursor: 'pointer' }} aria-label="Unlike" fill="#bd200b" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                            :
                            <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24" onClick={() => UserLike(item)} style={{ cursor: 'pointer' }}><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                          }
                          <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24" onClick={() => { setOpen(true), setSinglePost(item), console.log(item) }} style={{ cursor: 'pointer' }}><path clipRule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fillRule="evenodd"></path></svg>
                          {/* <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.8l23.1-39.9c.3-.5.3-1.1-.1-1.5zM18.4 28.8l-3.8-15.6L40.3 7 18.4 28.8z"></path></svg> */}
                        </div>
                        {/* {item.saved.savedBy === user.user?._id ? */}
                        <svg onClick={() => handleSavePost(item)}
                          aria-label="Save" fill="currentColor" className='cursor-pointer' height="24" role="img" viewBox="0 0 24 24" width="24"><title>Save</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
                        {/* : */}
                        {/* <svg aria-label="Remove" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Remove</title><path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z"></path></svg> */}
                        {/* }  */}
                      </div>
                      <div onClick={() => { setSinglePost(item), setlikedUser(true) }} className="cursor-pointer font-semibold text-sm mx-4 mt-5 mb-4">{item.likes.length + ''} likes</div>
                      <div className="text-sm mx-4 mb-2">
                        <span className="font-semibold mr-1">-</span> {item.content}
                      </div>
                      <div className="text-xs text-gray-500 mx-4 mb-2">{moment(item.createdAt).fromNow()}</div>

                    </div>
                  )
                })}
              </InfiniteScroll>


            </div>
          </div>

          {/* Right side (Suggestions) */}
          <div className="hidden md:block w-96 ml-4 rounded-md mt-5 p-1 overflow-y-auto bg-white">
            <div className="top-8 right-28 bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold mb-4">Suggestions For You</h2>
              <ul className="space-y-4">
                {suggession.sort(() => 0.5 - Math.random())
                  .slice(0, 3)
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
                        <button onClick={() => FollowUser(res, index)} className={res.followers.includes(user.user?._id) ? 'bg-slate-200 text-black px-3 py-2 rounded-full' : "bg-blue-500 text-white px-4 py-2 rounded-full"}>
                          {res.followers.includes(user.user?._id) ? 'following' : 'follow'}
                        </button>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </>
      )}
    </div >
  )
}

export default HomePage

function LikedUser({ ShowLikers, singlePost }: any) {

  const user = store.getState().auth
  const [LikedUsers, setLikedUsers] = useState<User[]>([]);
  console.log(singlePost)

  useEffect(() => {
    const fetchLikedUsers = async () => {
      try {
        const likedUserData = await Promise.all(
          singlePost.likes.map(async (userId: string) => {
            const result = await UserfindById(userId);
            return result;
          })
        );
        console.log(likedUserData)
        setLikedUsers(likedUserData);
      } catch (error) {
        console.error('Error fetching liked users:', error);
      }
    };

    fetchLikedUsers();
  }, [singlePost.likes]);

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
    <>
      <Modal
        backdrop="opaque"
        isOpen={true}
        onOpenChange={ShowLikers}
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20 "
        }}
      >
        <ModalContent style={{ borderRadius: '20px' }} className="border w-96 border-gray-400 bg-slate-200 h-fit mt-28">
          {(ShowLikers) => (
            <>
              <ModalHeader className="flex items-center flex-col gap-1"> </ModalHeader>
              <ModalBody className="">
                {LikedUsers.length > 0 ? LikedUsers.map((res: any, index: number) => {
                  return (
                    <li onClick={() => handleSuggession(res)} key={index} className="cursor-pointer flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img className="w-12 h-12 rounded-full" src={res?.userDetail?.image + ''} alt="User avatar" />
                        <div>
                          <h3 className="font-semibold">{res?.userDetail?.username}</h3>

                        </div>
                      </div>
                      <button onClick={() => FollowUser(res)} className=
                        {res?.userDetails?.followers.includes(user.user?._id) ?
                          'bg-slate-200 text-black px-3 py-2 rounded-full'
                          :
                          "bg-blue-500 text-white px-4 py-2 rounded-full"}
                      >
                        {res?.userDetails?.followers.includes(user.user?._id) ? 'following' : 'follow'}
                      </button>
                    </li>
                    // < hr className="border-black" />
                  )
                })
                  :
                  <>
                    <div className="text-center text-sm text-gray-400">No Likers yet</div>
                  </>
                }
              </ModalBody >
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}






