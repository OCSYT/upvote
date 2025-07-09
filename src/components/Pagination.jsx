import { POSTS_PER_PAGE } from "@/config";
import { db } from "@/db";
import clsx from "clsx";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export async function Pagination({ currentPage = 1 }) {
  const { rows: postCount } = await db.query(`SELECT COUNT(*) FROM posts`);
  const count = Number(postCount[0].count);
  const numOfPages = Math.ceil(count / POSTS_PER_PAGE);

  if (numOfPages <= 1) return null;

  // Clamp currentPage to at least 1
  const safeCurrentPage = Math.max(1, currentPage);

  return (
    <ul className="flex w-1/2 mx-auto space-x-3 text-2xl">
      {safeCurrentPage > 1 && (
        <li>
          <a
            href={safeCurrentPage - 1 === 1 ? `/` : `/page/${safeCurrentPage - 1}`}
            className="p-2 hover:bg-zinc-800 block text-zinc-400"
          >
            <GrFormPrevious />
          </a>
        </li>
      )}
      {Array.from({ length: numOfPages }, (_, index) => {
        const page = index + 1;
        return (
          <li key={page} className="items-center flex">
            <a
              href={page === 1 ? `/` : `/page/${page}`}
              className={clsx(`hover:bg-zinc-800 px-3 py-1 rounded`, {
                "text-pink-400 font-bold bg-zinc-200 dark:bg-zinc-700": safeCurrentPage === page,
                "text-zinc-700 dark:text-zinc-200": safeCurrentPage !== page,
              })}
            >
              {page}
            </a>
          </li>
        );
      })}
      {safeCurrentPage < numOfPages && (
        <li>
          <a
            href={`/page/${safeCurrentPage + 1}`}
            className="p-2 hover:bg-zinc-800 block"
          >
            <GrFormNext />
          </a>
        </li>
      )}
    </ul>
  );
}
