import { createClient } from '@supabase/supabase-js'

let url = 'https://rnjtuhghnzfcozkdmwen.supabase.co'
let publicKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuanR1aGdobnpmY296a2Rtd2VuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg4ODI3MTksImV4cCI6MTk5NDQ1ODcxOX0.4Yq52hF8dgz7KEM1K2ClKVdb-dLCT4jpa0gURBDlKAU'

export const supabase = createClient(url, publicKey)