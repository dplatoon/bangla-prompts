import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.error(
        "404 Error: User attempted to access non-existent route:",
        location.pathname
      );
    }
  }, [location.pathname]);

  return (
    <>
      <SEOHead 
        title="৪০৪ - পেজ পাওয়া যায়নি | BdPrompt"
        description="আপনি যে পেজটি খুঁজছেন তা পাওয়া যায়নি। হোমপেজে ফিরে যান।"
        canonicalUrl="https://bdprompt.com/404"
        ogImage="https://bdprompt.com/og-image.png"
        language="bn"
        noindex
      />
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center px-4">
          <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-2 font-bengali">
            পেজ পাওয়া যায়নি
          </h2>
          <p className="text-muted-foreground mb-8 font-bengali">
            আপনি যে পেজটি খুঁজছেন তা মুছে ফেলা হয়েছে বা সরানো হয়েছে।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="gap-2 font-bengali">
                <Home className="w-4 h-4" />
                হোমে ফিরে যান
              </Button>
            </Link>
            <Link to="/explore">
              <Button variant="outline" className="gap-2 font-bengali">
                <Search className="w-4 h-4" />
                প্রম্পট খুঁজুন
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
