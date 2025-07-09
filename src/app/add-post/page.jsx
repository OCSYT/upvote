import { auth } from "@/auth";
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { LoginButton } from "@/components/LoginButton";
import { LogoutButton } from "@/components/LogoutButton";

export default async function Home() {
  const session = await auth();

  async function savePost(formData) {
    "use server";
    const content = formData.get("content");
    const title = formData.get("title");
    const userId = session?.user?.id;
    if (!userId) {
      throw new Error("You need to login");
    }

    await db.query(
      "INSERT INTO posts (title, body, user_id) VALUES ($1, $2, $3)",
      [title, content, userId]
    );

    revalidatePath("/");
    redirect("/");
  }

  if (!session) {
    return (
      <div className="max-w-screen-lg mx-auto p-4 mt-10">
        You need to login to create a post <LoginButton />
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto p-4 mt-10">
      <div className="bg-white dark:bg-zinc-900 shadow-lg rounded-xl p-8">
        <h2 className="text-3xl mb-4 text-zinc-900 dark:text-zinc-100 font-bold">Add a new post</h2>
        <form action={savePost} className="flex flex-col space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Post title..."
            className="px-4 py-2 rounded border border-zinc-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700 dark:focus:border-pink-400 dark:focus:ring-pink-900 transition"
          />
          <textarea
            name="content"
            className="px-4 py-2 rounded border border-zinc-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700 dark:focus:border-pink-400 dark:focus:ring-pink-900 transition"
            placeholder="Post content"
          />
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 text-xl rounded shadow transition disabled:opacity-50 disabled:cursor-not-allowed">
            Submit post
          </button>
        </form>
      </div>
    </div>
  );
}
