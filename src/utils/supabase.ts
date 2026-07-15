import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// ☁️ सुरक्षित क्लाउड हैंडशेक के लिए Supabase क्लाइंट जनरेट करना
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
