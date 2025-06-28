
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import IncomingItems from "./pages/IncomingItems";
import AvailableItems from "./pages/AvailableItems";
import OutgoingItems from "./pages/OutgoingItems";
import EditItem from "./pages/EditItem";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/incoming" element={<IncomingItems />} />
                <Route path="/available" element={<AvailableItems />} />
                <Route path="/outgoing" element={<OutgoingItems />} />
                <Route path="/edit/:id" element={<EditItem />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
