import TemporaryDrawer from "@/components/ui/sidebar";
import HomePage from "@/pages/user/Hompage";


export default function Home() {
  return (
    <div className="flex min-h-screen">
      <TemporaryDrawer />
      <HomePage/>
    </div>
  );
}
