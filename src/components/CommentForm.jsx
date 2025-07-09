"use client";

import { saveComment } from "@/actions/comments";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { CommentFormButton } from "./CommentFormButton";

export function CommentForm({ postId, parentCommentId }) {
  const [state, dispatch] = useFormState(saveComment, {
    postId,
    parentCommentId,
  });
  const boundDispatch = dispatch.bind({ postId, parentCommentId });
  const [isOpen, setOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (state.success) {
      setOpen(false);
    }
  }, [state.success]);

  return (
    <div className="ml-4">
      {session && (
        <button onClick={() => setOpen(!isOpen)} className="text-zinc-400">
          {isOpen ? "Close" : "Reply"}
        </button>
      )}
      {isOpen ? (
        <>
          <form action={boundDispatch} className="flex flex-col space-y-3">
            <textarea
              name="comment"
              className="bg-zinc-200 p-3 rounded"
              placeholder="Type your comment..."
            />
            <CommentFormButton />
          </form>
        </>
      ) : null}
    </div>
  );
}
