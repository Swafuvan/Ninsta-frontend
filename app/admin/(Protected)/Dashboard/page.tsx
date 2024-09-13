
import LoadingPage from "@/components/ui/loading"
import dynamic from "next/dynamic"
const AdminHome = dynamic(() => import("@/pages/admin/AdminHome"), { ssr: false })

import { Suspense } from "react"

function Dashboardpage() {
  return (
    <>
      <Suspense fallback={<LoadingPage />}>
        <AdminHome />
      </Suspense>
    </>
  )
}

export default Dashboardpage

