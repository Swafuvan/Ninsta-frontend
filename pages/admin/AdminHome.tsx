"use client";

import { getUsers } from '@/lib/functions/admin/route';
import { RootState } from '@/redux/store'
import { User } from '@/type/users';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BarChart } from '@mui/x-charts/BarChart';

function AdminHome() {
  const admin = useSelector((state: RootState) => state.auth);
  const [allUsers, setAllUsers] = useState<User[]>([]);



  useEffect(() => {
    getUsers().then((res) => {
      setAllUsers(res?.data.userData);
      console.log(res);
    })


  }, []);



  return (
    <div>
      {/* <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden"> */}

      <div className="relative md:ml-64 bg-blueGray-100 overflow-x-hidden">
        <nav className="absolute top-0 left-0 w-full z-10 bg-white lg:flex-row lg:flex-nowrap lg:justify-start flex items-center py-1 px-4 lg:bg-transparent">
          <div className="w-full mx-aut0 items-center flex justify-between lg:flex-nowrap flex-wrap lg:px-6 px-4">
            <a href="javascript:;" className="text-blueGray-800 lg:text-white text-sm uppercase inline-block font-semibold my-3">Settings Page</a><button className="ml-auto cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-blueGray-400 rounded bg-transparent block outline-none focus:outline-none text-blueGray-300 lg:hidden" type="button"><i className="fas fa-bars"></i></button>
            <div className="items-center w-full lg:flex lg:w-auto flex-grow duration-300 transition-all ease-in-out lg:h-auto-important hidden">
              <form className="flex flex-row flex-wrap items-center ml-auto mr-3 mt-3">
                <div className="mb-3 pt-0"><input placeholder="Search here" type="text" className="border-transparent shadow px-3 py-2 text-sm  w-full placeholder-blueGray-200 text-blueGray-700 relative bg-white rounded-md outline-none focus:ring focus:ring-lightBlue-500  focus:border-lightBlue-500 border border-solid transition duration-200 " /></div>
              </form>
              <a className="text-blueGray-500 block" href="javascript:;">
                <div className="items-center flex">
                  <span className="w-12 h-12 text-sm text-white bg-blueGray-300 inline-flex items-center justify-center rounded-full">
                    <img alt="adminImage" className="w-full rounded-full align-middle border-none shadow-lg" src={admin.user?.image + ''} />
                  </span>
                </div>
              </a>
              <div className="block z-50">
                <div className="bg-white text-base float-left p-2 border list-none text-left rounded-lg shadow-lg min-w-48 transition-all duration-100 ease-in-out transform scale-95 opacity-0 absolute origin-top-right">
                  <a href="javascript:;" className="text-sm px-3 py-2 block w-full whitespace-nowrap bg-transparent hover:bg-blueGray-100 rounded transition-all duration-100">Action</a><a href="javascript:;" className="text-sm px-3 py-2 block w-full whitespace-nowrap bg-transparent hover:bg-blueGray-100 rounded transition-all duration-100">Another action</a><a href="javascript:;" className="text-sm px-3 py-2 block w-full whitespace-nowrap bg-transparent hover:bg-blueGray-100 rounded transition-all duration-100">Something else here</a>
                  <div className="h-0 my-2 border border-solid border-blueGray-100"></div>
                  <a href="javascript:;" className="text-sm px-3 py-2 block w-full whitespace-nowrap bg-transparent hover:bg-blueGray-100 rounded transition-all duration-100">Seprated link</a>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="relative pt-32 pb-32 bg-lightBlue-500">
          <div className="px-4 md:px-6 mx-auto w-full">
            <div>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                    <div className="flex-auto p-4">
                      <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                          <h5 className="text-blueGray-400 uppercase font-bold text-xs">Total Users</h5>
                          <span className="font-bold text-xl">{allUsers.length}</span>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                          <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500"><i className="far fa-chart-bar"></i></div>
                        </div>
                      </div>
                      <p className="text-sm text-blueGray-500 mt-4"><span className="text-emerald-500 mr-2"><i className="fas fa-arrow-up"></i> 3.48%</span><span className="whitespace-nowrap">Since last month</span></p>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                    <div className="flex-auto p-4">
                      <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                          <h5 className="text-blueGray-400 uppercase font-bold text-xs">NEW USERS</h5>
                          <span className="font-bold text-xl">{allUsers.length}</span>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                          <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500"><i className="fas fa-chart-pie"></i></div>
                        </div>
                      </div>
                      <p className="text-sm text-blueGray-500 mt-4"><span className="text-red-500 mr-2"><i className="fas fa-arrow-down"></i> 3.48%</span><span className="whitespace-nowrap">Since last week</span></p>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                    <div className="flex-auto p-4">
                      <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                          <h5 className="text-blueGray-400 uppercase font-bold text-xs">Blocked Users</h5>
                          <span className="font-bold text-xl">8</span>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                          <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-pink-500"><i className="fas fa-users"></i></div>
                        </div>
                      </div>
                      <p className="text-sm text-blueGray-500 mt-4"><span className="text-orange-500 mr-2"><i className="fas fa-arrow-down"></i> 1.10%</span><span className="whitespace-nowrap">Since yesterday</span></p>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                    <div className="flex-auto p-4">
                      <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                          <h5 className="text-blueGray-400 uppercase font-bold text-xs">PERFORMANCE</h5>
                          <span className="font-bold text-xl">49,65%</span>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                          <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-lightBlue-500"><i className="fas fa-percent"></i></div>
                        </div>
                      </div>
                      <p className="text-sm text-blueGray-500 mt-4"><span className="text-emerald-500 mr-2"><i className="fas fa-arrow-up"></i> 12%</span><span className="whitespace-nowrap">Since last month</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 md:px-6 mx-auto w-full -mt-24">
          <div className="flex flex-wrap">
            {/* <div className="w-full xl:w-8/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-8 shadow-lg rounded-lg bg-blueGray-800">
                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                      <h6 className="uppercase mb-1 text-xs font-semibold text-blueGray-200">Overview</h6>
                      <h2 className="text-xl font-semibold text-white">Sales value</h2>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex-auto">
                  <div className="relative h-350-px">
                    <canvas width="496" height="291" className="display: block; box-sizing: border-box; height: 350px; width: 595.5px;" id="line-chart"></canvas>
                  </div>
                </div>
              </div>
            </div> */}
            <BarChart
              xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C', 'group D', 'group E'] }]}
              series={[{ data: [4, 3, 5, 4, 2] }, { data: [1, 6, 3, 5, 7] }, { data: [2, 5, 6, 3, 4] },]}
              width={700}
              height={300}
            />
            {/* <div className="w-full xl:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-8 shadow-lg rounded-lg bg-white">
                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                      <h6 className="uppercase mb-1 text-xs font-semibold text-blueGray-500">Performance</h6>
                      <h2 className="text-xl font-semibold text-blueGray-800">Total orders</h2>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex-auto">
                  <div className="relative h-350-px">
                    <canvas width="221" height="291" className="display: block; box-sizing: border-box; height: 350px; width: 265.7px;" id="bar-chart"></canvas>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div className="flex flex-wrap">
            <div className="w-full xl:w-12/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-8 shadow-lg rounded-lg bg-white text-blueGray-700">
                <div className="px-6 py-4 border-0">
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                      <h3 className="font-bold text-lg text-blueGray-700">New Users</h3>
                    </div>
                  </div>
                </div>
                <div className="block w-full overflow-x-auto">
                  <table className="items-center w-full bg-transparent border-collapse">
                    <thead>
                      <tr>
                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-blueGray-100 text-blueGray-500 border-blueGray-200">Index</th>
                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-blueGray-100 text-blueGray-500 border-blueGray-200">User Email</th>
                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-blueGray-100 text-blueGray-500 border-blueGray-200">Gender</th>
                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-blueGray-100 text-blueGray-500 border-blueGray-200">Block</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allUsers.map((data: any, index: number) => {
                        return (
                          <tr key={index}>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              <div className="flex items-center"><span className="ml-3 font-bold NaN">{index + 1}</span></div>
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              <div className="flex items-center"><span className="ml-3 font-bold NaN">{data.email}</span></div>
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              <div className="flex items-center">{data?.Gender}</div>
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              <div className="flex items-center">{data.isBlocked === true ? "Blocked" : "NotBlocked"}</div>
                            </td>
                            {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              <div className="flex items-center"><i className="fas fa-arrow-up mr-2 text-emerald-500"></i></div>
                            </td> */}
                          </tr>
                        )
                      })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
      {/* </div> */}
    </div>
  )
}

export default AdminHome

