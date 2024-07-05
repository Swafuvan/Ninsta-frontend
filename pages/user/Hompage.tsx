'use client'
import { userHome } from '@/lib/functions/user/route';
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '@/redux/userSlice';
import { RootState } from '@/redux/store';
// import { useRouter } from 'next/router';

function HomePage() {
  // const router = useRouter();
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log(user, user?.email)
        const { users } = await userHome(user?.email)
        console.log(users)
        dispatch(setUser(users));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    fetchUserData()
  }, [dispatch])
  return (
    <div className='grid grid-cols-2 justify-center'>
      {/* Left side (Stories and Posts) */}
      <div className="w-full">
        <div className="max-w-full p-5">
          <ul className="flex space-x-4">
            <li className="flex flex-col items-center space-y-1 ">
              <div className="relative bg-gradient-to-tr from-yellow-400 to-purple-600 p-1 rounded-full">
                <a href="#" className="block bg-white p-1 rounded-full transform transition hover:-rotate-6">
                  <img className="w-12 h-12 rounded-full" src="https://imgs.search.brave.com/LSn-5m_B0-XDHU5SR565WtE8Cw_Oa5q7EJHhdxFmPqU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9mcmllbmRzLWVu/Z2FnZWQtZ3JvdXAt/ZXhlcmNpc2UtdGhl/aXItY29tbWl0bWVu/dC1oZWFsdGgtd2Vs/bGJlaW5nLXNoaW5p/bmctdGhyb3VnaF83/NDE5MTAtNDQ4MzMu/anBnP3NpemU9NjI2/JmV4dD1qcGc" alt="cute kitty" />
                </a>
                <button className="absolute bg-blue-500 text-white text-2xl font-medium w-6 h-6 rounded-full bottom-0 right-1 border-4 border-white flex justify-center items-center font-mono hover:bg-blue-700 focus:outline-none">
                  <div className="transform -translate-y-px">+</div>
                </button>
              </div>
              <a href="#">{user.user?.username}</a>
            </li>

            <li className="flex flex-col items-center space-y-1 ">
              <div className="bg-gradient-to-tr from-yellow-400 to-purple-600 p-1 rounded-full">
                <a href="#" className="block bg-white p-1 rounded-full transform transition hover:-rotate-6">
                  <img className="w-12 h-12 rounded-full" src="https://imgs.search.brave.com/lZWWYcCRpYT6aU6HyKEGyjFAKnk5Ik1fEIYWJi3VvDE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNi8x/MS8yMy8xNy8yNS93/b21hbi0xODUzOTM5/XzY0MC5qcGc" alt="cute kitty" />
                </a>
              </div>
              <a href="#">kitty_two</a>
            </li>

            <li className="flex flex-col items-center space-y-1 ">
              <div className="bg-gradient-to-tr from-yellow-400 to-purple-600 p-1 rounded-full">
                <a href="#" className="block bg-white p-1 rounded-full transform transition hover:-rotate-6">
                  <img className="w-12 h-12 rounded-full" src="https://imgs.search.brave.com/V1J51pIvfHGATMCKjKhMkr1MGp49ebOJtCVf2_hsVbI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM2/NTYwNjYzNy9waG90/by9zaG90LW9mLWEt/eW91bmctYnVzaW5l/c3N3b21hbi11c2lu/Zy1hLWRpZ2l0YWwt/dGFibGV0LXdoaWxl/LWF0LXdvcmsuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPUtV/alZsb0JVWHRjWnpO/akd5eWlSRmxwbFZ1/dVBFNlRhcDNPTDZo/X3hJNWs9" alt="cute kitty" />
                </a>
              </div>
              <a href="#">kitty_three</a>
            </li>

            <li className="flex flex-col items-center space-y-1 ">
              <div className="bg-gradient-to-tr from-yellow-400 to-purple-600 p-1 rounded-full">
                <a href="#" className="block bg-white p-1 rounded-full transform transition hover:-rotate-6">
                  <img className="w-12 h-12 rounded-full" src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="cute kitty" />
                </a>
              </div>
              <a href="#">kitty_four</a>
            </li>

            <li className="flex flex-col items-center space-y-1 ">
              <div className="bg-gradient-to-tr from-yellow-400 to-purple-600 p-1 rounded-full">
                <a href="#" className="block bg-white p-1 rounded-full transform transition hover:-rotate-6">
                  <img className="w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="cute kitty" />
                </a>
              </div>
              <a href="#">kitty_four</a>
            </li>

            <li className="flex flex-col items-center space-y-1 ">
              <div className="bg-gradient-to-tr from-yellow-400 to-purple-600 p-1 rounded-full">
                <a href="#" className="block bg-white p-1 rounded-full transform transition hover:-rotate-6">
                  <img className="w-15 h-12 rounded-full" src="https://images.unsplash.com/photo-1473830394358-91588751b241?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="cute kitty" />
                </a>
              </div>
              <a href="#">kitty_four</a>
            </li>
          </ul>
        </div>

        {/* Posts component */}
        <div className="bg-gray-100 p-4 ml-20">
          {/* Single Post */}
          <div className="bg-white border rounded-sm max-w-md mb-4">
            <div className="flex items-center px-4 py-3">
              <img className="h-8 w-8 rounded-full" src="https://picsum.photos/id/1027/150/150" />
              <div className="ml-3 ">
                <span className="text-sm font-semibold antialiased block leading-tight">8fact</span>
                <span className="text-gray-600 text-xs block">Asheville, North Carolina</span>
              </div>
            </div>
            <img src="https://images.unsplash.com/photo-1473830394358-91588751b241?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            <div className="flex items-center justify-between mx-4 mt-3 mb-2">
              <div className="flex gap-5">
                <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path clipRule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fillRule="evenodd"></path></svg>
                <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.8l23.1-39.9c.3-.5.3-1.1-.1-1.5zM18.4 28.8l-3.8-15.6L40.3 7 18.4 28.8z"></path></svg>
              </div>
              <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M47.6 46.7c-.3.2-.7.3-1 .3-.3 0-.6-.1-.9-.2L24 36.2 2.3 46.8c-.6.3-1.3.2-1.9-.2-.5-.4-.8-1-.8-1.6V5c0-1.7 1.3-3 3-3h43c1.7 0 3 1.3 3 3v40c0 .7-.4 1.3-1 1.7zM24 33c.4 0 .7.1 1 .2L44.5 42V6c0-.6-.4-1-1-1H4.5c-.6 0-1 .4-1 1v36l19.5-8.8c.3-.1.6-.2 1-.2z"></path></svg>
            </div>
            <div className="font-semibold text-sm mx-4 mt-2 mb-4">372 likes</div>
            <div className="text-sm mx-4 mb-2">
              <span className="font-semibold mr-2">8fact</span> It’s the small things in life.
            </div>
            <div className="text-xs text-gray-500 mx-4 uppercase mb-2">2 hours ago</div>
          </div>
          <div className="bg-white border rounded-sm max-w-md mb-4">
            <div className="flex items-center px-4 py-3">
              <img className="h-8 w-8 rounded-full" src="https://picsum.photos/id/1027/150/150" />
              <div className="ml-3 ">
                <span className="text-sm font-semibold antialiased block leading-tight">8fact</span>
                <span className="text-gray-600 text-xs block">Asheville, North Carolina</span>
              </div>
            </div>
            <img src="https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?q=80&w=1941&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D " />
            <div className="flex items-center justify-between mx-4 mt-3 mb-2">
              <div className="flex gap-5">
                <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path clipRule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fillRule="evenodd"></path></svg>
                <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.8l23.1-39.9c.3-.5.3-1.1-.1-1.5zM18.4 28.8l-3.8-15.6L40.3 7 18.4 28.8z"></path></svg>
              </div>
              <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M47.6 46.7c-.3.2-.7.3-1 .3-.3 0-.6-.1-.9-.2L24 36.2 2.3 46.8c-.6.3-1.3.2-1.9-.2-.5-.4-.8-1-.8-1.6V5c0-1.7 1.3-3 3-3h43c1.7 0 3 1.3 3 3v40c0 .7-.4 1.3-1 1.7zM24 33c.4 0 .7.1 1 .2L44.5 42V6c0-.6-.4-1-1-1H4.5c-.6 0-1 .4-1 1v36l19.5-8.8c.3-.1.6-.2 1-.2z"></path></svg>
            </div>
            <div className="font-semibold text-sm mx-4 mt-2 mb-4">92,372 likes</div>
            <div className="text-sm mx-4 mb-2">
              <span className="font-semibold mr-2">8fact</span> It’s the small things in life.
            </div>
            <div className="text-xs text-gray-500 mx-4 uppercase mb-2">2 hours ago</div>
          </div>
        </div>
      </div>

      {/* Right side (Suggestions) */}
      <div className="hidden md:block w-96 ml-10 h-screen p-8 overflow-y-auto bg-white">
        <div className="top-8 right-28 bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Suggestions For You</h2>
          <ul className="space-y-4">
            <li className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img className="w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1500259783852-0ca9ce8a64dc?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="User avatar" />
                <div>
                  <h3 className="font-semibold">User One</h3>
                  <p className="text-sm text-gray-600">Followed by user123</p>
                </div>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Follow</button>
            </li>
            <li className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img className="w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1491609154219-ffd3ffafd992?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="User avatar" />
                <div>
                  <h3 className="font-semibold">User Two</h3>
                  <p className="text-sm text-gray-600">Followed by user456</p>
                </div>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Follow</button>
            </li>
            <li className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img className="w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?q=80&w=1941&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="User avatar" />
                <div>
                  <h3 className="font-semibold">User Three</h3>
                  <p className="text-sm text-gray-600">Followed by user789</p>
                </div>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 ml-2 mt-1 rounded-lg">Follow</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HomePage



