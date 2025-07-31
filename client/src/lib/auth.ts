import { supabase } from './supabase';
import { User } from '@supabase/supabase-js';
import { apiRequest } from './queryClient';

export async function signInWithMagicLink(email: string) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  
  if (error) throw error;
  return { success: true };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser(): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getAuthHeaders() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) {
    throw new Error('No authentication token found');
  }
  
  return {
    'Authorization': `Bearer ${session.access_token}`,
  };
}

export async function authenticatedRequest(
  method: string,
  url: string,
  data?: unknown
): Promise<Response> {
  const headers = await getAuthHeaders();
  
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: data ? JSON.stringify(data) : undefined,
    credentials: 'include',
  });

  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }

  return res;
}
