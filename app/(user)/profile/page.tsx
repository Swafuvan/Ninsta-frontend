import Image from 'next/image'
import React from 'react'

function ProfilePage() {
  return (
    <div>
      

      <main className="bg-gray-100 bg-opacity-25">

        <div className="lg:w-8/12 lg:mx-auto mb-8">

          <header className="flex flex-wrap items-center p-4 md:py-8">

            <div className="md:w-3/12 md:ml-16">
              {/* <!-- profile image --> */}
              {/* <Image width={20} height={20} className=" md:w-40 md:h-40 object-cover rounded-full
                     border-2 border-pink-600 p-1" src="https://www.bytewebster.com/img/logo.png" alt="profile" /> */}
            </div>

            {/* <!-- profile meta --> */}
            <div className="w-8/12 md:w-7/12 ml-4">
              <div className="md:flex md:flex-wrap md:items-center mb-4">
                <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
                  bytewebster
                </h2>

                {/* <!-- badge --> */}
                <span className="inline-block fas fa-certificate fa-lg text-blue-500 
                               relative mr-6  text-xl transform -translate-y-2" aria-hidden="true">
                  <i className="fas fa-check text-white text-xs absolute inset-x-0
                               ml-1 mt-px"></i>
                </span>

                {/* <!-- follow button --> */}
                <a href="#" className="bg-blue-500 px-2 py-1 
                        text-white font-semibold text-sm rounded block text-center 
                        sm:inline-block">Follow</a>
              </div>

              {/* <!-- post, following, followers list for medium screens --> */}
              <ul className="hidden md:flex space-x-8 mb-4">
                <li>
                  <span className="font-semibold">6</span>
                  posts
                </li>

                <li>
                  <span className="font-semibold">50.5k</span>
                  followers
                </li>
                <li>
                  <span className="font-semibold">10</span>
                  following
                </li>
              </ul>

              {/* <!-- user meta form medium screens --> */}
              <div className="hidden md:block">
                <h1 className="font-semibold">ByteWebster</h1>
                <span className="bioclassName">Internet company</span>
                <p>ByteWebster is a web development and coding blog website. Where we provide professional web projects🌍</p>
                <span><strong>www.bytewebster.com</strong></span>
              </div>

            </div>

            {/* <!-- user meta form small screens --> */}
            <div className="md:hidden text-sm my-2">
              <h1 className="font-semibold">ByteWebster</h1>
              <span className="bioclassName">Internet company</span>
              <p>ByteWebster is a web development and coding blog website. Where we provide professional web projects🌍</p>
              <span><strong>www.bytewebster.com</strong></span>
            </div>

          </header>

          {/* <!-- posts --> */}
          <div className="px-px md:px-3">

            {/* <!-- user following for mobile only --> */}
            <ul className="flex md:hidden justify-around space-x-8 border-t 
                text-center p-2 text-gray-600 leading-snug text-sm">
              <li>
                <span className="font-semibold text-gray-800 block">6</span>
                posts
              </li>

              <li>
                <span className="font-semibold text-gray-800 block">50.5k</span>
                followers
              </li>
              <li>
                <span className="font-semibold text-gray-800 block">10</span>
                following
              </li>
            </ul>
            <br/>
              <br/>
                {/* <!-- insta freatures --> */}
                <ul className="flex items-center justify-around md:justify-center space-x-12  
                    uppercase tracking-widest font-semibold text-xs text-gray-600
                    border-t">
                  {/* <!-- posts tab is active --> */}
                  <li className="md:border-t md:border-gray-700 md:-mt-px md:text-gray-700">
                    <a className="inline-block p-3" href="#">
                      <i className="fas fa-th-large text-xl md:text-xs"></i>
                      <span className="hidden md:inline">post</span>
                    </a>
                  </li>
                  <li>
                    <a className="inline-block p-3" href="#">
                      <i className="far fa-square text-xl md:text-xs"></i>
                      <span className="hidden md:inline">igtv</span>
                    </a>
                  </li>
                  <li>
                    <a className="inline-block p-3" href="#">
                      <i className="fas fa-user border border-gray-500
                             px-1 pt-1 rounded text-xl md:text-xs"></i>
                      <span className="hidden md:inline">tagged</span>
                    </a>
                  </li>
                </ul>
                {/* <!-- flexbox grid --> */}
                <div className="flex flex-wrap -mx-px md:-mx-3">

                  {/* <!-- column --> */}
                  <div className="w-1/3 p-px md:px-3">
                    {/* <!-- post 1--> */}
                    <a href="#">
                      <article className="post bg-gray-100 text-white relative pb-full md:mb-6">
                        {/* <!-- post images--> */}
                        {/* <Image className="w-full h-full absolute left-0 top-0 object-cover" src="images/demo.png" alt="image" /> */}

                          <i className="fas fa-square absolute right-0 top-0 m-1"></i>
                          {/* <!-- overlay--> */}
                          <div className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute 
                                left-0 top-0 hidden">
                            <div className="flex justify-center items-center 
                                    space-x-4 h-full">
                              <span className="p-2">
                                <i className="fas fa-heart"></i>
                                412K
                              </span>

                              <span className="p-2">
                                <i className="fas fa-comment"></i>
                                2,909
                              </span>
                            </div>
                          </div>

                      </article>
                    </a>
                  </div>

                  <div className="w-1/3 p-px md:px-3">
                    <a href="#">
                      {/* <!-- post 2 --> */}
                      <article className="post bg-gray-100 text-white relative pb-full md:mb-6">
                        {/* <Image className="w-full h-full absolute left-0 top-0 object-cover" src="images/demo1.png" alt="image" /> */}

                          {/* <!-- overlay--> */}
                          <div className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute 
                                left-0 top-0 hidden">
                            <div className="flex justify-center items-center 
                                    space-x-4 h-full">
                              <span className="p-2">
                                <i className="fas fa-heart"></i>
                                412K
                              </span>

                              <span className="p-2">
                                <i className="fas fa-comment"></i>
                                1,993
                              </span>
                            </div>
                          </div>

                      </article>
                    </a>
                  </div>

                  <div className="w-1/3 p-px md:px-3">
                    <a href="#">
                      <article className="post bg-gray-100 text-white relative pb-full  md:mb-6">
                        {/* <Image className="w-full h-full absolute left-0 top-0 object-cover" src="images/demo2.png" alt="image" /> */}
                          {/* <!-- overlay--> */}
                          <div className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute 
                                left-0 top-0 hidden">
                            <div className="flex justify-center items-center 
                                    space-x-4 h-full">
                              <span className="p-2">
                                <i className="fas fa-heart"></i>
                                112K
                              </span>

                              <span className="p-2">
                                <i className="fas fa-comment"></i>
                                2,090
                              </span>
                            </div>
                          </div>
                      </article>
                    </a>
                  </div>

                  <div className="w-1/3 p-px md:px-3">
                    <a href="#">
                      <article className="post bg-gray-100 text-white relative pb-full md:mb-6">
                        {/* <Image className="w-full h-full absolute left-0 top-0 object-cover" src="images/demo3.jpg" alt="image" /> */}

                          <i className="fas fa-video absolute right-0 top-0 m-1"></i>

                          {/* <!-- overlay--> */}
                          <div className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute 
                                left-0 top-0 hidden">
                            <div className="flex justify-center items-center 
                                    space-x-4 h-full">
                              <span className="p-2">
                                <i className="fas fa-heart"></i>
                                841K
                              </span>

                              <span className="p-2">
                                <i className="fas fa-comment"></i>
                                909
                              </span>
                            </div>
                          </div>

                      </article>
                    </a>
                  </div>

                  <div className="w-1/3 p-px md:px-3">
                    <a href="#">
                      <article className="post bg-gray-100 text-white relative pb-full md:mb-6">
                        {/* <Image className="w-full h-full absolute left-0 top-0 object-cover" src="images/demo4.jpg" alt="image" /> */}
                          {/* <!-- overlay--> */}
                          <div className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute 
                                left-0 top-0 hidden">
                            <div className="flex justify-center items-center 
                                    space-x-4 h-full">
                              <span className="p-2">
                                <i className="fas fa-heart"></i>
                                120K
                              </span>

                              <span className="p-2">
                                <i className="fas fa-comment"></i>
                                3,909
                              </span>
                            </div>
                          </div>

                      </article>
                    </a>
                  </div>

                  <div className="w-1/3 p-px md:px-3">
                    <a href="#">
                      <article className="post bg-gray-100 text-white relative pb-full md:mb-6">
                        {/* <Image className="w-full h-full absolute left-0 top-0 object-cover" src="images/demo5.webp" alt="image" /> */}
                          {/* <!-- overlay--> */}
                          <div className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute 
                                left-0 top-0 hidden">
                            <div className="flex justify-center items-center 
                                    space-x-4 h-full">
                              <span className="p-2">
                                <i className="fas fa-heart"></i>
                                160K
                              </span>

                              <span className="p-2">
                                <i className="fas fa-comment"></i>
                                5,557
                              </span>
                            </div>
                          </div>

                      </article>
                    </a>
                  </div>
                </div>
              </div>
          </div>
      </main>
    </div>
  )
}

export default ProfilePage


