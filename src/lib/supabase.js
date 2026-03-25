import { createClient } from '@supabase/supabase-js'

// Main Instance (Vrindopnishad Blog)
const supabaseUrl = 'https://opakgafcintfmuqtarqd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wYWtnYWZjaW50Zm11cXRhcnFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzNTA5NjMsImV4cCI6MjA4OTkyNjk2M30.lV_-ndxlxQMIY0vJFfbxN70zx9YhAl5DBLipws7JaFs'

// Legacy Instance (Old Dashboard Content)
const legacyUrl = 'https://tilimltxgeucefxzerqi.supabase.co'
const legacyAnonKey = 'sb_publishable_0YiM-Q8itRORUDdToracaQ_vzcrjUlC' // RESTORED LEGACY KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export const legacySupabase = createClient(legacyUrl, legacyAnonKey)
