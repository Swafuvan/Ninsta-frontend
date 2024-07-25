import React from 'react'

function Notifications() {
    return (
    // <div !--component -- >
    <div className='grid grid-flow-col justify-between'>
        <div className="max-w-lg mx-auto items-center h-screen ml-56">
            <div className="flex justify-between px-3 py-1 bg-white items-center gap-1 rounded-lg border border-gray-100 my-3">
                <div className="relative w-16 h-16 rounded-full hover:bg-red-700 bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gray-200 rounded-full border-2 border-white">
                        <img className="w-full h-full object-cover rounded-full" src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg" alt="" />
                    </div>
                </div>
                <div>
                    <span className="font-mono">Emma would like to connect with you</span>
                </div>
                <div className="flex gap-2">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                    </button>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="flex justify-between px-3 py-1 bg-white items-center gap-1 rounded-lg border border-gray-100 my-3">
                <div className="relative w-16 h-16 rounded-full hover:bg-red-700 bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gray-200 rounded-full border-2 border-white">
                        <img className="w-full h-full object-cover rounded-full" src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
                    </div>
                </div>
                <div>
                    <span className="font-mono">Tom liked one of your comments</span>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>

            <div className="flex justify-between px-3 py-1 bg-white items-center gap-1 rounded-lg border border-gray-100 my-3">
                <div className="relative w-16 h-16 rounded-full hover:bg-red-700 bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gray-200 rounded-full border-2 border-white">
                        <img className="w-full h-full object-cover rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="" />
                    </div>
                </div>
                <div>
                    <span className="font-mono">Andrea posted a new Tweet have a look</span>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                </div>
            </div>
        </div>
        {/* suggetion */}

        <div className="hidden md:block w-96 ml-16 h-screen p-8 overflow-y-auto bg-white">
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

export default Notifications
