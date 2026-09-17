import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, Twitter, Facebook, Mail } from "lucide-react";

interface FooterProps {
  language: 'bn' | 'en';
}

export const Footer = ({ language }: FooterProps) => {
  const year = new Date().getFullYear();
  const yearBn = String(year).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);
  const text = {
    bn: {
      tagline: "বাংলা AI প্রম্পট হাব — আপনার সৃজনশীলতার সঙ্গী",
      sections: {
        product: {
          title: "প্রোডাক্ট",
          links: [
            { label: "প্রম্পট এক্সপ্লোর করুন", href: "/explore" },
            { label: "প্লেগ্রাউন্ড", href: "/playground" },
            { label: "প্রম্পট প্যাকস", href: "/packs" },
            { label: "API", href: "/api" }
          ]
        },
        community: {
          title: "কমিউনিটি",
          links: [
            { label: "ক্রিয়েটর হন", href: "/become-creator" },
            { label: "গাইডলাইনস", href: "/guidelines" },
            { label: "সাপোর্ট", href: "/support" },
            { label: "ব্লগ", href: "/blog" }
          ]
        },
        legal: {
          title: "আইনি",
          links: [
            { label: "প্রাইভেসি পলিসি", href: "/privacy" },
            { label: "টার্মস অব সার্ভিস", href: "/terms" },
            { label: "কুকি পলিসি", href: "/cookies" },
            { label: "DMCA", href: "/dmca" }
          ]
        }
      },
      newsletter: {
        title: "নিউজলেটার সাবস্ক্রাইব করুন",
        subtitle: "নতুন প্রম্পট ও আপডেট সম্পর্কে জানুন",
        placeholder: "আপনার ইমেইল ঠিকানা",
        button: "সাবস্ক্রাইব করুন"
      },
      social: "সোশ্যাল মিডিয়া",
      copyright: `© ${yearBn} BD Prompt by Start BD। সকল অধিকার সংরক্ষিত।`,
      madeWith: "💚 দিয়ে বাংলাদেশে তৈরি"
    },
    en: {
      tagline: "Bangla AI Prompts Hub — Your creativity companion",
      sections: {
        product: {
          title: "Product",
          links: [
            { label: "Explore Prompts", href: "/explore" },
            { label: "Playground", href: "/playground" },
            { label: "Prompt Packs", href: "/packs" },
            { label: "API", href: "/api" }
          ]
        },
        community: {
          title: "Community",
          links: [
            { label: "Become Creator", href: "/become-creator" },
            { label: "Guidelines", href: "/guidelines" },
            { label: "Support", href: "/support" },
            { label: "Blog", href: "/blog" }
          ]
        },
        legal: {
          title: "Legal",
          links: [
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
            { label: "Cookie Policy", href: "/cookies" },
            { label: "DMCA", href: "/dmca" }
          ]
        }
      },
      newsletter: {
        title: "Subscribe to Newsletter",
        subtitle: "Get updates on new prompts and features",
        placeholder: "Your email address",
        button: "Subscribe"
      },
      social: "Social Media",
      copyright: `© ${year} BD Prompt by Start BD. All rights reserved.`,
      madeWith: "Made with 💚 in Bangladesh"
    }
  };

  const currentText = text[language];

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Newsletter Section */}
        <div className="py-8 sm:py-12">
          <div className="bg-gradient-primary rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center">
            <h3 className={`text-xl sm:text-2xl font-bold text-primary-foreground mb-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {currentText.newsletter.title}
            </h3>
            <p className={`text-sm sm:text-base text-primary-foreground/80 mb-4 sm:mb-6 ${language === 'bn' ? 'font-bengali text-bengali' : ''}`}>
              {currentText.newsletter.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-2 sm:gap-3">
              <input
                type="email"
                placeholder={currentText.newsletter.placeholder}
                className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-0 bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20 text-sm sm:text-base ${language === 'bn' ? 'font-bengali' : ''}`}
              />
              <Button variant="secondary" className={`px-4 sm:px-6 text-sm sm:text-base ${language === 'bn' ? 'font-bengali' : ''}`}>
                {currentText.newsletter.button}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="py-8 sm:py-12">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
            {/* Brand */}
            <div className="col-span-2 sm:col-span-2 lg:col-span-2 space-y-4">
              <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-primary rounded-lg sm:rounded-xl flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-base sm:text-xl">B</span>
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-primary">bdprompt.com</h3>
                </div>
              </Link>
              <p className={`text-sm text-muted-foreground max-w-sm ${language === 'bn' ? 'font-bengali text-bengali' : ''}`}>
                {currentText.tagline}
              </p>
              
              {/* Social Links */}
              <div className="space-y-2">
                <h4 className={`text-xs sm:text-sm font-medium text-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {currentText.social}
                </h4>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="w-8 h-8 sm:w-10 sm:h-10 p-0" asChild>
                    <a href="mailto:hello@bdprompt.com" aria-label="Email">
                      <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Links Sections */}
            {Object.entries(currentText.sections).map(([key, section]) => (
              <div key={key} className="space-y-3 sm:space-y-4">
                <h4 className={`text-xs sm:text-sm font-semibold text-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {section.title}
                </h4>
                <ul className="space-y-1.5 sm:space-y-2">
                  {section.links.map((link, index) => (
                    <li key={index}>
                      <Link 
                        to={link.href}
                        className={`text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors ${language === 'bn' ? 'font-bengali' : ''}`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="mb-6 sm:mb-8" />
        
        {/* Bottom */}
        <div className="pb-6 sm:pb-8 flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 text-center md:text-left">
          <p className={`text-xs sm:text-sm text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
            {currentText.copyright}
          </p>
          <p className={`text-xs sm:text-sm text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
            {currentText.madeWith}
          </p>
        </div>
      </div>
    </footer>
  );
};
