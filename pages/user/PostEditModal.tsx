"use client"
import React, { useRef, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { deletePost, editPostData, PostReports } from "@/lib/functions/Posts/route";
import { useSelector } from "react-redux";
import { RootState, store } from "@/redux/store";
import toast from "react-hot-toast";

function PostEditModal({ singlePost, PostEdits }: any) {

    const [open, setOpen] = useState(false);
    const [editpostModal, setEditpostModal] = useState(false);

    const user = store.getState().auth

    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseModal = () => {
        setEditpostModal(false);
    };

    async function deletePostData(post: any) {
        const deletedPost = await deletePost(post._id)
        PostEdits()
    }


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
                <ModalContent style={{ borderRadius: '20px' }} className="border w-96 border-gray-400 bg-slate-200 h-fit mt-28">
                    {(PostEdits) => (
                        <>
                            {open && <ChildModal handleClose={handleClose} singlePost={singlePost} />}
                            {editpostModal && <EditPost handleClose={handleCloseModal} singlePost={singlePost} />}
                            <ModalHeader className="flex items-center flex-col gap-1"> </ModalHeader>
                            <ModalBody className="">
                                {singlePost.userId === user?.user?._id ?
                                    <>
                                        <button onClick={() => deletePostData(singlePost)} className="text-red-600 ">Delete</button>
                                        <hr className="border-black" />
                                        <button onClick={() => setEditpostModal(true)} className="text-red-600">edit post</button>
                                        <hr className="border-black" />
                                    </>
                                    :
                                    <>
                                        <button onClick={() => setOpen(true)} className="text-red-600 ">report</button>
                                        <hr className="border-black" />
                                        <button className="text-red-600"> Unfollow</button>
                                        <hr className="border-black" />
                                    </>

                                }
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



function ChildModal({ handleClose, singlePost }: any) {

    const [otherInput, setOtherInput] = useState(false);
    const user = useSelector((state: RootState) => state.auth)

    async function handleReports(e: any, reportType?: string) {
        e.preventDefault();
        const value = e.target.others ? e.target.others.value : reportType
        if (value) {
            const postData = { postId: singlePost._id, userId: user.user?._id }
            const reportPost = await PostReports(value, postData)
            if (reportPost?.status === 200) {
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


function EditPost({ handleClose, singlePost }: any) {

    const [otherInput, setOtherInput] = useState(false);
    const [changedData,setChangedData] = useState()
    const videoRef = useRef<HTMLVideoElement>(null);

    function postContent(e: any) {
        setChangedData(e.target.value);
        console.log('text', changedData);
      }

    async function handleReports(postData:any,content:string) {
        console.log(postData,content)
        const changedPost = await editPostData(postData,content)
        if(changedPost){
            toast.success('Post edited Successfully')
            handleClose();
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
                <ModalContent className="border border-gray-400 bg-slate-200 rounded-md h-fit">
                    {(handleClose) => (
                        <>

                            <ModalHeader className="flex items-center flex-col "> Do you Really want to Edit this post? </ModalHeader>
                            <ModalBody className="gap-1">
                                <div>
                                    {singlePost?.Url[0]?.fileType === 'image' ? (
                                        <div className="w-fit h-[60%] flex justify-center">
                                            <img
                                                src={singlePost.Url[0].url}
                                                alt=""
                                                className="object-cover ml-10 h-96 w-full"
                                            />
                                           
                                        </div>
                                    ) : (
                                        <div className="w-full h-[70%] flex justify-center">
                                            <video ref={videoRef} src={singlePost.Url[0].url} className="object-cover h-full w-full" />
                                        </div>
                                    )}
                                    <textarea
                                        className="w-80 ml-8 mt-1"
                                        placeholder={singlePost.content}
                                        onChange={postContent}
                                        name="PostContent"
                                        id="PostContent"
                                        required
                                    />
                                </div>
                            </ModalBody >
                            <ModalFooter className='flex flex-col justify-center px-0 py-0'>
                                <Button className="bg-slate-500" onPress={() => handleReports(singlePost,changedData+'')}>
                                    Update
                                </Button>
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

