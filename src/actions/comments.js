"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { revalidatePath } from "next/cache";

export async function saveComment({ postId, parentCommentId }, formData) {
  const session = await auth();

  await db.query(
    "INSERT INTO comments (user_id, post_id, parent_comment_id, body) VALUES ($1, $2, $3, $4)",
    [session.user.id, postId, parentCommentId, formData.get("comment")]
  );

  revalidatePath(`/post/${postId}`);
  return { success: true };
}

export async function deleteCommentAction(commentId, postId) {
  "use server";
  await db.query("DELETE FROM comments WHERE id = $1", [commentId]);
  revalidatePath(`/post/${postId}`);
}
