'use client'
import { likePost, SavePosts } from "@/lib/functions/Posts/route";
import { userReels } from "@/lib/functions/user/route";
import CommentsPage from "@/pages/user/commentPage";
import { store } from "@/redux/store";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

const ReelsComponent = ({ reels }: any) => {
  const [allReels, setAllReels] = useState<any>([]);
  const [visibleReels, setVisibleReels] = useState<any>([]); 
  const [reelsPerPage, setReelsPerPage] = useState(5); 
  const [currentReel, setCurrentReel] = useState(0); 
  const containerRef = useRef<HTMLDivElement>(null);
  const [open,setOpen] = useState(false);
  const [singlePost,setSinglePost] = useState();
  const user = store.getState().auth

  const fetchReels = async () => {
    try {
      const data = await userReels();
      setAllReels(data.allReels);
      setVisibleReels(data.allReels.slice(0, reelsPerPage)); // Show initial set of reels
    } catch (error) {
      console.log("Error fetching reels:", error);
    }
  };

  const handleScroll = () => {
    const reelElements = document.querySelectorAll('.reel');
    reelElements.forEach((reel, index) => {
      const rect = reel.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        setCurrentReel(index);
      }
    });

    // Infinite scroll logic - load more reels when near the bottom
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollHeight - scrollTop === clientHeight) {
        loadMoreReels();
      }
    }
  };

  function handleClickOpen(){
    setOpen(false);
  }

  const loadMoreReels = () => {
    // Load more reels when scrolling
    const nextReels = allReels.slice(visibleReels.length, visibleReels.length + reelsPerPage);
    setVisibleReels((prevReels:any) => [...prevReels, ...nextReels]);
  };

  useEffect(()=>{
    fetchReels();
  },[])

  async function savedPostData (post:any){
    const PostSaving = await SavePosts(post,user.user?._id+'');
    if (PostSaving?.data) {
      const updatedPost = [...allReels]
      const postIndex = updatedPost.findIndex((item: any) => item._id === post._id)
      updatedPost[postIndex].saved = !updatedPost[postIndex].saved;
      console.log(updatedPost);
      setAllReels(updatedPost);
      toast.success('post saved');
    } else {

      toast.error("Post Did't Saved")
    }
  }

  async function UserLike(post: any) {
    try {
      const Postsdetail = await likePost(post, user?.user?._id + '');
      const LikedPostEdit = [...allReels];
      const reelIndex = LikedPostEdit.findIndex((reel: any) => reel._id === post._id);
      if (reelIndex !== -1 && !LikedPostEdit[reelIndex].likes.includes(user.user?._id)) {
        LikedPostEdit[reelIndex].likes.push(user.user?._id);
      } else {
        LikedPostEdit[reelIndex].likes = LikedPostEdit[reelIndex].likes.filter((data: any) => data !== user.user?._id);
      }
      setAllReels(LikedPostEdit);

    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    const handleScrollEvent = () => {
      handleScroll();
    };

    window.addEventListener("scroll", handleScrollEvent);
    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  useEffect(() => {
    // Pause all videos except the currently visible one
    const reelElements = document.querySelectorAll('video');
    reelElements.forEach((video, index) => {
      if (index === currentReel) {
        video.play();
      } else {
        video.pause();
      }
    });
  }, [currentReel]);

  return (
    <div ref={containerRef} className="flex justify-center h-screen overflow-y-scroll no-scrollbar">
              {open && <CommentsPage handleClickOpen={handleClickOpen} singlePost={singlePost} />}
      <div className="reel-container">
        {visibleReels && visibleReels.map((reel: any, index: number) => (
          <div
            key={index}
            className={`reel relative h-screen w-full flex justify-center items-center ${index === currentReel ? 'current-reel' : ''}`}
          >
            <video
              className="h-5/6 w-80 object-cover"
              src={reel.Url[0].url}
              autoPlay
              muted
              loop
            ></video>
            <div className="absolute bottom-16 text-white">

              <div className="mt-4 flex space-x-4">

              </div>
            </div>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white space-y-4">
              {reel.likes.includes(user.user?._id + "") ?
                <svg onClick={() => UserLike(reel)} style={{ cursor: 'pointer' }} aria-label="Unlike" fill="#bd200b" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                :
                <svg fill="#ffffff" height="24" viewBox="0 0 48 48" width="24" onClick={() => UserLike(reel)} style={{ cursor: 'pointer' }}><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
              }
              <svg fill="#ffffff" height="24" viewBox="0 0 48 48" width="24" onClick={() => {setOpen(true),setSinglePost(reel)}} style={{ cursor: 'pointer' }}><path clipRule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fillRule="evenodd"></path></svg>
              <svg onClick={()=>savedPostData(reel)} aria-label="Save" fill="currentColor" className='cursor-pointer' height="24" role="img" viewBox="0 0 24 24" width="24"><title>Save</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReelsComponent;
