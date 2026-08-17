// Single source of truth for the numbers shown across the site.
// The prompt list is generated at build time by scripts/fetch-prompt-routes.mjs,
// which pulls every published prompt from the backend — so these counts stay
// honest without a runtime query and get baked into the prerendered HTML.
import generatedPromptRoutes from './generated-prompt-routes.json';

export const promptCount = generatedPromptRoutes.length;

/** Conservative rounded-down count used in marketing copy (e.g. 64 -> 60). */
export const promptCountRounded = Math.max(10, Math.floor(promptCount / 10) * 10);

export const categoryCount = 7;

const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export const toBanglaDigits = (value: number | string): string =>
  String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);

/** "60+" / "৬০+" */
export const promptCountLabel = `${promptCountRounded}+`;
export const promptCountLabelBn = `${toBanglaDigits(promptCountRounded)}+`;

export const categoryCountLabel = String(categoryCount);
export const categoryCountLabelBn = toBanglaDigits(categoryCount);

export const statsLabel = (language: 'bn' | 'en') =>
  language === 'bn' ? promptCountLabelBn : promptCountLabel;