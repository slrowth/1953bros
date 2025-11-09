import { createBrowserClient } from '@supabase/ssr';

export type SupabaseBrowserClient = ReturnType<typeof createBrowserClient<any>>;

export function createClient(): SupabaseBrowserClient | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Supabase 환경 변수가 설정되어 있지 않습니다. 더미 데이터를 사용합니다.');
    }
    return null;
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
