'use client'
import React, { useEffect, useRef, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { AllUsersStory, OwnStory } from "@/lib/functions/user/route";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { motion } from "framer-motion";
import { User, userStory } from "@/type/users";
import { FaPaperPlane, FaHeart } from "react-icons/fa";


export default function StoryShowPage({ StoryShowing, storyUser }: any) {

  const [progress, setProgress] = useState(0); // State for progress bar
  const [ownStory, setOwnStory] = useState<any>();
  const user = useSelector((state: RootState) => state.auth);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (user.user?._id) {
      OwnStory(storyUser).then((res) => {
        console.log(res.userOwnStory);
        setOwnStory(res.userOwnStory);
      })
    }
  }, [user.user?._id]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (ownStory) {
      // Calculate story duration (10s for images)
      const duration = ownStory.files[0].type === 'image' ? 10000 : Number(videoRef.current?.duration) * 1000 || 10000;

      if (ownStory.files[0].type === 'image') {
        timer = setTimeout(() => {
          StoryShowing(false);
        }, 10000); // Auto-close after 10 seconds for images

        // Update the progress bar over 10 seconds
        setProgress(0);
        const interval = setInterval(() => {
          setProgress((prev) => prev + 1);
        }, 100); // 100 updates in 10 seconds

        return () => {
          clearTimeout(timer);
          clearInterval(interval);
        };
      } else if (ownStory.files[0].type === 'video') {
        const video = videoRef.current;
        if (video) {
          video.play();
          setProgress(0); // Reset progress for video
          const interval = setInterval(() => {
            const progressValue = (video.currentTime / video.duration) * 100;
            setProgress(progressValue);
          }, 100); // Update progress during video playback

          timer = setTimeout(() => {
            video.pause();
            StoryShowing();
          }, duration);

          return () => {
            clearTimeout(timer);
            clearInterval(interval);
          };
        }
      }
    }
  }, [ownStory, StoryShowing]);

  function redirectToHome() {
    // window.location.href = '/';
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
            <ModalBody className="flex items-center justify-center relative">
              {ownStory ? (
                <div className="w-full flex justify-center h-[100%] relative">
                  <div className="w-full h-[95%] max-w-md bg-white xl:max-w-md shadow-md rounded-md overflow-hidden relative">

                    {/* Progress bar at the top */}
                    <motion.div
                      className="absolute top-0 left-0 h-1 bg-gray-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.1 }}
                      style={{ width: `${progress}%` }}
                    />

                    {/* Header with user info */}
                    <div className="w-full flex items-center p-1 border-b border-gray-300">
                      <img
                        src={ownStory?.user?.image}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
                        alt="profileImage"
                      />
                      <div className="ml-4">
                        <span className="text-sm font-semibold">{ownStory.user.username}</span><br />
                        <span className="text-gray-600 text-xs">{ownStory.user.fullName}</span>
                      </div>
                    </div>

                    {/* Story Content */}
                    {ownStory.files[0].type === 'image' ? (
                      <div className="w-fit h-[80%] flex justify-center">
                        <img
                          src={ownStory.files[0].fileURL}
                          alt=""
                          className="object-cover ml-4 h-full w-full"
                        />
                        <div className="bottom-28 absolute flex flex-col text-3xl font-bold" style={{ color: 'white' }}>
                          {ownStory?.caption}
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-[80%] flex justify-center">
                        <video ref={videoRef} src={ownStory.files[0].fileURL} className="object-cover h-full w-full" />
                      </div>
                    )}

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

