'use server';
import { CommentForm } from "@/components/CommentForm";
import { CommentList } from "@/components/CommentList";
import { Vote } from "@/components/Vote";
import { auth } from "@/auth";
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deletePostAction } from "@/actions/posts";

export async function generateMetadata({ params }) {
  const postId = params.postId;
  const { rows: posts } = await db.query(
    `SELECT title FROM posts WHERE id = $1 LIMIT 1;`,
    [postId]
  );
  const post = posts[0];
  return {
    title: post ? post.title : "Post"
  };
}

export default async function SinglePostPage({ params }) {
  const postId = params.postId;
  const session = await auth();

  const { rows: posts } = await db.query(
    `SELECT posts.id, posts.title, posts.body, posts.created_at, posts.user_id, users.name, users.image, 
    COALESCE(SUM(votes.vote), 0) AS vote_total
    FROM posts
    JOIN users ON posts.user_id = users.id
    LEFT JOIN votes ON votes.post_id = posts.id
    WHERE posts.id = $1
    GROUP BY posts.id, posts.title, posts.body, posts.created_at, posts.user_id, users.name, users.image
    LIMIT 1;`,
    [postId]
  );
  const post = posts[0];
  // Debug: log session and post user ids
  console.log('session.user.id:', session?.user?.id, 'post.user_id:', post?.user_id);

  const { rows: votes } = await db.query(
    `SELECT *, users.name from votes
     JOIN users on votes.user_id = users.id`
  );

  return (
    <div className="max-w-screen-lg mx-auto pt-4 pr-4">
      <div className="flex space-x-6">
        {/* Center items vertically */}
        <div className="flex items-center space-x-6">
          <Vote postId={post.id} votes={post.vote_total} />
          <img
            src={post.image}
            alt={post.name}
            className="w-10 h-10 rounded-full aspect-square object-cover border border-zinc-300 dark:border-zinc-700"
          />
        </div>
        <div className="">
          <h1 className="text-2xl">{post.title}</h1>
          <p className="text-zinc-400 mb-4">Posted by {post.name}</p>
          {session?.user?.id === post.user_id && (
            <form action={deletePostAction.bind(null, post.id)}>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded mt-2">Delete Post</button>
            </form>
          )}
        </div>
      </div>
      <main className="whitespace-pre-wrap m-4">{post.body}</main>

      <CommentForm postId={post.id} />
      <CommentList postId={post.id} session={session} />
    </div>
  );
}
