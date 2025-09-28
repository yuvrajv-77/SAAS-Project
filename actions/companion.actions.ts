"use server"
import { createSupabaseClient } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";

/**
 * Creates a new companion in the database.
 * @param {CreateCompanion} formData - The data to create the companion with.
 * @returns {Promise<Companion>} - The newly created companion.
 * @throws {Error} - If there was an error creating the companion.
 */
export const createCompanion = async (formdata: CreateCompanion) => {
    const { userId: author } = await auth();
    const supabase = createSupabaseClient();

    const { data, error } = await supabase
        .from('companions')
        .insert({ ...formdata, author })
        .select();

    if(error || !data){
        throw new Error(error?.message || "Failed to create a companion");
    }

    return data[0];
};