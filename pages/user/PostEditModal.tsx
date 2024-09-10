"use client"
import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { PostReports } from "@/lib/functions/Posts/route";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import toast from "react-hot-toast";

function PostEditModal({ singlePost, PostEdits }: any) {

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Modal
                backdrop="opaque"
                isOpen={true}
                onOpenChange={PostEdits}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20 "
                }}
            >
                <ModalContent style={{borderRadius:'20px'}} className="border w-96 border-gray-400 bg-slate-200 h-fit mt-28">
                    {(PostEdits) => (
                        <>
                            {open && <ChildModal handleClose={handleClose} singlePost={singlePost} />}
                            <ModalHeader className="flex items-center flex-col gap-1"> </ModalHeader>
                            <ModalBody className="">
                                <button onClick={() => setOpen(true)} className="text-red-600 ">Report</button>
                                <hr className="border-black" />
                                <button className="text-red-600">Unfollow</button>
                                <hr className="border-black" />
                            </ModalBody >
                            <ModalFooter className='flex flex-col justify-center px-0 py-0'>
                                <Button onPress={PostEdits}>
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

export default PostEditModal



function ChildModal({ handleClose,singlePost }: any) {

    const [otherInput,setOtherInput] = useState(false);
    const user = useSelector((state:RootState)=>state.auth)

    async function handleReports(e: any, reportType?: string) {
        e.preventDefault();
        const value = e.target.others ? e.target.others.value : reportType
        if(value){
            const postData = {postId:singlePost._id,userId:user.user?._id}
            const reportPost = await PostReports(value,postData)
            if(reportPost?.status === 200){
                toast.success('Your report has been submitted. We will review it and take appropriate action.', {
                    duration: 3000,
                });
                console.log(reportPost)
            } else {
                toast.error('Failed to report post.', {
                    duration: 3000,
                });
            }
            handleClose()
        }
        
        // toast.error('This post has been reported. We will review it and take appropriate action.', {
        //     icon: <XIcon size={24} />,
        //     duration: 3000,
        // });
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

                            <ModalHeader className="flex items-center flex-col "> Why are you reporting this post? </ModalHeader>
                            <ModalBody className="gap-1">
                                <Button onClick={(e) => handleReports(e, "Bullying or harassment")}>Bullying or harassment</Button>
                                <hr className="border-black" />
                                <Button onClick={(e) => handleReports(e, "Violence or dangerous organizations")}>Violence or dangerous organizations</Button>
                                <hr className="border-black" />
                                <Button onClick={(e) => handleReports(e, "It's spam")}>Its spam</Button>
                                <hr className="border-black" />
                                <Button onClick={(e) => handleReports(e, "Nudity or sexual activity")}>Nudity or sexual activity</Button>
                                <hr className="border-black" />
                                <Button onClick={(e) => handleReports(e, "Hate speech or symbols")}>Hate speech or symbols</Button>
                                <hr className="border-black" />
                                <Button onClick={()=>setOtherInput(true)}>Other</Button>
                                {otherInput && 
                                <form onSubmit={(e) => handleReports(e)}>
                                    <input type="text" name="others" id="others"
                                    className="p-1 mb-1 hover:border-none focus:border-none w-full" placeholder="Type Your problem"/>
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





