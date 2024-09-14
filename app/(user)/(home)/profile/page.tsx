'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { store } from '@/redux/store';
import { UserPosts } from '@/lib/functions/Posts/route';
import { useSearchParams } from 'next/navigation';
import { BlockUsers, FollowUsers, UserfindById, UserReports } from '@/lib/functions/user/route';
import { User } from '@/type/users';
import MoreIcon from '@mui/icons-material/MoreHoriz';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
import toast from 'react-hot-toast';
import CommentsPage from '@/pages/user/commentPage';


function ProfilePage() {

  const searchParams = useSearchParams();
  const user = store.getState()?.auth
  const [followers, setFollowers] = useState(false);
  const [followerData, setFollowerData] = useState<String[] | undefined>([]);
  const [followingData, setFollowingData] = useState<String[] | undefined>([]);
  const [following, setFollowing] = useState(false);
  const [messageUserData, setMessageUserData] = useState('');
  const [openPost, setOpenPost] = useState(false);
  const [singlePost, setSinglePost] = useState();
  const [editUser, setEditUser] = useState(false);
  const [reels, setReels] = useState(false);
  const [posts, setPosts] = useState([]);
  const [proUser, setProUser] = useState<User>()

  useEffect(() => {
    if (searchParams) {
      const userData = searchParams?.get('Values');
      setMessageUserData(userData + '')
      if (userData) {
        UserfindById(userData).then((response) => {
          if (response) {
            UserPosts(response.userDetail._id).then((res) => {
              console.log(res);
              setPosts(res.UserPostData ?? []);
              console.log(res.UserPostData[0]?.userId);
              setProUser(response?.userDetail)
            })
          }
        })
      } else {
        if (user.user?._id) {
          UserPosts(user?.user?._id).then((Userpost) => {
            setPosts(Userpost?.UserPostData ?? [])

            setProUser(user.user as User)
          })
        }
      }
    }

  }, [searchParams, user.user]);

  async function followTheUser() {
    const following = await FollowUsers(user.user?._id + '', proUser);
    const userDatas = { ...proUser }
    if (userDatas?.followers?.includes(user.user?._id + '')) {
      userDatas.followers = userDatas.followers.filter((data: any) => data !== user.user?._id);
    } else {
      userDatas?.followers?.push(user.user?._id + '');
    }
    setProUser(userDatas as User);
  }

  function FollowersList() {
    setFollowers(false)
  }

  function EditOptionClose() {
    setEditUser(false)
  }

  function handleClickOpen() {
    setOpenPost(false)
  }

  function FollowingList() {
    setFollowing(false)
  }

  function messageUser() {
    window.location.href = `/messages?userId=${messageUserData}`
  }

  return (

    <main className="bg-gray-100 bg-opacity-25 flex justify-end">

      <div className="lg:w-11/12 lg:mx-auto mb-8">

        <header className="flex flex-wrap items-center p-4 md:py-8">

          <div className="md:w-3/12 md:ml-16">
            {/* <!-- profile image --> */}
            <img className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full
                     border-2 border-pink-600 p-1" src={proUser?.image + ''} alt="profile" />
          </div>

          {/* <!-- profile meta --> */}
          <div className="w-8/12 md:w-7/12 ml-4">
            <div className="md:flex md:flex-wrap md:items-center mb-4">
              <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
                {proUser?.username}
              </h2>

              {/* <!-- badge --> */}
              <span className="inline-block fas fa-certificate fa-lg text-blue-500 
                               relative mr-6  text-xl transform -translate-y-2" aria-hidden="true">
                <i className="fas fa-check text-white text-xs absolute inset-x-0
                               ml-1 mt-px"></i>
              </span>
              <MoreIcon className='ml-4 cursor-pointer' onClick={() => { setEditUser(true) }} />
            </div>
            {proUser?._id === user.user?._id ?
              <>
                {/* <button className="bg-zinc-300 px-3 mt-1  py-1 
                    text-black font-semibold text-sm rounded block text-center">Edit User</button> */}
              </>
              :
              <>
                <a onClick={followTheUser} className={proUser?.followers.includes(user.user?._id + '') ?
                  "bg-stone-400 w-20 py-1 ml-2  text-black font-semibold text-sm rounded block text-center sm:inline-block cursor-pointer"
                  :
                  "bg-blue-500 w-20 py-1 text-white font-semibold text-sm rounded block text-center sm:inline-block cursor-pointer"
                }
                >{proUser?.followers.includes(user.user?._id + '') ? 'following' : 'follow'}</a>
                <a onClick={messageUser} className="bg-stone-400 px-3 ml-2 py-1 
                    text-black font-semibold text-sm rounded block text-center 
                    sm:inline-block cursor-pointer">Message</a>
              </>
            }
            {followers && <FollowersLists FollowersList={FollowersList} followerData={followerData} />}
            {editUser && <EditOptionDiv EditOptionClose={EditOptionClose} UserDetails={proUser} />}
            {following && <FollowingLists FollowingList={FollowingList} followingData={followingData} />}
            {openPost && <CommentsPage handleClickOpen={handleClickOpen} singlePost={singlePost} />}
            {/* <!-- post, following, followers list for medium screens --> */}
            <ul className="hidden md:flex mt-2 space-x-8 mb-4">
              <li>
                <span className="font-semibold">{posts && posts?.length ? posts.length : 0} </span>
                posts
              </li>

              <li onClick={() => { setFollowers(true), setFollowerData(proUser?.followers) }} className='cursor-pointer'>
                <span className="font-semibold">{proUser?.followers?.length} </span>
                followers
              </li>
              <li onClick={() => { setFollowing(true), setFollowingData(proUser?.following) }} className='cursor-pointer'>
                <span className="font-semibold">{proUser?.following?.length} </span>
                following
              </li>
            </ul>

            {/* <!-- user meta form medium screens --> */}
            <div className="hidden md:block">
              <h1 className="font-semibold">ByteWebster</h1>
              <span className="bioclassName">Internet company</span>
              <p>ByteWebster is a web development and coding blog website. Where we provide professional web projects🌍</p>
              <span><strong>{proUser?.email}</strong></span>
            </div>

          </div>

          {/* <!-- user meta form small screens --> */}
          <div className="md:hidden text-sm my-2">
            <h1 className="font-semibold">ByteWebster</h1>
            <span className="bioclassName">Internet company</span>
            <p>ByteWebster is a web development and coding blog website. Where we provide professional web projects🌍</p>
            <span><strong>{proUser?.email}</strong></span>
          </div>

        </header>

        {/* <!-- posts --> */}
        <div className="px-px md:px-3">

          {/* <!-- user following for mobile only --> */}
          <ul className="flex md:hidden justify-around space-x-8 border-t 
                text-center p-2 text-gray-600 leading-snug text-sm">
            <li>
              <span className="font-semibold text-gray-800 block">{posts && posts?.length ? posts.length : 0}</span>
              posts
            </li>

            <li>
              <span onClick={() => { setFollowers(true), setFollowerData(proUser?.followers) }} className="font-semibold text-gray-800 block">{proUser?.followers?.length}</span>
              followers
            </li>
            <li>
              <span onClick={() => { setFollowing(true), setFollowingData(proUser?.following) }} className="font-semibold text-gray-800 block">{proUser?.following?.length}</span>
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
            <li className={reels === false ? "md:border-t md:border-gray-700 md:-mt-px md:text-gray-700" : "flex p-0 cursor-pointer"}>
              <a className=" flex p-3" href="/profile">
                <i className="fas mt-0.5 fa-th-large text-xl md:text-xs">
                  <svg aria-label="" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><title></title><rect fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="14.985" y2="14.985"></line></svg>
                </i>
                <span className="hidden md:inline">post</span>
              </a>
            </li>
            <li className={reels === true ? "md:border-t md:border-gray-700 md:-mt-px md:text-gray-700" : "flex p-0 cursor-pointer"} onClick={() => setReels(true)}
            >
              <a className=" flex p-3" href="#">
                <i className="far mt-0.5 fa-square text-xl md:text-xs">
                  <svg aria-label="" className="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><title></title><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="2.049" x2="21.95" y1="7.002" y2="7.002"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="13.504" x2="16.362" y1="2.001" y2="7.002"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="7.207" x2="10.002" y1="2.11" y2="7.002"></line><path d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z" fillRule="evenodd"></path></svg>
                </i>
                <span className="hidden md:inline">Reels</span>
              </a>
            </li>
            <li>
              <a className="flex p-3" href="/saved">
                <i className="far mt-0.5 fa-square text-xl md:text-xs">
                  <svg aria-label="" className="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><title></title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
                </i>
                <span className="hidden md:inline">Saved</span>
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
            {posts?.length > 0 ? posts && posts.map((data: any, index) => {
              return (
                <div key={index} className="w-1/3 p-px md:px-3">
                  {/* <!-- post 1--> */}
                  <a href="#">
                    <article onClick={() => { setOpenPost(true), setSinglePost(data) }} className="post bg-gray-100 text-white relative pb-full md:mb-6">
                      {/* <!-- post images--> */}
                      {data?.Url[0]?.fileType === 'video' ? (
                        <video controls className="w-full h-full absolute left-0 top-0 object-cover">
                          <source src={data.Url[0].url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img src={data.Url[0].url} className="w-full h-full absolute left-0 top-0 object-cover" alt="post" />
                      )}
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
            })
              :
              <>
                <div>
                  <p>No posts </p>
                </div>
              </>
            }
          </div>
        </div>
      </div>
    </main >

  )
}

export default ProfilePage


function FollowersLists({ FollowersList, followerData }: any) {

  const user = store.getState()?.auth
  const [follower, setFollower] = useState<User[]>([]);

  useEffect(() => {
    if (user.user && followerData.length > 0) {
      const fetchFollowers = async () => {
        try {
          const followersDetails = await Promise.all(
            followerData.map(async (followerId: string) => {
              const response = await UserfindById(followerId);
              return response;
            })
          );
          console.log(followersDetails)
          setFollower(followersDetails);
        } catch (error) {
          console.error('Error fetching followers:', error);
        }
      };

      fetchFollowers();
    }
  }, [user.user, followerData])

  function handleSuggession(userDatas: any) {
    window.location.href = `/profile?Values=${userDatas._id}`
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
        onOpenChange={FollowersList}
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20 "
        }}
      >
        <ModalContent style={{ borderRadius: '20px' }} className="border w-96 border-gray-400 bg-slate-200 h-fit mt-28">
          {(FollowersList) => (
            <>
              <ModalHeader className="flex items-center flex-col gap-1"> </ModalHeader>
              <ModalBody className="">
                {follower.length > 0 ? follower.map((res: any, index: number) => {
                  return (
                    <li onClick={() => handleSuggession(res)} key={index} className="cursor-pointer flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img className="w-12 h-12 rounded-full" src={res?.userDetail?.image + ''} alt="User avatar" />
                        <div>
                          <h3 className="font-semibold">{res?.userDetail?.username}</h3>

                        </div>
                      </div>

                      < hr className="border-black" />
                    </li>
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

function FollowingLists({ FollowingList, followingData }: any) {
  const user = store.getState().auth
  const [following, setFollowing] = useState<User[]>([]);

  useEffect(() => {
    if (user.user && followingData.length > 0) {
      const fetchFollowers = async () => {
        try {
          const followersDetails = await Promise.all(
            followingData.map(async (followerId: string) => {
              const response = await UserfindById(followerId);
              return response;
            })
          );
          console.log(followersDetails)
          setFollowing(followersDetails);
        } catch (error) {
          console.error('Error fetching followers:', error);
        }
      };

      fetchFollowers();
    }
  }, [user.user, followingData])

  function handleSuggession(userDatas: any) {
    window.location.href = `/profile?Values=${userDatas._id}`
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
        onOpenChange={FollowingList}
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20 "
        }}
      >
        <ModalContent style={{ borderRadius: '20px' }} className="border w-96 border-gray-400 bg-slate-200 h-fit mt-28">
          {(FollowingList) => (
            <>
              <ModalHeader className="flex items-center flex-col gap-1"> </ModalHeader>
              <ModalBody className="">
                {following.length > 0 ? following.map((res: any, index: number) => {
                  return (
                    <li onClick={() => handleSuggession(res)} key={index} className="cursor-pointer flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img className="w-12 h-12 rounded-full" src={res?.userDetail?.image + ''} alt="User avatar" />
                        <div>
                          <h3 className="font-semibold">{res?.userDetail?.username}</h3>
                        </div>
                      </div>
                      < hr className="border-black" />
                    </li>
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

function EditOptionDiv({ EditOptionClose, UserDetails }: any) {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState<User>();
  const user = store.getState()?.auth

  useEffect(() => {
    if (user.user)
      UserfindById(user.user?._id).then((resp) => {
        setUserData(resp.userDetail);
      })
  }, [user.user])

  const handleClose = () => {
    setOpen(false);
  };

  function EditProfilefun() {
    window.location.href = '/profile/profileEdit'
  }

  async function BlockUser(userId: string) {
    try {
      const blockUser = await BlockUsers(userId, user.user?._id + '');
      console.log(blockUser);
      EditOptionClose()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Modal
        backdrop="opaque"
        isOpen={true}
        onOpenChange={EditOptionClose}
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20 "
        }}
      >
        <ModalContent style={{ borderRadius: '20px' }} className="border w-96 border-gray-400 bg-slate-200 h-fit mt-28">
          {(EditOptionClose) => (
            <>
              {open && <ChildModal handleClose={handleClose} UserDetails={UserDetails} />}
              <ModalHeader className="flex items-center flex-col gap-1"> </ModalHeader>
              <ModalBody className="">
                <button onClick={() => setOpen(true)} className="text-red-600 ">Report</button>
                <hr className="border-black" />
                {UserDetails._id === user.user?._id ? <button onClick={() => EditProfilefun()} >Edit Profile</button> : <button onClick={() => BlockUser(UserDetails._id)} className="text-red-600">{userData?.blockedUsers.includes(UserDetails._id) ? "UnBlock" : "Block"}</button>}
                <hr className="border-black" />
              </ModalBody >
              <ModalFooter className='flex flex-col justify-center px-0 py-0'>
                <Button onPress={EditOptionClose}>
                  Cancel
                </Button>

              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

function ChildModal({ handleClose, UserDetails }: any) {

  const [otherInput, setOtherInput] = useState(false);
  const user = store.getState().auth


  async function handleReports(e: any, reportType?: string) {
    e.preventDefault();
    const value = e.target.others ? e.target.others.value : reportType
    if (value && UserDetails._id) {
      console.log(UserDetails._id)
      const reportPost = await UserReports(value, user.user?._id + '', UserDetails._id)
      if (reportPost?.status === 200) {
        toast.success('Your report has been submitted. We will review it and take appropriate action.', {
          duration: 3000,
        });
        console.log(reportPost)
      } else {
        toast.error('Failed to report User.', {
          duration: 3000,
        });
      }
      handleClose()
    }
  }

  return (

    <>
      <Modal
        backdrop="opaque"
        isOpen={true}
        onOpenChange={handleClose}
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
        }}
      >
        <ModalContent className="border w-96 border-gray-400 bg-slate-200 rounded-md h-fit mt-28">
          {(handleClose) => (
            <>

              <ModalHeader className="flex items-center flex-col "> Why are you reporting this user? </ModalHeader>
              <ModalBody className="gap-1">
                <Button onClick={(e) => handleReports(e, "Bullying or harassment")}>Bullying or harassment</Button>
                <hr className="border-black" />
                <Button onClick={(e) => handleReports(e, "Violence or dangerous organizations")}>Violence or dangerous organizations</Button>
                <hr className="border-black" />
                <Button onClick={(e) => handleReports(e, "It is spam")}>Its spam</Button>
                <hr className="border-black" />
                <Button onClick={(e) => handleReports(e, "Nudity or sexual activity")}>Nudity or sexual activity</Button>
                <hr className="border-black" />
                <Button onClick={(e) => handleReports(e, "Hate speech or symbols")}>Hate speech or symbols</Button>
                <hr className="border-black" />
                <Button onClick={() => setOtherInput(true)}>Other</Button>
                {otherInput &&
                  <form onSubmit={(e) => handleReports(e)}>
                    <input type="text" name="others" id="others"
                      className="p-1 mb-1 hover:border-none focus:border-none w-full" placeholder="Type Your problem" />
                  </form>
                }
                <hr className="border-black" />
              </ModalBody >
              <ModalFooter className='flex flex-col justify-center px-0 py-0'>
                <Button onPress={handleClose}>
                  Cancel
                </Button>

              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

