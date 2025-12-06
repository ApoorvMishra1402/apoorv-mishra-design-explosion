import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BlogDetail from "./pages/BlogDetail";
import Admin from "./pages/Admin";
import { AuthProvider } from "@/context/AuthContext";
import emailjs from "@emailjs/browser";
import { getAppConfig } from "@/lib/appConfig";
import { useEffect } from "react";
import { initAnalytics } from "./lib/analytics";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    initAnalytics();
    (async () => {
      try {
        const cfg = await getAppConfig();
        if (cfg.emailjs?.publicKey) {
          emailjs.init({ publicKey: cfg.emailjs.publicKey });
        }
      } catch (_) {}
    })();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
