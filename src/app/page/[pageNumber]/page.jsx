import { PostList } from "@/components/PostList";

export default async function PageNumberRoute({ params }) {
  const page = Math.max(1, parseInt(params.pageNumber, 10));
  return (
    <div>
      <PostList currentPage={page} />
    </div>
  );
}
