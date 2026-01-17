import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PromptCardSkeletonProps {
  className?: string;
}

export const PromptCardSkeleton: React.FC<PromptCardSkeletonProps> = ({ className }) => {
  return (
    <Card className={cn("border-border/50 bg-card/50", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-12 rounded-full" />
            </div>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="flex space-x-1">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-1">
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex space-x-2">
          <Skeleton className="h-9 flex-1 rounded" />
          <Skeleton className="h-9 w-10 rounded" />
          <Skeleton className="h-9 w-10 rounded" />
        </div>
      </CardContent>
    </Card>
  );
};

interface PromptGridSkeletonProps {
  count?: number;
  viewMode?: 'grid' | 'list';
}

export const PromptGridSkeleton: React.FC<PromptGridSkeletonProps> = ({ 
  count = 6, 
  viewMode = 'grid' 
}) => {
  return (
    <div className={viewMode === 'grid' 
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
      : "space-y-4"
    }>
      {Array.from({ length: count }).map((_, index) => (
        <PromptCardSkeleton key={index} />
      ))}
    </div>
  );
};

// Generic image skeleton with aspect ratio
interface ImageSkeletonProps {
  aspectRatio?: number;
  className?: string;
}

export const ImageSkeleton: React.FC<ImageSkeletonProps> = ({ 
  aspectRatio = 16 / 9, 
  className 
}) => {
  return (
    <div 
      className={cn("relative overflow-hidden bg-muted animate-pulse rounded-lg", className)}
      style={{ paddingBottom: `${(1 / aspectRatio) * 100}%` }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="w-10 h-10 text-muted-foreground/30"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    </div>
  );
};

// Avatar skeleton
interface AvatarSkeletonProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const AvatarSkeleton: React.FC<AvatarSkeletonProps> = ({ 
  size = 'md', 
  className 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  return (
    <Skeleton 
      className={cn("rounded-full", sizeClasses[size], className)} 
    />
  );
};
