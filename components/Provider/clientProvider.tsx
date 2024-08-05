'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Provider as ReduxProvider, useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '@/redux/store';
import { FriendSuggession, UserState } from '@/lib/functions/user/route';
import { setUser } from '@/redux/userSlice';
import { useRouter } from 'next/navigation';
import { adminDetails } from '@/lib/functions/admin/route';
import { NextUIProvider } from '@nextui-org/react'
import { UseDispatch } from 'react-redux';
import { usePathname } from 'next/navigation';
import { io } from 'socket.io-client';
import { toast,ToastOptions } from 'react-toastify';
import dotenv from 'dotenv'
dotenv.config()

export default function ClientProvider({ children }: { children: ReactNode }) {


  return (
    <ReduxProvider store={store}>
      <UserProvider>
        <SocketProvider>
          {children}
        </SocketProvider>
      </UserProvider>
    </ReduxProvider>
  )
}

function UserProvider({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const locationPath = usePathname()


  useEffect(() => {

    if (locationPath?.includes('/admin')) {
      adminDetails().then((admin) => {
        if (admin) {
          // console.log(admin)
          if (!admin?.data) {
            // console.log(admin.data,)
            router.push('/admin/login')
          } else {
            dispatch(setUser(admin.data))
          }
        } else {
          router.push('/admin/login')
        }
      })
    } else {

      UserState().then((user) => {
        if (user) {
          dispatch(setUser(user.userData))
        } else {
          router.push('/Login')
        }
      })
    }

  }, []);

  return (
    <>{children}</>
  )
}

const SocketContext = createContext<any>(null);


function SocketProvider({ children }: { children: ReactNode }) {
  const user = useSelector((state: RootState) => state.auth);
  const [socket, setSocket] = useState<any>(null)
  const Close = () => toast.dismiss()
  const toastOptions : ToastOptions = {
    autoClose:2000,
    closeButton: true
  }
  useEffect(() => {
    const newSocket: any = io(process.env.Socket_URL || 'http://localhost:5000');
    setSocket(newSocket);
    if (user && user.user) {
      newSocket.emit('join', user.user?._id);
    }
    // newSocket.on('message', (data: any) => alert(data.message))
    newSocket.on('send_message', (data: any) => {
      toast( <Notification notification={data} Close={Close} />, toastOptions );
    });
 
    return () => {
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


const Notification = ({notification,Close}:any) => {
  
  // useEffect(()=>{
    
  // },[]);
  return (
    <div className="flex absolute z-50 left-[530px] w-full top-2 items-center p-4 bg-white rounded-lg shadow-xl mx-auto max-w-sm m-10">
      <span onClick={Close} className="text-xs font-bold uppercase px-2 mt-2 mr-2 text-white bg-black border rounded-full absolute top-0 right-0">X</span>
      <span className="text-xs font-bold uppercase px-2 mt-2 mr-2 text-green-900 bg-green-400 border rounded-full absolute top-3.5 right-8">New</span>
      <span className="text-xs font-semibold uppercase m-1 py-1 mr-3 text-gray-500 absolute bottom-0 right-0">{notification.time.toString()}</span>

      <img className="h-12 w-12 rounded-full" alt="John Doe's avatar"
        src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&faces=1&faceindex=1&facepad=2.5&w=500&h=500&q=80" />

      <div className="ml-5">
        <h5 className="text-lg font-semibold leading-tight text-gray-900">You have a new message!</h5>
        <p className="text-sm text-gray-600">{notification?.message}</p>
      </div>
    </div>
  )
}