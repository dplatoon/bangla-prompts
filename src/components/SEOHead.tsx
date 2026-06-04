import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageMetadata } from '@/config/pageMetadata';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string; // Optional - will auto-generate from current route if not provided
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  language?: 'bn' | 'en';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  structuredData?: Record<string, unknown>;
  noindex?: boolean;
}

export const SEOHead = ({
  title,
  description,
  keywords,
  canonicalUrl, // No default - will be computed from route
  ogImage = "https://bdprompt.com/og-image.png",
  ogType = 'website',
  language = 'bn',
  author = "bdprompt.com",
  publishedTime,
  modifiedTime,
  breadcrumbs,
  structuredData,
  noindex = false,
}: SEOHeadProps) => {
  const location = useLocation();
  
  // Get route-based metadata as fallback when props not provided
  const routeMetadata = getPageMetadata(location.pathname, language);
  
  // Use provided props or fallback to route-based metadata
  const finalTitle = title || routeMetadata.title;
  const finalDescription = description || routeMetadata.description;
  const finalKeywords = keywords || routeMetadata.keywords || "বাংলা AI প্রম্পট, Bangla prompts, ChatGPT বাংলা";
  
  // Auto-generate canonical URL from current route if not explicitly provided
  // Homepage gets trailing slash, all other pages don't
  const finalCanonicalUrl = canonicalUrl || 
    (location.pathname === '/' 
      ? 'https://bdprompt.com/' 
      : `https://bdprompt.com${location.pathname}`);
  
  // Use useLayoutEffect for synchronous DOM updates (better for SEO crawlers)
  useLayoutEffect(() => {
    // Update document title
    document.title = finalTitle;
    
    // Update meta tags
    const updateMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    
    // Primary meta tags
    updateMeta('description', finalDescription);
    updateMeta('keywords', finalKeywords);
    updateMeta('author', author);

    // Robots directive (allows pages like 404 to opt out of indexing)
    updateMeta('robots', noindex
      ? 'noindex, follow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    updateMeta('googlebot', noindex ? 'noindex, follow' : 'index, follow');
    
    // Open Graph
    updateMeta('og:title', finalTitle, true);
    updateMeta('og:description', finalDescription, true);
    updateMeta('og:url', finalCanonicalUrl, true);
    updateMeta('og:image', ogImage, true);
    updateMeta('og:type', ogType, true);
    updateMeta('og:locale', language === 'bn' ? 'bn_BD' : 'en_US', true);
    
    // Twitter
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', finalTitle);
    updateMeta('twitter:description', finalDescription);
    updateMeta('twitter:image', ogImage);
    
    // Article specific
    if (ogType === 'article' && publishedTime) {
      updateMeta('article:published_time', publishedTime, true);
      if (modifiedTime) {
        updateMeta('article:modified_time', modifiedTime, true);
      }
    }
    
    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', finalCanonicalUrl);
    
    // Update language
    document.documentElement.lang = language;
    
    // Add breadcrumb structured data if provided
    // Only add if visual Breadcrumbs component hasn't already added it
    if (breadcrumbs && breadcrumbs.length > 0) {
      const existingVisualBreadcrumb = document.getElementById('breadcrumb-ld-visual');
      
      // Skip if visual breadcrumb component already injected schema
      if (!existingVisualBreadcrumb) {
        const breadcrumbScript = document.getElementById('breadcrumb-ld');
        const breadcrumbData = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": breadcrumbs.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
          }))
        };
        
        if (breadcrumbScript) {
          breadcrumbScript.textContent = JSON.stringify(breadcrumbData);
        } else {
          const script = document.createElement('script');
          script.id = 'breadcrumb-ld';
          script.type = 'application/ld+json';
          script.textContent = JSON.stringify(breadcrumbData);
          document.head.appendChild(script);
        }
      }
    }
    
    // Add custom structured data if provided
    if (structuredData) {
      const customScript = document.getElementById('custom-ld');
      if (customScript) {
        customScript.textContent = JSON.stringify(structuredData);
      } else {
        const script = document.createElement('script');
        script.id = 'custom-ld';
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
      }
    }
    
    // Cleanup function
    return () => {
      const breadcrumbScript = document.getElementById('breadcrumb-ld');
      const customScript = document.getElementById('custom-ld');
      if (breadcrumbScript) breadcrumbScript.remove();
      if (customScript) customScript.remove();
    };
  }, [finalTitle, finalDescription, finalKeywords, finalCanonicalUrl, ogImage, ogType, language, author, publishedTime, modifiedTime, breadcrumbs, structuredData, noindex]);
  
  return null;
};

// Helper function to generate prompt structured data (Product schema)
export const generatePromptStructuredData = (prompt: {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  category: string;
  author: string;
  rating: number;
  ratingCount: number;
  price: number;
  currency?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": prompt.titleBn || prompt.title,
  "description": prompt.description,
  "category": prompt.category,
  "brand": {
    "@type": "Brand",
    "name": "bdprompt.com"
  },
  "author": {
    "@type": "Person",
    "name": prompt.author
  },
  "offers": {
    "@type": "Offer",
    "price": prompt.price,
    "priceCurrency": prompt.currency || "BDT",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": prompt.rating,
    "ratingCount": prompt.ratingCount
  }
});

// Helper function to generate SoftwareSourceCode schema for prompts (enhanced SEO)
export const generateSoftwareSourceCodeSchema = (prompt: {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  category: string;
  author: string;
  tags?: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": prompt.titleBn || prompt.title,
  "description": prompt.description,
  "programmingLanguage": "Natural Language",
  "codeRepository": `https://bdprompt.com/prompt/${prompt.id}`,
  "applicationCategory": "AI Assistant Prompt",
  "applicationSubCategory": prompt.category,
  "inLanguage": "bn",
  "author": {
    "@type": "Organization",
    "name": "bdprompt.com",
    "url": "https://bdprompt.com"
  },
  "contributor": {
    "@type": "Person",
    "name": prompt.author
  },
  "keywords": prompt.tags?.join(', ') || prompt.category
});

// Helper function to generate HowTo schema for playground/tool pages
export const generateHowToSchema = (language: 'bn' | 'en') => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": language === 'bn' 
    ? "কিভাবে বাংলা AI প্রম্পট ব্যবহার করবেন" 
    : "How to Use Bangla AI Prompts",
  "description": language === 'bn'
    ? "bdprompt.com থেকে AI প্রম্পট কপি করে ChatGPT, Claude, বা Gemini-তে ব্যবহার করার ধাপসমূহ"
    : "Steps to copy AI prompts from bdprompt.com and use them in ChatGPT, Claude, or Gemini",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": language === 'bn' ? "প্রম্পট খুঁজুন" : "Find a Prompt",
      "text": language === 'bn' 
        ? "bdprompt.com-এ আপনার প্রয়োজনীয় ক্যাটাগরি থেকে প্রম্পট খুঁজুন"
        : "Browse bdprompt.com to find a prompt from your desired category"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": language === 'bn' ? "প্রম্পট কপি করুন" : "Copy the Prompt",
      "text": language === 'bn'
        ? "কপি বাটনে ক্লিক করে প্রম্পট ক্লিপবোর্ডে কপি করুন"
        : "Click the copy button to copy the prompt to your clipboard"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": language === 'bn' ? "ভেরিয়েবল পূরণ করুন" : "Fill Variables",
      "text": language === 'bn'
        ? "{variable} ফরম্যাটের জায়গাগুলোতে আপনার তথ্য বসান"
        : "Replace {variable} placeholders with your specific information"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": language === 'bn' ? "AI-তে পেস্ট করুন" : "Paste in AI",
      "text": language === 'bn'
        ? "ChatGPT, Claude, বা Gemini-তে প্রম্পট পেস্ট করে এন্টার চাপুন"
        : "Paste the prompt in ChatGPT, Claude, or Gemini and press enter"
    }
  ],
  "totalTime": "PT2M"
});
