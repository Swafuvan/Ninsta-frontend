"use client"
import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { CommentLike, CommentPost, CommentReplies, comments } from '@/lib/functions/Posts/route';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useSelector } from 'react-redux';
import useAppSelector, { RootState, store } from '@/redux/store';
import { UserfindById } from '@/lib/functions/user/route';
import LoadingPage from '@/components/ui/loading';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-root': {
        maxWidth: '650px',
        maxHeight: '600px',
    },
}));

export default function CommentsPage({ handleClickOpen, singlePost }: any) {

    const [comment, setComment] = useState('');
    const [reply, setReply] = useState('');
    const [commentData, setCommentData] = useState<any[]>([])
    const [clickedReply, setClickedReply] = useState<number[]>([])
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const user = store.getState().auth
    

    const emojiPickerRef = useRef<HTMLDivElement>(null);
    
    const handleEmojiSelect = (emoji: any) => {
        setComment(comment + emoji.native);
    };
    
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
                setShowEmojiPicker(false)
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    useEffect(() => {
        if (singlePost) {
            console.log(singlePost)
            const commentdetails = comments(singlePost?._id).then(async (data) => {
                for (const val of data.Comments) {
                    val.replies = await Promise.all(val.replies.map(async (item: any) => ({
                        ...item, ...await UserfindById(item.userId + "")
                    })))
                }
                // console.log(singlePost)
                setCommentData(data.Comments)
            })
        }
    }, [])
    
   

    async function uploadReply(data: any) {

        console.log(data, reply)
        const ReplyDetails = await CommentReplies(data, user.user?._id + '', reply)
        if (ReplyDetails) {
            console.log(ReplyDetails)
            ReplyDetails.CommentRes.replies = await Promise.all(ReplyDetails.CommentRes.replies.map(async (item: any) => ({
                ...item, ...await UserfindById(item.userId + "")
            })))
            console.log(ReplyDetails.CommentRes.replies);
            setCommentData((prev) =>
                prev.map((comment) =>
                    comment._id === ReplyDetails.CommentRes._id
                        ? { ...comment, replies: ReplyDetails.CommentRes.replies }
                        : comment
                )
            );
            setReply('');
        }
    }

    const toggleReply = (index: number) => {
        setClickedReply(clickedReply.includes(index) ?
            (arr => arr.filter(item => item !== index)) :
            [...clickedReply, index]
        )
    }

    const CommentPosted = async (e: any) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const comment = formData.get('comment');
        const CommentResult = await CommentPost(singlePost, comment, user.user?._id)
        if (CommentResult) {
            console.log(CommentResult?.data);
            CommentResult.data.CommentDetails.userId = user.user
        }
        setComment('');
        setCommentData([...commentData, CommentResult?.data?.CommentDetails])
    }

    async function commentLikes(comment: any, index: number) {
        console.log(comment, user.user?._id)
        const CommentLikes = await CommentLike(comment, user.user?._id + '');
        if (commentData[index].likes.includes(user.user?._id?.toString())) {
            commentData[index].likes = commentData[index].likes.filter((like: any) => like !== user.user?._id?.toString())
        } else {
            commentData[index].likes.push(user.user?._id?.toString())
        }
        setCommentData([...commentData])
    }

    return (
        <>
            <BootstrapDialog
                onClose={handleClickOpen}
                aria-labelledby="customized-dialog-title"
                open={true}
            >
                <DialogTitle sx={{ m: 0, p: 3 }} id="customized-dialog-title">

                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClickOpen}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers >
                    <div className='flex flex-row w-full'>
                        <div className='flex flex-col w-full'>

                            {singlePost?.Url[0]?.fileType === 'video' ? (
                                <video controls className='w-full h-[350px] object-cover'>
                                    <source src={singlePost?.Url[0]?.url} className='w-full h-[350px]' type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <img className='w-full h-[350px]' src={singlePost?.Url[0]?.url} alt="post" />
                            )}
                        </div>
                        <div className='flex flex-col w-full'>
                            {commentData && commentData?.length > 0 ?
                                commentData?.map((data: any, inx: number) => {
                                    return (
                                        <li key={inx} className="ml-2 mb-1 list-none" >
                                            <div className="flex items-center space-x-3">
                                                <div className="flex-shrink-0">
                                                    <img className="w-9 h-9 rounded-full" src={data?.userId?.image} alt="image" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-semibold text-gray-900 truncate dark:text-white">
                                                        {data?.userId?.username}
                                                    </p>
                                                    <p className="text-xs text-gray-500 truncate dark:text-gray-400 w-60 h-fit">
                                                        {data?.comment}
                                                    </p>
                                                    <p onClick={() => toggleReply(inx)} className="cursor-pointer text-xs text-gray-500 truncate dark:text-gray-400"><span className="text-xs">{(data?.replies?.length || "0") + " reply"}</span></p>
                                                </div>

                                                <div className="flex ">
                                                    <span className='text-xs '>{data?.likes?.length} </span>
                                                    {data?.likes?.includes(user.user?._id + "") ?
                                                        <svg onClick={() => commentLikes(data, inx)} className='cursor-pointer mt-0.5' aria-label="Unlike" fill="#262626" height="12" role="img" viewBox="0 0 48 48" width="12"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                                                        :
                                                        <svg onClick={() => commentLikes(data, inx)} className='cursor-pointer mt-0.5' aria-label="Like" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
                                                    }


                                                </div>
                                            </div>

                                            {clickedReply.includes(inx) && <>
                                                <div className="ml-9">
                                                    <form action="#" onSubmit={(e) => { e.preventDefault(); uploadReply(data._id) }} className='w-full'>
                                                        <label htmlFor="chat" className="sr-only">Your message</label>
                                                        <div className="flex items-center px-3 py-2 rounded-lg"  >
                                                            <button type="button" className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z" />
                                                                </svg>
                                                                <span className="sr-only">Add emoji</span>
                                                            </button>
                                                            <input type="text" onChange={(e) => setReply(e.target.value)} placeholder="Your comments here...." id="floating_email" className="ml-2 block py-1 px-0 w-full text-sm text-white-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-graye dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />

                                                            <button type="submit" className="inline-flex ml-4 justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                                                                <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                                                    <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                                                                </svg>
                                                            </button>

                                                        </div>
                                                    </form>
                                                    {data.replies && data.replies.map((item: any, ind: number) => {
                                                        return (
                                                            <div key={ind} className="flex mt-2 items-center space-x-3 rtl:space-x-reverse">
                                                                <div className="flex-shrink-0">
                                                                    <img className="w-9 h-9 rounded-full" src={item?.userDetail?.image} alt="Neil image" />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-sm font-semibold text-gray-900 truncate dark:text-white">
                                                                        {item?.userDetail?.username}
                                                                    </p>
                                                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                                        {item?.reply}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </>}

                                        </li>
                                    )
                                }) :
                                <Typography gutterBottom className='text-lg text-center text-pretty text-black'>
                                    No comments found. Be the first to comment! {singlePost?.userDetails?.username} has posted: {singlePost?.content}
                                </Typography>
                            }

                            <div className='flex h-10 overflow-hidden bottom-24 justify-evenly border mt-auto ml-1 border-black rounded-lg'>
                                <svg
                                    aria-label="Emoji"
                                    className='w-11 h-11 ml-1 mt-2 cursor-pointer'
                                    fill="currentColor"
                                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                >
                                    <path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path>
                                </svg>
                                <form className='pt-1 pb-2 w-full h-12' onSubmit={(e) => CommentPosted(e)}>
                                    <input type='text' name='comment' onChange={(e) => setComment(e.target.value)} value={comment} id='comment' className='pt-1 pb-3 border-none outline-none w-full' placeholder='Write a comment...' />
                                </form>
                            </div>

                        </div>
                    </div>
                    <div ref={emojiPickerRef} className="absolute top-0 left-0 z-50 ">
                        {showEmojiPicker && <Picker data={data} onEmojiSelect={handleEmojiSelect} />}
                    </div>
                </DialogContent>

            </BootstrapDialog>

        </>

    );
}

