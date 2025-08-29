import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Sonner } from "@/components/ui/sonner";
import Index from "./pages/Index";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import { AIAssistant } from "./components/dashboard/AIAssistant";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Overview from "./pages/dashboard/Overview";
import ContentLab from "./pages/dashboard/ContentLab";
import CaptionWriter from "./pages/dashboard/CaptionWriter";
import MultiPlatformPosting from "./pages/dashboard/MultiPlatformPosting";
import CampaignManager from "./pages/dashboard/CampaignManager";
import CreatorDiscovery from "./pages/dashboard/CreatorDiscovery";
import ProfileBilling from "./pages/dashboard/ProfileBilling";
import AdminPanel from "./pages/dashboard/AdminPanel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route index element={<Index />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/dashboard" element={
              <>
                <DashboardLayout />
                <AIAssistant />
              </>
            }>
              <Route index element={<Overview />} />
              <Route path="content-lab" element={<ContentLab />} />
              <Route path="captions" element={<CaptionWriter />} />
              <Route path="posting" element={<MultiPlatformPosting />} />
              <Route path="creators" element={<CreatorDiscovery />} />
              <Route path="campaigns" element={<CampaignManager />} />
              <Route path="profile" element={<ProfileBilling />} />
              <Route path="admin" element={<AdminPanel />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;