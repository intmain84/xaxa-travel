import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://pvklylypdkaqlgdnwfzy.supabase.co'
const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2a2x5bHlwZGthcWxnZG53Znp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc3MjAwNDMsImV4cCI6MjA0MzI5NjA0M30.gVSFhSuLXYjJXM6Xj2wvU3bb5p4rcfyLROk-ZJLNmCQ'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
