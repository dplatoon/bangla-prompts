/**
 * Google Analytics 4 Event Tracking Utility
 * Provides type-safe event tracking for key user interactions
 */

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js',
      action: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Track when a user copies a prompt
 */
export const trackPromptCopied = (promptId: string, category: string, language: 'bn' | 'en') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'prompt_copied', {
      prompt_id: promptId,
      category: category,
      language: language,
      event_category: 'engagement',
      event_label: `${category} - ${promptId}`
    });
  }
};

/**
 * Track when a user views a prompt detail page
 */
export const trackPromptViewed = (promptId: string, category: string, language: 'bn' | 'en') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'prompt_viewed', {
      prompt_id: promptId,
      category: category,
      language: language,
      event_category: 'engagement',
      event_label: `${category} - ${promptId}`
    });
  }
};

/**
 * Track when a user filters by category
 */
export const trackCategoryFiltered = (categoryName: string, language: 'bn' | 'en') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'category_filtered', {
      category_name: categoryName,
      language: language,
      event_category: 'navigation',
      event_label: categoryName
    });
  }
};

/**
 * Track when a user performs a search
 */
export const trackSearchPerformed = (searchQuery: string, resultsCount: number, language: 'bn' | 'en') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'search_performed', {
      search_term: searchQuery,
      results_count: resultsCount,
      language: language,
      event_category: 'engagement',
      event_label: searchQuery
    });
  }
};

/**
 * Track when a user uses the transliteration tool
 */
export const trackTransliterationUsed = (inputLength: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'transliteration_used', {
      input_length: inputLength,
      event_category: 'engagement',
      event_label: 'transliteration'
    });
  }
};

/**
 * Track when a user saves a prompt
 */
export const trackPromptSaved = (promptId: string, category: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'prompt_saved', {
      prompt_id: promptId,
      category: category,
      event_category: 'engagement',
      event_label: `saved - ${promptId}`
    });
  }
};

/**
 * Track when a user tries a prompt in playground
 */
export const trackPlaygroundUsed = (promptId: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'playground_used', {
      prompt_id: promptId,
      event_category: 'engagement',
      event_label: `playground - ${promptId}`
    });
  }
};

/**
 * Track page views for SPA navigation
 */
export const trackPageView = (pagePath: string, pageTitle: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle,
      event_category: 'navigation'
    });
  }
};
