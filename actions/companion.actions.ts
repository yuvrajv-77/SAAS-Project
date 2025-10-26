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

    if (error || !data) {
        throw new Error(error?.message || "Failed to create a companion");
    }

    return data[0];
};

export const getAllCompanions = async ({ limit = 10, page = 1, subject, topic }: GetAllCompanions) => {
    // Assuming createSupabaseClient() is defined elsewhere to initialize your client
    const supabase = createSupabaseClient();

    let query = supabase.from('companions').select();

    // Dynamically apply filters based on provided parameters
    if (subject && topic) {
        query = query.ilike('subject', `%${subject}%`)
            .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
    } else if (subject) {
        query = query.ilike('subject', `%${subject}%`);
    } else if (topic) {
        query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
    }

    // Apply pagination to the query
    query = query.range((page - 1) * limit, page * limit - 1);

    // Execute the final query and handle the response
    const { data: companions, error } = await query;

    if (error) {
        console.error('Error fetching companions:', error);
        throw new Error(error.message);
    }

    return { companions };
};