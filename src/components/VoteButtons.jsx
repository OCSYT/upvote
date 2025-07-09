"use client";

import { useFormStatus } from "react-dom";
import clsx from "clsx";
import {
  TbArrowBigDown,
  TbArrowBigDownFilled,
  TbArrowBigUp,
  TbArrowBigUpFilled,
} from "react-icons/tb";
import { FaSpinner } from "react-icons/fa";
import { useSession } from "next-auth/react";

export function VoteButtons({ upvote, downvote, votes, existingVote }) {
  const { pending } = useFormStatus();
  const { data: session } = useSession();

  function handleNotLoggedIn(e) {
    e.preventDefault();
    alert("You must be logged in to vote.");
  }

  return (
    <>
      <button
        formAction={session ? upvote : undefined}
        onClick={!session ? handleNotLoggedIn : undefined}
        disabled={pending}
      >
        {existingVote?.vote === 1 ? (
          <TbArrowBigUpFilled
            size={24}
            className={clsx("hover:text-orange-600", {
              "text-pink-300": existingVote?.vote === 1,
            })}
          />
        ) : (
          <TbArrowBigUp
            size={24}
            className={clsx("hover:text-orange-600", {
              "text-pink-300": existingVote?.vote === 1,
            })}
          />
        )}
      </button>
      <span className="w-6 text-center tabular-nums">
        {pending ? (
          <span className="animate-spin h-6  w-6 flex items-center justify-center">
            <FaSpinner />
          </span>
        ) : (
          votes
        )}
      </span>
      <button
        formAction={session ? downvote : undefined}
        onClick={!session ? handleNotLoggedIn : undefined}
        disabled={pending}
      >
        {existingVote?.vote === -1 ? (
          <TbArrowBigDownFilled
            size={24}
            className={clsx("hover:text-blue-600", {
              "text-blue-300": existingVote?.vote === -1,
            })}
          />
        ) : (
          <TbArrowBigDown
            size={24}
            className={clsx("hover:text-blue-600", {
              "text-blue-300": existingVote?.vote === -1,
            })}
          />
        )}
      </button>
    </>
  );
}
