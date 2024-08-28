// import { RootState } from "@/redux/store";
// import { ContentProps } from "@/type/users";
// import { createContext, useContext, useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { ZegoExpressEngine } from "zego-express-engine-webrtc";

// export const LiveContext = createContext<any>({
//     zg: null,
//     setZg: () => { }
//   });
  
//   export const useZego = () => useContext(LiveContext);
  
// export const ZegoCloudProvider = ({ children }: ContentProps) => {
//     const user = useSelector((state: RootState) => state.auth);
//     const [zg, setZg] = useState<any>(null);
//     const userData = user.user
  
//     useEffect(() => {
//       console.log(userData, "this is the user");
  
//       const initZego = async () => {
//         if (userData && userData._id) {
//           const appID = Number(process.env.NEXT_PUBLIC_ZEGOCLOUD_APP_ID);
//           const server = process.env.NEXT_PUBLIC_ZEGOCLOUD_SECRET_ID + "";
  
  
//           const zgInstance = new ZegoExpressEngine(appID, server);
  
  
//           if (zgInstance.setLogConfig) {
//             zgInstance.setLogConfig({
//               logLevel: 'disable'
//             });
//           } else {
//             console.warn("setLogConfig is not available. Check the ZegoExpressEngine documentation for log configuration.");
//           }
  
//           setZg(zgInstance);
  
  
//           zgInstance.on('roomStateUpdate', (roomID, state, errorCode, extendedData) => {
//             if (state === 'DISCONNECTED') {
//               alert("Disconnected");
//             } else if (state === 'CONNECTING') {
  
//             } else if (state === 'CONNECTED') {
  
//             }
//           });
  
//           zgInstance.on('roomUserUpdate', (roomID, updateType, userList) => {
//             console.warn(
//               `roomUserUpdate: room ${roomID}, user ${updateType === 'ADD' ? 'added' : 'left'} `,
//               JSON.stringify(userList),
//             );
//           });
  
//           zgInstance.on('roomStreamUpdate', async (roomID, updateType, streamList, extendedData) => {
//             if (updateType === 'ADD') {
  
//             } else if (updateType === 'DELETE') {
  
//             }
//           });
//         }
//       };
  
//       initZego();
//     }, [userData]);
  
  
//     const liveContextValue: any = { zg, setZg };
  
  
//     return (
//       <LiveContext.Provider value={liveContextValue}>
//         {children}
//       </LiveContext.Provider>
//     );
//   };
  
  