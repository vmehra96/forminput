"use server"

import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function submitLead(formData: FormData) {
  try {
    const leadData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      contact_number: formData.get("contactNumber") as string,
      company: formData.get("company") as string,
      title: formData.get("title") as string,
      industry: formData.get("industry") as string,
      created_at: new Date().toISOString(),
    }

    const { data, error } = await supabase.from("leads").insert([leadData]).select()

    if (error) {
      console.error("Supabase error:", error)
      return { success: false, error: "Failed to submit form" }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Server error:", error)
    return { success: false, error: "Server error occurred" }
  }
}
