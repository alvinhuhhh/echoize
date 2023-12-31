"use server";

import { z } from "zod";
import { headers, cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

import { Database } from "@/lib/supabase";
import { getHttpOrHttps } from "@/lib/utils";
import { Board, Post, Status } from "@/lib/definitions";
import { revalidatePath } from "next/cache";

export type SigninState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

const SigninFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function signin(prevState: SigninState, formData: FormData) {
  const cookieStore = cookies();
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore,
  });

  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If validation fails, return early with errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid credentials. Please fill in all required fields.",
    };
  }

  const { email, password } = validatedFields.data;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      errors: {},
      message: error.message,
    };
  }

  redirect("/dashboard");
}

export type SignupState = {
  errors?: {
    email?: string[];
    password?: string[];
    displayName?: string[];
  };
  message?: string | null;
};

const SignupFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  displayName: z.string().optional(),
});

export async function signup(prevState: SignupState, formData: FormData) {
  const headersList = headers();
  const cookieStore = cookies();
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore,
  });
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    displayName: formData.get("displayName"),
  });

  // If validation fails, return early with errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Please fill in all required fields.",
    };
  }

  const { email, password, displayName } = validatedFields.data;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${getHttpOrHttps()}${headersList.get(
        "host"
      )}/auth/callback`,
    },
  });

  // If Supabase Auth signup fails, return with error message
  if (error) {
    return {
      errors: {},
      message: error.message,
    };
  }

  // Insert additional info into user_infos table
  if (data.user) {
    await supabase.from("user_infos").insert({
      user_id: data.user.id,
      created_at: new Date().toUTCString(),
      display_name: displayName,
    });
  }

  redirect("/dashboard");
}

export async function getUserInfo(user_id: string) {
  const cookieStore = cookies();
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore,
  });

  const { data, error } = await supabase
    .from("user_infos")
    .select()
    .eq("user_id", user_id)
    .single();

  if (error) {
    return null;
  }

  return data;
}

export type BoardState = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

const BoardFormSchema = z.object({
  name: z.string().min(1),
});

export async function createBoard(prevState: BoardState, formData: FormData) {
  const cookieStore = cookies();
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore,
  });

  const validatedFields = BoardFormSchema.safeParse({
    name: formData.get("name"),
  });

  // If validation fails, return early with errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please fill in all required fields.",
    };
  }

  const { name } = validatedFields.data;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      errors: {},
      message: "User is not logged in.",
    };
  }

  const { error } = await supabase.from("boards").insert({
    user_id: session.user.id,
    created_at: new Date().toISOString(),
    name: name,
  });

  if (error) {
    return {
      errors: {},
      message: error.message,
    };
  }

  redirect("/dashboard");
}

export async function getBoards() {
  const cookieStore = cookies();
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return null;
  }

  const { data, error } = await supabase
    .from("boards")
    .select()
    .eq("user_id", session.user.id)
    .order("created_at");

  if (error) {
    return null;
  }

  return data as Board[];
}

export async function getBoardById(board_id: string) {
  const cookieStore = cookies();
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return null;
  }

  const { data, error } = await supabase
    .from("boards")
    .select()
    .eq("id", board_id)
    .single();

  if (error) {
    return null;
  }

  return data as Board;
}

export async function updateBoard(
  board_id: string,
  prevState: BoardState,
  formData: FormData
) {
  const cookieStore = cookies();
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore,
  });

  const validatedFields = BoardFormSchema.safeParse({
    name: formData.get("name"),
  });

  // If validation fails, return early with errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please fill in all required fields.",
    };
  }

  const { name } = validatedFields.data;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      errors: {},
      message: "User is not logged in.",
    };
  }

  const { error } = await supabase
    .from("boards")
    .update({ name: name })
    .eq("id", board_id);

  if (error) {
    return {
      errors: {},
      message: error.message,
    };
  }

  redirect("/dashboard");
}

export async function deleteBoard(board_id: string) {
  const cookieStore = cookies();
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return;
  }

  const { error } = await supabase.from("boards").delete().eq("id", board_id);

  if (error) {
    return;
  }

  revalidatePath("/dashboard");
}

export type PostState = {
  errors?: {
    title?: string[];
    description?: string[];
  };
  message?: string | null;
};

const PostFormSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export async function createPost(
  board_id: string,
  prevState: PostState,
  formData: FormData
) {
  const cookieStore = cookies();
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore,
  });

  const validatedFields = PostFormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
  });

  // If validation fails, return early with errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please fill in all required fields.",
    };
  }

  const { title, description } = validatedFields.data;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      errors: {},
      message: "User is not logged in.",
    };
  }

  const { error } = await supabase.from("posts").insert({
    board_id: board_id,
    title: title,
    description: description,
    status: Status.PENDING,
  });

  if (error) {
    return {
      errors: {},
      message: error.message,
    };
  }

  redirect("/dashboard");
}

export async function getPostCount(board_id: string) {
  const cookieStore = cookies();
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return null;
  }

  const { count, error } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true })
    .eq("board_id", board_id);

  if (error) {
    return null;
  }

  return count;
}

export async function getPostCountPerBoard() {
  const cookieStore = cookies();
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return null;
  }

  const { data, error } = await supabase
    .from("get_post_count_per_board")
    .select()
    .eq("user_id", session.user.id);

  if (error) {
    return null;
  }

  return data;
}

export async function getPostsForBoardId(board_id: string) {
  const cookieStore = cookies();
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return null;
  }

  const { data, error } = await supabase
    .from("posts")
    .select()
    .eq("board_id", board_id)
    .order("upvotes");

  if (error) {
    return null;
  }

  return data as Post[];
}

export async function updatePost(
  post_id: string,
  prevState: PostState,
  formData: FormData
) {
  const cookieStore = cookies();
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore,
  });

  const validatedFields = PostFormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
  });

  // If validation fails, return early with errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please fill in all required fields.",
    };
  }

  const { title, description } = validatedFields.data;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      errors: {},
      message: "User is not logged in.",
    };
  }

  const { error } = await supabase
    .from("posts")
    .update({ title: title, description: description })
    .eq("post_id", post_id);

  if (error) {
    return {
      errors: {},
      message: error.message,
    };
  }

  redirect("/dashboard");
}

export async function deletePost(id: string) {
  const cookieStore = cookies();
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return false;
  }

  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    return false;
  }

  return true;
}
