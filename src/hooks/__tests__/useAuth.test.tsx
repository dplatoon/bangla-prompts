import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { mockSupabase, mockSubscription } from '@/test/__mocks__/supabase';
import { useAuth } from '../useAuth';

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.auth.getSession.mockResolvedValue({ data: { session: null } });
  });

  it('starts with loading=true and no user', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.loading).toBe(true);
    expect(result.current.user).toBeNull();
    expect(result.current.session).toBeNull();
  });

  it('sets user and session from getSession', async () => {
    const mockUser = { id: 'user-1', email: 'test@test.com' };
    const mockSession = { user: mockUser, access_token: 'token' };
    mockSupabase.auth.getSession.mockResolvedValue({ data: { session: mockSession } });

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.session).toEqual(mockSession);
  });

  it('responds to auth state changes', async () => {
    let authCallback: any;
    (mockSupabase.auth.onAuthStateChange as any).mockImplementation((cb: any) => {
      authCallback = cb;
      return { data: { subscription: mockSubscription } };
    });

    const { result } = renderHook(() => useAuth());

    const mockUser = { id: 'user-2', email: 'new@test.com' };
    const mockSession = { user: mockUser, access_token: 'token2' };

    act(() => {
      authCallback('SIGNED_IN', mockSession);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.session).toEqual(mockSession);
    expect(result.current.loading).toBe(false);
  });

  it('clears user on sign out event', async () => {
    let authCallback: any;
    (mockSupabase.auth.onAuthStateChange as any).mockImplementation((cb: any) => {
      authCallback = cb;
      return { data: { subscription: mockSubscription } };
    });

    const { result } = renderHook(() => useAuth());

    act(() => {
      authCallback('SIGNED_OUT', null);
    });

    expect(result.current.user).toBeNull();
    expect(result.current.session).toBeNull();
  });

  it('calls supabase.auth.signOut on signOut', async () => {
    const { result } = renderHook(() => useAuth());
    await act(async () => {
      await result.current.signOut();
    });
    expect(mockSupabase.auth.signOut).toHaveBeenCalled();
  });

  it('unsubscribes on unmount', () => {
    const { unmount } = renderHook(() => useAuth());
    unmount();
    expect(mockSubscription.unsubscribe).toHaveBeenCalled();
  });
});
