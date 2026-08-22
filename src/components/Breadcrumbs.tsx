import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export interface BreadcrumbItem {
  label: string;
  labelBn?: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  language?: 'bn' | 'en';
  className?: string;
}

export const Breadcrumbs = ({ items, language = 'bn', className = '' }: BreadcrumbsProps) => {
  const homeLabel = language === 'bn' ? 'হোম' : 'Home';
  
  return (
    <>
      {/* Visual Breadcrumbs */}
      <Breadcrumb className={className}>
        <BreadcrumbList 
          itemScope 
          itemType="https://schema.org/BreadcrumbList"
          className="flex-wrap"
        >
          {/* Home */}
          <BreadcrumbItem
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <BreadcrumbLink asChild>
              <Link 
                to="/" 
                className="flex items-center gap-1 hover:text-primary transition-colors"
                itemProp="item"
              >
                <Home className="w-3.5 h-3.5" aria-hidden="true" />
                <span itemProp="name" className={language === 'bn' ? 'font-bengali' : ''}>
                  {homeLabel}
                </span>
              </Link>
            </BreadcrumbLink>
            <meta itemProp="position" content="1" />
          </BreadcrumbItem>

          {items.map((item, index) => (
            <span key={index} className="contents">
              <BreadcrumbSeparator>
                <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              </BreadcrumbSeparator>
              
              <BreadcrumbItem
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {item.href && index < items.length - 1 ? (
                  <>
                    <BreadcrumbLink asChild>
                      <Link 
                        to={item.href}
                        className={`hover:text-primary transition-colors ${language === 'bn' ? 'font-bengali' : ''}`}
                        itemProp="item"
                      >
                        <span itemProp="name">
                          {language === 'bn' && item.labelBn ? item.labelBn : item.label}
                        </span>
                      </Link>
                    </BreadcrumbLink>
                    <meta itemProp="position" content={String(index + 2)} />
                  </>
                ) : (
                  <>
                    <BreadcrumbPage 
                      className={language === 'bn' ? 'font-bengali' : ''}
                      itemProp="name"
                      aria-current="page"
                    >
                      {language === 'bn' && item.labelBn ? item.labelBn : item.label}
                    </BreadcrumbPage>
                    <meta itemProp="position" content={String(index + 2)} />
                  </>
                )}
              </BreadcrumbItem>
            </span>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};
