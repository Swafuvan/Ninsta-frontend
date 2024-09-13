
import LoadingPage from "@/components/ui/loading"
import AdminHome from "@/pages/admin/AdminHome"
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

