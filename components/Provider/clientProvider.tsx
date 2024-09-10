"use client";
import { createContext, ReactNode, useContext, useEffect, useState, Suspense } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
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
import { v4 as uuidv4 } from 'uuid';
import { ContentProps, User } from '@/type/users';
import dotenv from 'dotenv';
import LoadingPage from '../ui/loading';
dotenv.config();

export default function ClientProvider({ children }: { children: ReactNode }) {
  return (

    <Provider store={store}>
      <UserProvider>
        <Suspense fallback={<LoadingPage />}>
          <SocketProvider>
            <ZegoCloudProvider>
              {children}
            </ZegoCloudProvider>
          </SocketProvider>
        </Suspense>
      </UserProvider>
    </Provider>
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
  const [zp, setZP] = useState<any>();

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

      (async () => {
        const { ZegoUIKitPrebuilt } = await import('@zegocloud/zego-uikit-prebuilt')
        const { ZIM } = await import('zego-zim-web')
        const { ZegoExpressEngine } = await import('zego-express-engine-webrtc')

        const userID = user?.user?._id + '';
        const userName = user.user?.username;
        const appID = Number(process.env.NEXT_PUBLIC_ZEGOCLOUD_APP_ID);
        const serverSecret = process.env.NEXT_PUBLIC_ZEGOCLOUD_SECRET_ID + "";
        const roomId = uuidv4();
        const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, userID, userName);
        const zp = ZegoUIKitPrebuilt.create(TOKEN);
        zp.addPlugins({ ZIM });
        zp.setCallInvitationConfig({
          ringtoneConfig: {
            incomingCallUrl: 'https://res.cloudinary.com/dyh7c1wtm/video/upload/v1717999547/rrr_uixgh2.mp3',
            outgoingCallUrl: 'https://res.cloudinary.com/dyh7c1wtm/video/upload/v1718002692/beggin_edited_kgcew8.mp3'
          }
        })
        setZP(zp);
      })();

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
    <SocketContext.Provider value={{ socket, zp }}>
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




export const LiveContext = createContext<any>({
  zg: null,
  setZg: () => { }
});

export const useZego = () => useContext(LiveContext);

export const ZegoCloudProvider = ({ children }: ContentProps) => {
  const user = useSelector((state: RootState) => state.auth);
  const [zg, setZg] = useState<any>(null);
  const userData = user.user

  useEffect(() => {

    const initZego = async () => {
      if (userData && userData._id) {
        const appID = Number(process.env.NEXT_PUBLIC_ZEGOCLOUD_APP_ID);
        const server = process.env.NEXT_PUBLIC_ZEGOCLOUD_SECRET_ID + "";

        (async () => {
          const { ZegoExpressEngine } = await import('zego-express-engine-webrtc')
          const zgInstance = new ZegoExpressEngine(appID, server);
          if (zgInstance.setLogConfig) {
            zgInstance.setLogConfig({
              logLevel: 'disable'
            });
          } else {
            console.warn("setLogConfig is not available. Check the ZegoExpressEngine documentation for log configuration.");
          }

          setZg(zgInstance);


          zgInstance.on('roomStateUpdate', (roomID, state, errorCode, extendedData) => {
            if (state === 'DISCONNECTED') {
              alert("Disconnected");
            } else if (state === 'CONNECTING') {

            } else if (state === 'CONNECTED') {

            }
          });

          zgInstance.on('roomUserUpdate', (roomID, updateType, userList) => {
            console.warn(
              `roomUserUpdate: room ${roomID}, user ${updateType === 'ADD' ? 'added' : 'left'} `,
              JSON.stringify(userList),
            );
          });

          zgInstance.on('roomStreamUpdate', async (roomID, updateType, streamList, extendedData) => {
            if (updateType === 'ADD') {

            } else if (updateType === 'DELETE') {

            }
          });

        })();
      }
    };

    initZego();
  }, [userData]);




  const liveContextValue: any = { zg, setZg };


  return (
    <LiveContext.Provider value={liveContextValue}>
      {children}
    </LiveContext.Provider>
  );
};

