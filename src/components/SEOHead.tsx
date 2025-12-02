import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  language?: 'bn' | 'en';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  structuredData?: Record<string, unknown>;
}

export const SEOHead = ({
  title = "bdprompt.com — সবচেয়ে বড় বাংলা AI প্রম্পট হাব",
  description = "বাংলা প্রম্পট টেমপ্লেট — কন্টেন্ট, ইমেজ, কোড, মার্কেটিং। ৫০০+ AI প্রম্পট এক ক্লিকে কপি করে প্রয়োগ করুন।",
  keywords = "বাংলা AI প্রম্পট, Bangla prompts, ChatGPT বাংলা, AI prompts Bangladesh",
  canonicalUrl = "https://bdprompt.com/",
  ogImage = "https://bdprompt.com/og-image.png",
  ogType = 'website',
  language = 'bn',
  author = "bdprompt.com",
  publishedTime,
  modifiedTime,
  breadcrumbs,
  structuredData,
}: SEOHeadProps) => {
  
  useEffect(() => {
    // Update document title
    document.title = title;
    
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
    updateMeta('description', description);
    updateMeta('keywords', keywords);
    updateMeta('author', author);
    
    // Open Graph
    updateMeta('og:title', title, true);
    updateMeta('og:description', description, true);
    updateMeta('og:url', canonicalUrl, true);
    updateMeta('og:image', ogImage, true);
    updateMeta('og:type', ogType, true);
    updateMeta('og:locale', language === 'bn' ? 'bn_BD' : 'en_US', true);
    
    // Twitter
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
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
    canonical.setAttribute('href', canonicalUrl);
    
    // Update language
    document.documentElement.lang = language;
    
    // Add breadcrumb structured data if provided
    if (breadcrumbs && breadcrumbs.length > 0) {
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
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, language, author, publishedTime, modifiedTime, breadcrumbs, structuredData]);
  
  return null;
};

// Helper function to generate prompt structured data
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
