import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { mockSupabase } from '@/test/__mocks__/supabase';

// Mock useAuth and useToast
vi.mock('../useAuth', () => ({
  useAuth: vi.fn(),
}));

const mockToast = vi.fn();
vi.mock('../use-toast', () => ({
  useToast: () => ({ toast: mockToast }),
}));

import { usePurchase } from '../usePurchase';
import { useAuth } from '../useAuth';

const mockUseAuth = vi.mocked(useAuth);

describe('usePurchase', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset window.location
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { ...window.location, search: '', pathname: '/prompt/test', href: '' },
    });
    window.history.replaceState = vi.fn();
  });

  it('returns hasPurchased=false when no user', async () => {
    mockUseAuth.mockReturnValue({ user: null, session: null, loading: false, signOut: vi.fn() });

    const { result } = renderHook(() => usePurchase('prompt-1'));

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.hasPurchased).toBe(false);
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('checks purchase status for authenticated user', async () => {
    const mockUser = { id: 'user-1' } as any;
    mockUseAuth.mockReturnValue({ user: mockUser, session: {} as any, loading: false, signOut: vi.fn() });

    const mockChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({ data: { id: 'purchase-1' }, error: null }),
    };
    mockSupabase.from.mockReturnValue(mockChain);

    const { result } = renderHook(() => usePurchase('prompt-1'));

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.hasPurchased).toBe(true);
    expect(mockSupabase.from).toHaveBeenCalledWith('prompt_purchases');
  });

  it('shows toast on purchase=cancelled URL param', async () => {
    mockUseAuth.mockReturnValue({ user: null, session: null, loading: false, signOut: vi.fn() });
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { ...window.location, search: '?purchase=cancelled', pathname: '/prompt/test' },
    });

    renderHook(() => usePurchase('prompt-1'));

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({ variant: 'destructive' })
      );
    });
  });

  it('shows login toast when initiating checkout without auth', async () => {
    mockUseAuth.mockReturnValue({ user: null, session: null, loading: false, signOut: vi.fn() });

    const { result } = renderHook(() => usePurchase('prompt-1'));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await result.current.initiateCheckout();
    });

    expect(mockToast).toHaveBeenCalledWith(
      expect.objectContaining({ variant: 'destructive' })
    );
  });

  it('validates checkout URL domain', async () => {
    const mockUser = { id: 'user-1' } as any;
    const mockSession = { access_token: 'token' } as any;
    mockUseAuth.mockReturnValue({ user: mockUser, session: mockSession, loading: false, signOut: vi.fn() });

    // Mock purchase check
    const mockChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }),
    };
    mockSupabase.from.mockReturnValue(mockChain);

    // Return an invalid URL
    mockSupabase.functions.invoke.mockResolvedValue({
      data: { url: 'https://evil.com/checkout' },
      error: null,
    });

    const { result } = renderHook(() => usePurchase('prompt-1'));
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await result.current.initiateCheckout();
    });

    // Should show error toast for invalid URL domain
    expect(mockToast).toHaveBeenCalledWith(
      expect.objectContaining({ variant: 'destructive' })
    );
    // Should NOT redirect
    expect(window.location.href).not.toContain('evil.com');
  });
});
