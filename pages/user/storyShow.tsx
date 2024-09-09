'use client'
import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { AllUsersStory, OwnStory } from "@/lib/functions/user/route";
import { formatDistanceToNow } from 'date-fns'
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { motion } from "framer-motion";
import Stories from 'react-insta-stories'
import { User, userStory } from "@/type/users";
import { FaPaperPlane, FaHeart } from "react-icons/fa";


export default function StoryShowPage({ StoryShowing, storyUser }: any) {

  const user = useSelector((state: RootState) => state.auth);
  const [userStory, setUserStory] = useState<userStory[]>([]);
  const [loading, setLoading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [ownStory, setOwnStory] = useState<any>();
  useEffect(() => {
    if (user.user?._id) {
      OwnStory(storyUser).then((res) => {
        console.log(res.userOwnStory)
        setOwnStory(res.userOwnStory);
      })
    }
  }, [user.user?._id]);

  function redirectToHome() {
    // window.location.href = '/';
  }

  function getStoriesObject() {
    let allStories = [];

    // Add current user's story first if it exists
    if (ownStory || userStory) {
      allStories.push({
        content: (props: any) => (
          <div key={"ownStory"} className="story-container w-full h-full bg-black flex ">
            {/* Your current user's story UI */}
            <div className="max-w-screen-md flex items-center justify-center flex-col bg-no-repeat"
              style={{ backgroundImage: `url(${ownStory?.files[0]?.fileURL})` }}>
              <div className="mt-12 caption text-3xl font-bold" style={{ color: "white" }}>{ownStory?.caption}</div>
            </div>
          </div>
        ),
      });
    }

    allStories = [...allStories];

    return allStories;
  }



  return (
    <>
      <Modal
        backdrop="blur"
        isOpen={true}
        onOpenChange={StoryShowing}
        classNames={{
          backdrop: "bg-zinc-900/50 backdrop-blur-md",
        }}
      >
        <ModalContent className="">
          {(StoryShowing) => (
            <ModalBody className="flex items-center justify-center">
              {ownStory ? (
                <div className="w-full flex justify-center h-[100%]">
                  <div className="w-full h-[100%] max-w-md bg-white xl:max-w-md shadow-md rounded-md overflow-hidden">
                    {/* Header with user info */}
                    <div className="w-full flex items-center p-1 border-b border-gray-300">
                      <img
                        src={ownStory?.user?.image}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
                        alt="profileImage"
                      />
                      <div className=" ml-4">
                        <span className="text-sm font-semibold">{ownStory.user.username}</span><br />
                        <span className="text-gray-600 text-xs">{ownStory.user.fullName}</span>
                      </div>
                    </div>

                    {/* Story Image */}
                    <div className="w-full h-fit flex justify-center">
                      <img
                        src={ownStory.files[0].fileURL}
                        alt=""
                        className="object-cover h-full w-full"
                      />
                      {/* <div className="w-full flex flex-col bg-no-repeat"
                        style={{ backgroundImage: `url(${ownStory?.files[0]?.fileURL})` }}>
                        <div className="mt-12 caption text-3xl font-bold" style={{ color: "white" }}>{ownStory?.caption}</div>
                      </div> */}
                    </div>

                    {/* Action Buttons and Input */}
                    <div className="w-full p-1 border-t border-gray-300 flex items-center">
                      <button className="p-2 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                        <FaHeart className="text-2xl fill-white" />
                      </button>
                      <div className="flex-grow flex items-center mx-2">
                        <input
                          type="text"
                          className="w-full rounded-full px-4 py-2 border border-gray-300 focus:outline-none"
                          placeholder="Add a comment..."
                        />
                        <button className="ml-2 text-white rounded-full p-2 flex items-center justify-center">
                          <FaPaperPlane className="fill-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500">No Story Found</div>
              )}
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>

  );
}


// import { TbHeart } from "react-icons/tb";
// import { FaPaperPlane } from "react-icons/fa";

// export function Story() {
//   return (
//     <div className="w-full flex items-center justify-center h-screen max-h-[90%] border-error">
//       <div className="w-full h-[95%] max-w-sm bg-foreground xl:max-w-md border-separate border-black shadow-md shadow-background rounded-md">
//         <div className="w-full h-[90%] bg-background rounded-t-md">
//           <img src="/Desktop.png" className="w-full h-full p-1 rounded-md border-separate border-error border-2" alt="" />
//         </div>
//         <div className="w-full h-full bg- max-h-[10%]">
//           <div className="w-full px-4 h-full flex flex-row items-center justify-center gap-2">
//             <div className="w-20 flex items-center justify-center flex-shrink-0 h-full">
//               <button className="rounded-md p-2 w-auto bg-background"><TbHeart className="text-[25px] text-error" /></button>
//             </div>
//             <div className="w-full h-full p-1 relative flex items-center justify-center">
//               <input type="text" className="w-full h-full rounded-md px-3 font-semibold" />
//               <button className="absolute right-4 rounded-md h-8 w-8 bg-error flex items-center justify-center">
//                 <FaPaperPlane />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


// export function StoryshjowPage({ StoryShowing, ownUserStoryData }: any) {

//   const user = useSelector((state: RootState) => state.auth);
//   const [userStory, setUserStory] = useState<userStory[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   const [ownStory, setOwnStory] = useState<any>();


//   useEffect(() => {
//     if (user.user?._id) {
//       AllUsersStory(user.user._id).then((data) => {
//         setUserStory(data.userDetail);
//       });

//       OwnStory(user.user._id).then((res) => {
//         setOwnStory(res.userOwnStory);
//       });
//     }
//   }, [user.user?._id]);

//   function getStoriesObject() {
//     let allStories = [];

//     if (ownStory) {
//       allStories.push({
//         content: (props: any) => (
//           <div key={"ownStory"} className="story-container bg-black w-screen h-screen flex items-start justify-center">
//             <div className="w-full h-full bg-black max-w-screen-md flex items-center justify-center flex-col bg-center bg-no-repeat"
//               style={{ backgroundImage: `url(${ownStory.files.fileURL})` }}>
//               <div className="mt-12 caption text-5xl font-bold" style={{ color: "white" }}>{ownStory.caption}</div>
//             </div>
//           </div>
//         ),
//       });
//     }

//     const otherStories = userStory.map((story, index) => {
//       return {
//         content: (props:any) => (
//           <div key={index} className="story-container bg-black w-screen h-screen flex items-start justify-center">
//             <div className="w-full h-full bg-black max-w-screen-md flex items-center justify-center flex-col bg-center bg-no-repeat"
//               style={{ backgroundImage: `url(${story.files[0]?.fileURL})` }}>
//               <div className="mt-12 caption text-5xl font-bold" style={{ color: "white" }}>{story.caption}</div>
//             </div>
//           </div>
//         ),
//       };
//     });

//     allStories = [...allStories, ...otherStories];

//     return allStories;
//   }


//   function redirectToHome() {
//     window.location.href = '/';
//   }

//   return (
//     <div>
//       <div className="flex items-center justify-center w-screen h-screen">
//         <div className="mt-4 flex flex-col items-center justify-center w-96 bg-white shadow-black shadow-2xl rounded-lg border border-black">
//           <div className="p-4 sm:p-4 dark:bg-black dark:text-white rounded-t-lg">
//             <div className="mr-32 flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
//               <img
//                 src={user?.user?.image}
//                 alt="userImage"
//                 className="self-center flex-shrink-0 w-16 h-16 border rounded-full md:justify-self-start dark:bg-gray-500 dark:border-gray-300"
//               />
//               <div className="flex flex-col">
//                 <h4 className="text-black text-xl font-semibold text-center md:text-left">
//                   {user?.user?.username}
//                 </h4>
//                 <h5 className="text-gray-500 font-semibold text-center md:text-left">
//                   {user?.user?.fullName}
//                 </h5>
//                 <p className="dark:text-white"></p>
//               </div>
//             </div>
//           </div>

//           <div className="stories-container w-full flex-grow">
//             <center>
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <div className="relative w-[370px] h-[435px] stories-container">
//                   <Stories
//                     stories={getStoriesObject()}
//                     defaultInterval={5000}
//                     width="100%"
//                     height="100%"
//                     onAllStoriesEnd={redirectToHome}
//                     onStoryEnd={() => setLoading(true)}
//                     isPaused={isPaused}
//                   />
//                 </div>
//               </motion.div>
//             </center>
//           </div>

//           <div></div>
//           <div className="w-96">
//             <div className="relative w-full min-w-[200px] h-14  bg-white shadow-2xl">
//               <div className="absolute grid w-5 h-5 place-items-center text-blue-500 top-2/4 right-3 -translate-y-2/4">
//                 <i className="fa fa-paper-plane" aria-hidden="true"></i>
//               </div>
//               <input
//                 className="peer w-full h-full bg-transparent text-black font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] !pr-9 border-blue-gray-200 focus:border-gray-900"
//                 placeholder=" "
//               />
//               <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:flex-grow before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-black peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
//                 Send Reply...
//               </label>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }



