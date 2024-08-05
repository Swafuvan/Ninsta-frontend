import { useSocket } from '@/components/Provider/clientProvider';
import { userChats } from '@/lib/functions/user/route';
import { RootState } from '@/redux/store';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

interface message {
    message: String;
    from: String;
    to: String;
    time: String;
    seen: Boolean;
    File: {
        fileType: String,
        Link: String
    }
}

function MessagePage({ userDetails }: any) {
    const [message, setMessage] = useState('');
    const [allMessages, setAllMessages] = useState<message[]>([]);
    const user = useSelector((state: RootState) => state.auth);
    // const [socket, setSocket] = useState<any>()
    const { socket } = useSocket()

    useEffect(() => {
        if (socket) {
            const handleMessage = (newMessage: message) => {
                setAllMessages(prevMessages => [...prevMessages, newMessage]);
            };
            socket.on('send_message', handleMessage);
            return () => socket.off('send_message', handleMessage);
        }
    }, [socket]);

    useEffect(() => {
        if (user.user?._id, userDetails._id) {
            userChats(userDetails._id, user.user?._id + '').then((Chats) => {
                console.log(Chats);
                setAllMessages(Chats.UserChatRes);
            })
        }

    }, [user.user?._id, userDetails._id])

    const sendMessage = (e: any) => {
        e.preventDefault()
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
            console.log(newMessage)
            socket.emit('send_message', newMessage);
            setAllMessages(prevMessages => [...prevMessages, newMessage]);
            setMessage('');
        }
    };

    return (
        <div className="hidden lg:col-span-2 h-screen lg:block sm:w-1/2 overflow-hidden md:w-2/3 lg:w-3/4">
            <div className="w-full ">
                <div className="relative flex items-center p-3 border-b border-gray-300">
                    <img className="object-cover w-10 h-10 rounded-full"
                        src={userDetails.image} alt="username" />
                    <span className="block ml-2 font-bold text-gray-600">{userDetails.username}</span>
                    <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3">
                    </span>
                </div>

                <div className="flex flex-col flex-grow w-full p-2 h-[79vh] max-w-auto bg-white rounded-lg overflow-y-scroll">
                    {allMessages.map((mesg) => {
                        return (
                            <div className={mesg.to === user.user?._id ? "flex w-full mt-2 space-x-3 max-w-xs " : "flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end "} >
                                <div className={mesg.to === user.user?._id ? "flex-shrink-0 h-10 w-10 rounded-full bg-gray-300" : ""} ></div>
                                <div>
                                    <div className={mesg.to === user.user?._id ? 'bg-gray-300 p-2 rounded-bl-lg rounded-full' : 'bg-blue-600 text-white p-2 rounded-full rounded-br-lg '}>
                                        <p className="text-sm">{mesg.message}</p>
                                        {
                                        // <img src={} alt="" />
                                        }
                                    </div>
                                    <span className="text-xs text-gray-500 leading-none">{mesg.time}</span>
                                </div>
                                {mesg.to !== user.user?._id ? <img className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300" src={userDetails.image} /> : ''}
                            </div>
                        )
                    })}

                    <div className="flex items-center pl-5 w-8/12 fixed bottom-0 justify-between pt-3 pb-3 border-t border-gray-300">
                        <form className='flex w-full' onSubmit={(e: any) => sendMessage(e)}>
                            <input type="text" placeholder="Message"
                                className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                                name="message" required value={message} onChange={(e) => setMessage(e.target.value)} />

                            <button type="submit" onClick={sendMessage}>
                                <svg className="w-5 h-5  text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                </svg>
                            </button>
                        </form>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default MessagePage
