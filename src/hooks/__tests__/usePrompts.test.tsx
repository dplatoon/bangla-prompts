import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { mockSupabase } from '@/test/__mocks__/supabase';
import { promptToPromptData } from '../usePrompts';
import type { Prompt } from '../usePrompts';

// Mock useAuth
vi.mock('../useAuth', () => ({
  useAuth: vi.fn(() => ({ user: null, session: null, loading: false, signOut: vi.fn() })),
}));

// Wrapper with QueryClientProvider
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

const mockPrompt: Prompt = {
  id: 'p-1',
  slug: 'test-prompt',
  title_bn: 'টেস্ট প্রম্পট',
  title_en: 'Test Prompt',
  description_bn: 'বর্ণনা',
  description_en: 'Description',
  prompt_template: 'Write about {topic} in {tone} tone',
  category_id: 'cat-1',
  tags: ['test', 'demo'],
  use_case_bn: null,
  use_case_en: null,
  example_input: 'Sample input',
  example_output: 'Sample output',
  author_name: 'Author',
  author_avatar: null,
  price: 0,
  is_free: true,
  rating: 4.5,
  rating_count: 10,
  copy_count: 50,
  view_count: 100,
  is_featured: true,
  created_at: '2024-01-01',
  category: { id: 'cat-1', slug: 'business', name_bn: 'ব্যবসা', name_en: 'Business', description_bn: null, description_en: null, icon: null },
};

describe('promptToPromptData', () => {
  it('converts Prompt to PromptData format correctly', () => {
    const result = promptToPromptData(mockPrompt);

    expect(result.id).toBe('p-1');
    expect(result.slug).toBe('test-prompt');
    expect(result.title).toBe('Test Prompt');
    expect(result.titleBn).toBe('টেস্ট প্রম্পট');
    expect(result.category).toBe('Business');
    expect(result.categoryBn).toBe('ব্যবসা');
    expect(result.rating).toBe(4.5);
    expect(result.usageCount).toBe(50);
    expect(result.demoInput).toBe('Sample input');
    expect(result.demoOutput).toBe('Sample output');
  });

  it('extracts template variables correctly', () => {
    const result = promptToPromptData(mockPrompt);
    expect(result.variables).toEqual(['topic', 'tone']);
  });

  it('does not duplicate variables', () => {
    const prompt = { ...mockPrompt, prompt_template: '{topic} and {topic} with {style}' };
    const result = promptToPromptData(prompt);
    expect(result.variables).toEqual(['topic', 'style']);
  });

  it('returns undefined variables when template has none', () => {
    const prompt = { ...mockPrompt, prompt_template: 'No variables here' };
    const result = promptToPromptData(prompt);
    expect(result.variables).toBeUndefined();
  });

  it('uses fallback category names when category is undefined', () => {
    const prompt = { ...mockPrompt, category: undefined };
    const result = promptToPromptData(prompt);
    expect(result.category).toBe('General');
    expect(result.categoryBn).toBe('সাধারণ');
  });

  it('uses fallback author when author_name is null', () => {
    const prompt = { ...mockPrompt, author_name: null };
    const result = promptToPromptData(prompt);
    expect(result.author).toBe('Anonymous');
    expect(result.authorBn).toBe('বেনামী');
  });
});

describe('search sanitization', () => {
  it('escapes % wildcard in search input', () => {
    const input = '100% off';
    const sanitized = input.replace(/[%_\\]/g, '\\$&');
    expect(sanitized).toBe('100\\% off');
  });

  it('escapes _ wildcard in search input', () => {
    const input = 'user_name';
    const sanitized = input.replace(/[%_\\]/g, '\\$&');
    expect(sanitized).toBe('user\\_name');
  });

  it('escapes backslash in search input', () => {
    const input = 'path\\to\\file';
    const sanitized = input.replace(/[%_\\]/g, '\\$&');
    expect(sanitized).toBe('path\\\\to\\\\file');
  });

  it('escapes multiple special characters together', () => {
    const input = '50%_discount\\sale';
    const sanitized = input.replace(/[%_\\]/g, '\\$&');
    expect(sanitized).toBe('50\\%\\_discount\\\\sale');
  });

  it('leaves normal text unchanged', () => {
    const input = 'বাংলা prompt test';
    const sanitized = input.replace(/[%_\\]/g, '\\$&');
    expect(sanitized).toBe('বাংলা prompt test');
  });
});

describe('usePrompts query construction', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('builds query with category filter', async () => {
    const { usePrompts } = await import('../usePrompts');

    const mockCategoryChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: { id: 'cat-1' }, error: null }),
      maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }),
    };

    const mockPromptsChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      neq: vi.fn().mockReturnThis(),
      or: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({ data: [], error: null }),
      in: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }),
    };

    (mockSupabase.from as any).mockImplementation((table: string) => {
      if (table === 'categories') return mockCategoryChain;
      return mockPromptsChain;
    });

    const { result } = renderHook(
      () => usePrompts({ categorySlug: 'business' }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(mockSupabase.from).toHaveBeenCalledWith('categories');
    expect(mockSupabase.from).toHaveBeenCalledWith('prompts_public');
  });

  it('builds query with search filter using sanitized input', async () => {
    const { usePrompts } = await import('../usePrompts');

    const mockChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      or: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({ data: [], error: null }),
      in: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }),
    };
    (mockSupabase.from as any).mockReturnValue(mockChain);

    const { result } = renderHook(
      () => usePrompts({ search: '50% off_sale' }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    // The .or() call should contain escaped wildcards
    expect(mockChain.or).toHaveBeenCalledWith(
      expect.stringContaining('50\\% off\\_sale')
    );
  });

  it('builds query with featured filter', async () => {
    const { usePrompts } = await import('../usePrompts');

    const mockChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      or: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({ data: [], error: null }),
      in: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }),
    };
    (mockSupabase.from as any).mockReturnValue(mockChain);

    const { result } = renderHook(
      () => usePrompts({ isFeatured: true }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(mockChain.eq).toHaveBeenCalledWith('is_featured', true);
  });

  it('applies limit to query', async () => {
    const { usePrompts } = await import('../usePrompts');

    const mockChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      or: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({ data: [], error: null }),
      in: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }),
    };
    (mockSupabase.from as any).mockReturnValue(mockChain);

    const { result } = renderHook(
      () => usePrompts({ limit: 5 }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(mockChain.limit).toHaveBeenCalledWith(5);
  });
});
