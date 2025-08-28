import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Login } from "./pages/auth/Login";
import { Signup } from "./pages/auth/Signup";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import { Overview } from "./pages/dashboard/Overview";
import { ContentLab } from "./pages/dashboard/ContentLab";
import { CaptionWriter } from "./pages/dashboard/CaptionWriter";
import { MultiPlatformPosting } from "./pages/dashboard/MultiPlatformPosting";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Overview />} />
            <Route path="content-lab" element={<ContentLab />} />
            <Route path="captions" element={<CaptionWriter />} />
            <Route path="posting" element={<MultiPlatformPosting />} />
            <Route path="creators" element={<div>Creator Discovery - Coming Soon</div>} />
            <Route path="campaigns" element={<div>Campaign Manager - Coming Soon</div>} />
            <Route path="profile" element={<div>Profile & Billing - Coming Soon</div>} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;