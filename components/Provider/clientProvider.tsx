'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Provider as ReduxProvider, useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '@/redux/store';
import { UserState } from '@/lib/functions/user/route';
import { setUser } from '@/redux/userSlice';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { adminDetails } from '@/lib/functions/admin/route';
import { NextUIProvider } from '@nextui-org/react'
import { UseDispatch } from 'react-redux';
import { usePathname } from 'next/navigation';
import { io } from 'socket.io-client';

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

  useEffect(() => {
    const newSocket: any = io("http://localhost:5000");
    setSocket(newSocket);
    if (user && user.user) {
      newSocket.emit('join', user.user?._id);
    }
    // newSocket.on('message', (data: any) => alert(data.message))

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
