import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { mockSupabase } from '@/test/__mocks__/supabase';

// Mock useAuth before importing useAdmin
vi.mock('../useAuth', () => ({
  useAuth: vi.fn(),
}));

import { useAdmin } from '../useAdmin';
import { useAuth } from '../useAuth';

const mockUseAuth = vi.mocked(useAuth);

describe('useAdmin', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns isAdmin=false when no user', async () => {
    mockUseAuth.mockReturnValue({ user: null, session: null, loading: false, signOut: vi.fn() });

    const { result } = renderHook(() => useAdmin());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.isAdmin).toBe(false);
  });

  it('returns isAdmin=true when rpc returns true', async () => {
    mockUseAuth.mockReturnValue({
      user: { id: 'user-1' } as any,
      session: {} as any,
      loading: false,
      signOut: vi.fn(),
    });
    mockSupabase.rpc.mockResolvedValue({ data: true, error: null });

    const { result } = renderHook(() => useAdmin());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.isAdmin).toBe(true);
    expect(mockSupabase.rpc).toHaveBeenCalledWith('is_admin');
  });

  it('returns isAdmin=false when rpc returns false', async () => {
    mockUseAuth.mockReturnValue({
      user: { id: 'user-1' } as any,
      session: {} as any,
      loading: false,
      signOut: vi.fn(),
    });
    mockSupabase.rpc.mockResolvedValue({ data: false, error: null });

    const { result } = renderHook(() => useAdmin());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.isAdmin).toBe(false);
  });

  it('returns isAdmin=false on rpc error', async () => {
    mockUseAuth.mockReturnValue({
      user: { id: 'user-1' } as any,
      session: {} as any,
      loading: false,
      signOut: vi.fn(),
    });
    mockSupabase.rpc.mockResolvedValue({ data: null, error: { message: 'fail' } });

    const { result } = renderHook(() => useAdmin());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.isAdmin).toBe(false);
  });

  it('returns isAdmin=false on rpc exception', async () => {
    mockUseAuth.mockReturnValue({
      user: { id: 'user-1' } as any,
      session: {} as any,
      loading: false,
      signOut: vi.fn(),
    });
    mockSupabase.rpc.mockRejectedValue(new Error('network error'));

    const { result } = renderHook(() => useAdmin());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.isAdmin).toBe(false);
  });
});
