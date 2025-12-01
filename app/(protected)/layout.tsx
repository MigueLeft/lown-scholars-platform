import { getSession } from "@/server/users";
import { redirect } from "next/navigation";
import Sidebar from "@/components/navigation/Sidebar";
import MobileNav from "@/components/navigation/MobileNav";
import HeaderDesktop from "@/components/navigation/HeaderDesktop";

export const dynamic = 'force-dynamic';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const userName = session?.user?.name || undefined;
  const userEmail = session?.user?.email || undefined;
  const userImage = session?.user?.image || undefined;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Navigation */}
      <MobileNav userName={userName} userImage={userImage} />

      <div className="flex">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-h-screen">
          {/* Desktop Header */}
          <HeaderDesktop userName={userName} userEmail={userEmail} userImage={userImage}/>

          {/* Page Content */}
          <div className="flex-1 p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}