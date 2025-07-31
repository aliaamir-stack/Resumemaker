import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fjbraygvtowdzoparrtp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqYnJheWd2dG93ZHpvcGFycnRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2MDU4ODQsImV4cCI6MjA2OTE4MTg4NH0.2Ehb2FlDJjAFlLyDQMhyUr8LbaI40LJ6jvC6liNG8zM';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function verifySupabaseToken(token: string) {
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error) throw error;
    return user;
  } catch (error) {
    console.error('Error verifying Supabase token:', error);
    return null;
  }
}
