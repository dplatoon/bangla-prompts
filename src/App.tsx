import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PromptDetail from "./pages/PromptDetail";
import Explore from "./pages/Explore";
import Playground from "./pages/Playground";
import PromptPacks from "./pages/PromptPacks";
import API from "./pages/API";
import Community from "./pages/Community";
import BecomeCreator from "./pages/BecomeCreator";
import Guidelines from "./pages/Guidelines";
import Support from "./pages/Support";
import Blog from "./pages/Blog";
import Legal from "./pages/Legal";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import DMCA from "./pages/DMCA";
import Product from "./pages/Product";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Shikkha from "./pages/Shikkha";
import Kobita from "./pages/Kobita";
import Business from "./pages/Business";
import Resources from "./pages/Resources";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/prompt/:id" element={<PromptDetail />} />
          <Route path="/explore" element={<Explore />} />
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
          <Route path="/auth" element={<Auth />} />
          <Route path="/shikkha" element={<Shikkha />} />
          <Route path="/kobita" element={<Kobita />} />
          <Route path="/business" element={<Business />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
