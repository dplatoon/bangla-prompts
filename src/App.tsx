import { Suspense, lazy, useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SplashScreen, PageLoader } from "@/components/SplashScreen";

// Eagerly loaded pages (critical path)
import Index from "./pages/Index";
import PromptDetail from "./pages/PromptDetail";
import Explore from "./pages/Explore";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Lazy loaded pages (code splitting)
const Playground = lazy(() => import("./pages/Playground"));
const Admin = lazy(() => import("./pages/Admin"));
const Profile = lazy(() => import("./pages/Profile"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const PaymentCancelled = lazy(() => import("./pages/PaymentCancelled"));
const PromptPacks = lazy(() => import("./pages/PromptPacks"));
const API = lazy(() => import("./pages/API"));
const Community = lazy(() => import("./pages/Community"));
const BecomeCreator = lazy(() => import("./pages/BecomeCreator"));
const Guidelines = lazy(() => import("./pages/Guidelines"));
const Support = lazy(() => import("./pages/Support"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPostChatGPTBanglaPrompt = lazy(() => import("./pages/BlogPostChatGPTBanglaPrompt"));
const Legal = lazy(() => import("./pages/Legal"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Cookies = lazy(() => import("./pages/Cookies"));
const DMCA = lazy(() => import("./pages/DMCA"));
const Product = lazy(() => import("./pages/Product"));
const Shikkha = lazy(() => import("./pages/Shikkha"));
const Kobita = lazy(() => import("./pages/Kobita"));
const Business = lazy(() => import("./pages/Business"));
const Resources = lazy(() => import("./pages/Resources"));
const Prompts = lazy(() => import("./pages/Prompts"));
const PromptCategory = lazy(() => import("./pages/PromptCategory"));
const Guide = lazy(() => import("./pages/Guide"));
const Sitemap = lazy(() => import("./pages/Sitemap"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  // SEO FIX: showSplash is only for VISUAL overlay, routes always render immediately
  // Bots and crawlers will always see the full DOM regardless of splash state
  const [showSplash, setShowSplash] = useState(() => {
    // Skip splash for non-root pages so bots crawling deep links see content immediately
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      return false;
    }
    return !sessionStorage.getItem('splash_shown');
  });

  const handleSplashComplete = () => {
    sessionStorage.setItem('splash_shown', 'true');
    setShowSplash(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ErrorBoundary>
          {/* SEO FIX: BrowserRouter and Routes render ALWAYS - splash is a visual overlay only */}
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Critical path - eagerly loaded */}
                <Route path="/" element={<Index />} />
                <Route path="/prompt/:id" element={<PromptDetail />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/explore/:category" element={<Explore />} />
                <Route path="/auth" element={<Auth />} />
                {/* Lazy loaded routes */}
                <Route path="/playground" element={<Playground />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/payment-cancelled" element={<PaymentCancelled />} />
                <Route path="/packs" element={<PromptPacks />} />
                <Route path="/api" element={<API />} />
                <Route path="/community" element={<Community />} />
                <Route path="/become-creator" element={<BecomeCreator />} />
                <Route path="/guidelines" element={<Guidelines />} />
                <Route path="/support" element={<Support />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/chatgpt-bangla-prompt" element={<BlogPostChatGPTBanglaPrompt />} />
                <Route path="/legal" element={<Legal />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/dmca" element={<DMCA />} />
                <Route path="/product" element={<Product />} />
                <Route path="/shikkha" element={<Shikkha />} />
                <Route path="/kobita" element={<Kobita />} />
                <Route path="/business" element={<Business />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/prompts" element={<Prompts />} />
                <Route path="/prompts/:category" element={<PromptCategory />} />
                <Route path="/guide" element={<Guide />} />
                <Route path="/sitemap" element={<Sitemap />} />
                {/* Fallback */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>

          {/* SEO FIX: Splash is a CSS overlay on top of already-rendered routes */}
          {showSplash && (
            <div style={{ position: 'fixed', inset: 0, zIndex: 9999 }}>
              <SplashScreen onComplete={handleSplashComplete} />
            </div>
          )}
        </ErrorBoundary>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
