"use client";

import { useSocket } from '@/components/Provider/clientProvider';
import { userChats } from '@/lib/functions/user/route';
import { FaPhone, FaVideo } from 'react-icons/fa';
import { RootState } from '@/redux/store';
import dynamic from 'next/dynamic'
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { BiCheckDouble } from "react-icons/bi";
import toast from 'react-hot-toast';
import moment from 'moment';
import { User } from '@/type/users';


interface message {
    _id?: string;
    message: string;
    from: string;
    to: string;
    time: string;
    seen: Boolean;
    File: {
        fileType: string,
        Link: string
    }
}

function MessagePage({ userDetails, filter }: any) {
    const [message, setMessage] = useState('');
    const [allMessages, setAllMessages] = useState<message[]>([]);
    const user = useSelector((state: RootState) => state.auth);
    const chatRef = useRef<any>();
    const { socket, zp } = useSocket();
    // const [zp, setZP] = useState<any>();



    const handleMessage = (newMessage: message) => {
        if (newMessage.to === user.user?._id) {
            newMessage.seen = true;
            setAllMessages((prevMessages) => [...prevMessages, newMessage]);
            socket.emit('messages_seen', { to: userDetails._id, from: user.user._id });
        }
    };

    useEffect(() => {
        if (socket && user.user) {
            socket.on('send_message', handleMessage);
            socket.on('messages_seen', handleSeenConfirmation);
            return () => socket.off();
        }
    }, [socket, user.user]);

    useEffect(() => {
        if (user.user?._id && userDetails._id) {
            userChats(userDetails._id, user.user?._id + '').then((Chats) => {
                setAllMessages(Chats.UserChatRes);
            });
        }
    }, [user.user?._id, userDetails]);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [allMessages]);

    const handleSeenConfirmation = ({ messageIds }: { from: string; to: string; messageIds: string[] }) => {
        setAllMessages((prevs) => {
            prevs.forEach((prev) => {
                if (!prev.seen) return { ...prev, seen: true };
                else return prev;
            });
            return prevs;
        });
    };

    const sendMessage = (e: any) => {
        e.preventDefault();
        if (message.trim() !== '') {
            const newMessage: message = {
                message,
                from: user.user?._id + '',
                to: userDetails._id + '',
                time: new Date().toISOString(),
                seen: false,
                File: {
                    fileType: 'text',
                    Link: ''
                }
            };
            const userBlockedRecipient = user.user?.blockedUsers.includes(newMessage.to + '');
            const recipientBlockedUser = userDetails.blockedUsers.includes(newMessage.from);

            if (!userBlockedRecipient && !recipientBlockedUser) {
                setAllMessages([...allMessages, newMessage]);
                socket.emit('send_message', newMessage);
            } else {
                toast.error('Sorry You Blocked , you cannot send a message to this user.');
            }
            setMessage('');
        }
    };

    async function AudioCallingUser(userData: User) {
        const { ZegoUIKitPrebuilt } = await import(
            '@zegocloud/zego-uikit-prebuilt'
        )

        const targetUser = {
            userID: userData._id,
            userName: userData.username,
            image: userData.image,
        };

        if (targetUser.userID && targetUser.userName && targetUser.image) {
            const data = {
                callees: [targetUser],
                callType: ZegoUIKitPrebuilt.InvitationTypeVoiceCall,
                timeout: 60,
            };
            zp.sendCallInvitation(data)
        } else {
            console.error("Invalid target user data");
        }
    }

    const invite = async (userData: User) => {
        const { ZegoUIKitPrebuilt } = await import(
            '@zegocloud/zego-uikit-prebuilt'
        )

        const targetUser = {
            userID: userData._id,
            userName: userData.username,
            image: userData.image,
        };

        if (targetUser.userID && targetUser.userName && targetUser.image) {
            const data = {
                callees: [targetUser],
                callType: ZegoUIKitPrebuilt.InvitationTypeVideoCall,
                timeout: 60,

            };
            zp.sendCallInvitation(data)
        } else {
            console.error("Invalid target user data");
        }
    }

    return (
        <div className="lg:col-span-2 h-screen w-full sm:w-full overflow-hidden md:w-2/3 lg:w-3/4">
            <div className="w-full " id='Calling'>
                <div className="relative flex items-center p-3 border-b border-gray-300">
                    <div className='flex flex-row w-full'>
                        <img className="object-cover w-10 h-10 rounded-full" src={userDetails.image} alt="username" />
                        <span className="block ml-2 font-bold text-gray-600">{userDetails.username}</span>
                        <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
                        <div className='flex w-full justify-end'>
                            <FaPhone className='mr-3  mt-2 cursor-pointer' onClick={() => AudioCallingUser(userDetails)} />
                            <FaVideo className='mr-2 mt-2 cursor-pointer' onClick={() => invite(userDetails)} />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col flex-grow w-full p-2 h-[79vh] max-w-auto bg-white rounded-lg overflow-y-scroll" ref={chatRef}>
                    {allMessages?.length > 0 && allMessages?.map((mesg, index) => {
                        return (
                            <div key={index} className={mesg.to === user.user?._id ? "flex w-full mt-2 space-x-3 max-w-xs " : "flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end "} >
                                <div className={mesg.to === user.user?._id ? "flex-shrink-0 h-10 w-10 rounded-full bg-gray-300" : ""} ></div>
                                <div>
                                    <div className={mesg.to === user.user?._id ? 'bg-gray-300 p-2 rounded-bl-lg rounded-full' : 'bg-blue-600 text-white p-2 rounded-full rounded-br-lg '}>
                                        {mesg.File && mesg.File.fileType === 'image' ? (
                                            <img src={mesg.File.Link} alt="Sent Image" className="max-w-xs rounded-lg" />
                                        ) : mesg.File && mesg.File.fileType === 'audio' ? (
                                            <audio controls className="w-full">
                                                <source src={mesg.File.Link} type="audio/mp3" />
                                                Your browser does not support the audio element.
                                            </audio>
                                        ) : (
                                            <p className="text-sm">{mesg.message}</p>
                                        )}
                                    </div>
                                    <div className='flex justify-end w-40 '>
                                        <span className="text-xs flex text-gray-500 leading-none ">{moment(mesg.time + '').fromNow()}</span>
                                        <span className={mesg.to === user.user?._id ? "hidden" : "flex space-x-1 max-w-xs justify-end"}><BiCheckDouble color={mesg.seen === true ? 'blue' : 'black'} /></span>
                                    </div>
                                </div>
                                {mesg.to !== user.user?._id && (
                                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
                                        <img className="object-cover w-10 h-10 rounded-full" src={user?.user?.image + ""} alt="username" />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <form onSubmit={sendMessage} className="flex items-center justify-between w-full p-3 border-t border-gray-300">
                    <input
                        type="text"
                        placeholder="Message"
                        className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                        name="message"
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type="submit">
                        <svg className="w-5 h-5 text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.94 17.83l14.14-6.83a1 1 0 000-1.8L2.94 2.37a1 1 0 00-1.39 1.18l1.46 5.1c.1.35.38.63.74.74l5.1 1.46a1 1 0 010 1.9l-5.1 1.46a1 1 0 00-.74.74l-1.46 5.1a1 1 0 001.39 1.18z" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default MessagePage;
