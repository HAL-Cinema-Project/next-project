import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!supabaseUrl) {
	throw new Error('SUPABASE_URL is required.');
}

if (!supabaseKey) {
	throw new Error('SUPABASE_KEY is required.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
