import Sidebar from "@/app/components/sidebar/sidebar";
import MobileSidebar from "@/app/components/sidebar/mobileSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8F6F2]">

      <MobileSidebar />

      <div className="flex">

        <Sidebar />

        <main className="flex-1 w-full overflow-x-hidden flex justify-center p-4 md:p-6 lg:p-10">
          {children}
        </main>

      </div>

    </div>
  );
}