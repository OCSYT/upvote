"use server";
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deletePostAction(postId) {
  await db.query("DELETE FROM posts WHERE id = $1", [postId]);
  revalidatePath("/");
  redirect("/");
} 