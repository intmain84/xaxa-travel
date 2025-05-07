import { createClient } from '@supabase/supabase-js'
export const sbu = import.meta.env.VITE_SBU
const sbk = import.meta.env.VITE_SBK
const supabase = createClient(sbu, sbk)

export default supabase
