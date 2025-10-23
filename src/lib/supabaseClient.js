import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uzltampqbnfiacjcmalw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6bHRhbXBxYm5maWFjamNtYWx3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwOTY0MTYsImV4cCI6MjA2MzY3MjQxNn0.k7abilMuG_uLif_qV-U7O1RvMd240OA_TXqVoXogo64'
export const supabase = createClient(supabaseUrl, supabaseKey)
