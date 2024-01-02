// import supabase from "@/lib/supabase";
// import { unstable_noStore as noStore } from "next/cache";
// import { User } from "./definitions";
// import { PostgrestSingleResponse } from "@supabase/supabase-js";

// export async function getUser(username: string): Promise<User | undefined> {
//   // Add noStore() here prevent the response from being cached.
//   // This is equivalent to in fetch(..., {cache: 'no-store'}).
//   noStore();

//   try {
//     const response: PostgrestSingleResponse<User[]> = await supabase
//       .from("users")
//       .select()
//       .eq("username", username);

//     if (response.data) return response.data[0];
//   } catch (error) {
//     console.error("Database error: ", error);
//     throw new Error("Failed to get user.");
//   }
// }
