import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { ErrorBoundary } from "@/components/ErrorBoundary";

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (previously cacheTime)
      refetchOnWindowFocus: false,
    },
  },
});

// Loading fallback component with minimal layout shift
const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
  </div>
);

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Critical path - eagerly loaded */}
              <Route path="/" element={<Index />} />
              <Route path="/prompt/:id" element={<PromptDetail />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/explore/:categorySlug" element={<Explore />} />
              <Route path="/auth" element={<Auth />} />
              
              {/* Lazy loaded routes */}
              <Route path="/playground" element={<Playground />} />
              <Route path="/packs" element={<PromptPacks />} />
              <Route path="/api" element={<API />} />
              <Route path="/community" element={<Community />} />
              <Route path="/become-creator" element={<BecomeCreator />} />
              <Route path="/guidelines" element={<Guidelines />} />
              <Route path="/support" element={<Support />} />
              <Route path="/blog" element={<Blog />} />
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
              <Route path="/prompts/:slug" element={<PromptCategory />} />
              <Route path="/guide" element={<Guide />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/payment-cancelled" element={<PaymentCancelled />} />
              
              {/* Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
