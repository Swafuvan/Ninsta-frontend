'use client'
import TemporaryDrawer from "@/components/ui/sidebar"; 
import HomePage from "@/pages/user/Hompage"; 
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { useRouter } from "next/navigation";
import { store } from "@/redux/store";
import LoadingPage from "@/components/ui/loading";


export default function Home() {
  const [loading, setLoading] = useState(true)
  const router = useRouter();
  const user = store.getState().auth

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get('userToken');
      if (!token) {
        window.location.href = '/Login'
      } else {
        // alert("null aavum "+token)
        setLoading(false)
      }
    }
    fetchUserData()
  }, [])

  if (loading) { return <LoadingPage /> }

  return (
    <>

      <div>
        {user ?
          <>
            <TemporaryDrawer />
            <HomePage />
          </> :
          <>loading...</>
        }
      </div>

    </>
  );
}
