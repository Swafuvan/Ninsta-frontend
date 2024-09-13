'use client'
import dynamic from "next/dynamic"
const TemporaryDrawer = dynamic(()=>import("@/components/ui/sidebar"),{ssr:false});
const HomePage =  dynamic(()=>import("@/pages/user/Hompage"),{ssr:false});
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import LoadingPage from "@/components/ui/loading";


export default function Home() {
  const [loading, setLoading] = useState(true)
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth);

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
