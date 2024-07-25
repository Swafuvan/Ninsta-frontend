'use client';

import { ReactNode, useEffect } from 'react';
import { Provider as ReduxProvider, useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '@/redux/store';
import { UserState } from '@/lib/functions/user/route';
import { setUser } from '@/redux/userSlice';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { adminDetails } from '@/lib/functions/admin/route';
import { NextUIProvider } from '@nextui-org/react'

import { usePathname } from 'next/navigation';
import useSocket from '@/helpers/socketIO';

export default function ClientProvider({ children }: { children: ReactNode }) {
  const { socket } = useSocket();


  return (
    <ReduxProvider store={store}>
      <UserProvider>
        {children}
      </UserProvider>
    </ReduxProvider>
  )
}

function UserProvider({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const locationPath = usePathname()
  const { socket } = useSocket()

  const user = useSelector((state: RootState) => state.auth);


  useEffect(() => {
    console.log(locationPath)
    if (socket) {
      alert("aa socket vannu")
      socket.emit('join', user.user?._id);
    }

    if (locationPath?.includes('/admin')) {
      adminDetails().then((admin) => {
        if (admin) {
          dispatch(setUser(admin.adminData))
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

