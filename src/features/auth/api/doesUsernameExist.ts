import { supabase } from '@/utils/supabase'

export async function doesUsernameExist(username: any) {
    const result = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        
    return result;
}