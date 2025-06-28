
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-16 flex items-center justify-between px-6 border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="lg:hidden" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SRM Mart
                </h1>
                <span className="text-xs text-gray-500 font-medium">Smart Retail Management</span>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full border">
            {new Date().toLocaleDateString()}
          </div>
        </header>
        <main className="flex-1 p-6 bg-gray-50/50">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
