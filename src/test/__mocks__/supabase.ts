import { vi } from 'vitest';

export const mockSubscription = { unsubscribe: vi.fn() };

export const mockSupabase = {
  auth: {
    onAuthStateChange: vi.fn(() => ({
      data: { subscription: mockSubscription },
    })),
    getSession: vi.fn(() => Promise.resolve({ data: { session: null } })),
    signOut: vi.fn(() => Promise.resolve()),
  },
  rpc: vi.fn(() => Promise.resolve({ data: false, error: null })),
  from: vi.fn(() => ({
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    maybeSingle: vi.fn(() => Promise.resolve({ data: null, error: null })),
  })),
  functions: {
    invoke: vi.fn(() => Promise.resolve({ data: null, error: null })),
  },
};

vi.mock('@/integrations/supabase/client', () => ({
  supabase: mockSupabase,
}));
