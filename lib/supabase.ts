import { auth } from "@clerk/nextjs/server"
import { createClient } from "@supabase/supabase-js"

/**
 * Creates a Supabase client instance with the given URL and anon key.
 * This function will also use the Clerk token to authenticate the client.
 * @returns {SupabaseClient} - The Supabase client instance.
 * @throws {Error} - If there was an error creating the client.
 */
export const createSupabaseClient = () => {
return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,{
        async accessToken(){
            return ((await auth()).getToken())
        }
    }
)
}