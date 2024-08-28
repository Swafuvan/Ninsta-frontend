"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Provider as ReduxProvider, useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '@/redux/store';
import { FriendSuggession, messageNotification, UserfindById, UserState } from '@/lib/functions/user/route';
import { setUser } from '@/redux/userSlice';
import { useRouter } from 'next/navigation';
import { adminDetails } from '@/lib/functions/admin/route';
import { NextUIProvider } from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import { io } from 'socket.io-client';
import { toast, ToastOptions } from 'react-toastify';
import moment from 'moment';
import { ZegoExpressEngine } from 'zego-express-engine-webrtc';
import { v4 as uuidv4 } from 'uuid';
import { ContentProps, User } from '@/type/users';
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import dotenv from 'dotenv';
dotenv.config();


export default function ClientProvider({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <UserProvider>
        <SocketProvider>
          
            {children}
         
        </SocketProvider>
      </UserProvider>
    </ReduxProvider>
  );
}

function UserProvider({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const locationPath = usePathname();

  useEffect(() => {
    if (locationPath?.includes('/admin')) {
      adminDetails().then((admin) => {
        if (admin) {
          if (!admin?.data) {
            router.push('/admin/login');
          } else {
            dispatch(setUser(admin.data));
          }
        } else {
          router.push('/admin/login');
        }
      });
    } else {
      UserState().then((user) => {
        console.log(user)
        if (user) {
          dispatch(setUser(user.userData));
        } else {
          router.push('/Login');
        }
      });
    }
  }, []);

  return <>{children}</>;
}

const SocketContext = createContext<any>(null);

function SocketProvider({ children }: { children: ReactNode }) {
  const user = useSelector((state: RootState) => state.auth);
  const [socket, setSocket] = useState<any>(null);

  const Close = (toastId: React.ReactText) => {
    toast.dismiss(toastId);
  };

  const toastOptions: ToastOptions = {
    autoClose: 2000,
    closeButton: true,
  };

  useEffect(() => {
    const newSocket: any = io(process.env.Socket_URL || 'http://localhost:5000');
    setSocket(newSocket);
    if (user && user.user) {
      newSocket.emit('join', user.user?._id);

    }

    newSocket.on('send_message', (data: any) => {
      const toastId = toast(
        <Notification notification={data} Close={() => Close(toastId)} />,
        toastOptions
      );
    });

    return () => {
      newSocket.emit("disconnectUsers", user.user?._id)
      newSocket.close();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);

const Notification = ({ notification, Close }: { notification: any, Close: () => void }) => {

  const [state, setState] = useState(false);
  const [userData, setUserData] = useState<User>();

  useEffect(() => {
    setTimeout(() => { setState(true) }, 3000)
  }, [])

  useEffect(() => {
    if (notification.to) {
      UserfindById(notification.to).then((response) => {
        setUserData(response.userDetail)
      })
    }
  }, []);

  if (state) { return <></> }

  return (
    <div className="flex absolute z-50 lg:left-[530px] md:left-[150px] justify-center w-full top-10 items-center p-4 bg-white rounded-lg shadow-xl mx-auto max-w-sm m-10">
      <span
        onClick={() => setState(true)}
        className="text-xs cursor-pointer font-bold uppercase px-2 mt-2 mr-2 text-white bg-black border rounded-full absolute top-0 right-0"
      >
        X
      </span>
      <span className="text-xs font-bold uppercase px-2 mt-2 mr-2 text-green-900 bg-green-400 border rounded-full absolute top-3.5 right-8">
        New
      </span>
      <span className="text-xs font-semibold uppercase m-1 py-1 mr-3 text-gray-500 absolute bottom-0 right-0">
        {moment(notification.time).fromNow()}
      </span>

      <img onClick={() => window.location.href = '/messages?userId=' + notification.from}
        className="h-12 w-12 rounded-full"
        alt="John Doe's avatar"
        src={userData?.image + ''}
      />

      <div className="ml-5" onClick={() => window.location.href = '/messages'}>
        <h5 className="text-lg font-semibold leading-tight text-gray-900">
          You have a new message!
        </h5>
        <p className="text-sm text-gray-600">{notification?.message}</p>
      </div>
    </div>
  );
};




