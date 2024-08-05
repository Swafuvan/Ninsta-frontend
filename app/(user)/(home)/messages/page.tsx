'use client'
import { AllUserData } from '@/lib/functions/user/route';
import MessagePage from '@/pages/user/messagePage';
import { RootState } from '@/redux/store';
import { User } from '@/type/users';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface message {
    message: String;
    from: String;
    to: String;
    time: String;
    seen: Boolean;
    type: String
}
function MessagesPage() {
    const [allMessages, setAllMessages] = useState<message[]>([]);
    const [Users, setUsers] = useState<User[]>([]);
    const [messageSide, setMessageSide] = useState<User | null>(null)
    const user = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        if(user && user.user?._id){
            const UserData = AllUserData(user.user?._id).then((data) => {
                console.log(data.UserDetails);
                setUsers(data.UserDetails);
            })
        }
    }, [user])

    const toggleMessageSide = () => {
        setMessageSide(null);
    };

    return (
        <div className="bg-gray-50 h-screen w-full">
            <div className="bg-white border border-gray-200 rounded flex h-full ">
                {/* Left Panel */}
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-full flex flex-col">
                    {/* Account */}
                    <div className="border-b border-gray-200 p-3 relative">
                        <button className="flex items-center mx-auto select-none font-semibold focus:outline-none">
                            {user.user?.username}
                            <svg className="ml-1 transform rotate-180 translate-y-0.5" height="20" viewBox="0 0 48 48" width="20">
                                <path d="M40 33.5c-.4 0-.8-.1-1.1-.4L24 18.1l-14.9 15c-.6.6-1.5.6-2.1 0s-.6-1.5 0-2.1l16-16c.6-.6 1.5-.6 2.1 0l16 16c.6.6.6 1.5 0 2.1-.3.3-.7.4-1.1.4z"></path>
                            </svg>
                        </button>
                        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none">
                            <svg height="20" viewBox="0 0 44 44" width="20">
                                <path d="M33.7 44.12H8.5a8.41 8.41 0 01-8.5-8.5v-25.2a8.41 8.41 0 018.5-8.5H23a1.5 1.5 0 010 3H8.5a5.45 5.45 0 00-5.5 5.5v25.2a5.45 5.45 0 005.5 5.5h25.2a5.45 5.45 0 005.5-5.5v-14.5a1.5 1.5 0 013 0v14.5a8.41 8.41 0 01-8.5 8.5z"></path>
                                <path d="M17.5 34.82h-6.7a1.5 1.5 0 01-1.5-1.5v-6.7a1.5 1.5 0 01.44-1.06L34.1 1.26a4.45 4.45 0 016.22 0l2.5 2.5a4.45 4.45 0 010 6.22l-24.3 24.4a1.5 1.5 0 01-1.02.44zm-5.2-3h4.58l23.86-24a1.45 1.45 0 000-2l-2.5-2.5a1.45 1.45 0 00-2 0l-24 23.86z"></path>
                                <path d="M38.2 14.02a1.51 1.51 0 01-1.1-.44l-6.56-6.56a1.5 1.5 0 012.12-2.12l6.6 6.6a1.49 1.49 0 010 2.12 1.51 1.51 0 01-1.06.4z"></path>
                            </svg>
                        </button>
                    </div>
                    {/* Group */}
                    <div className="flex items-center justify-between text-sm border-b border-gray-200">
                        <div className="p-3 font-semibold text-black select-none h-full focus:outline-none border-b border-transparent">
                            Messages
                        </div>

                    </div>
                    {/* Chats */}
                    <ul className="py-1 overflow-auto  flex-grow">
                        {Users?.length > 0 && Users.map((data, index) => {
                            return (
                                <li key={index} onClick={() => setMessageSide(data)}>
                                    <button className="flex items-center w-full px-4 py-2 select-none hover:bg-gray-100 focus:outline-none">
                                        <img className="w-12 mr-3 rounded-full border" src={data.image + ''} alt="Junior Coders" />
                                        <div className="transform translate-y-0.5 text-left">
                                            <h3 className="leading-4">{data.username}</h3>
                                            <span className="text-xs text-gray-500">Active 20s ago</span>
                                        </div>
                                    </button>
                                </li>
                            )
                        })}

                    </ul>
                </div>

                    
                { !messageSide ?
                        <div className="hidden sm:w-1/2 md:w-2/3 lg:w-3/4 z-50 border-l border-gray-200 sm:flex items-center justify-center text-center overflow-hidden">
                            <div className="space-y-5">
                                <div className="border border-black rounded-full inline-flex p-5 items-center justify-center">
                                    <svg className="transform translate-y-1" height="52" viewBox="0 0 48 48" width="52">
                                        <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l13.2 13c.5.4 1.1.6 1.7.3l16.6-8c.7-.3 1.6-.1 2 .5.4.7.2 1.6-.5 2l-15.6 9.9c-.5.3-.8 1-.7 1.6l4.6 19c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.5-.5.5-1.1.2-1.6z"></path>
                                    </svg>
                                </div>
                                <div className="space-y-0.5">
                                    <h1 className="font-semibold text-xl">Your Messages</h1>
                                    <p className="text-gray-600 min-w-46">Send private photos and messages to a friend or group</p>
                                </div>
                                <button className="bg-blue-500 py-1 px-3 rounded text-white select-none focus:outline-none">Send Message</button>
                            </div>
                        </div> 
                        :
                         <MessagePage userDetails={messageSide} />
                    }
            </div>
        </div>
    );
}

export default MessagesPage;

