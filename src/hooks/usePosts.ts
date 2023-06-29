import { getPosts } from "@/service/api/post";
import LaravelResponse from "@/type/laravel-response";
import Post from "@/type/post";
import { useQuery } from "@tanstack/react-query";

export default function usePosts(page = 1, category_id = "") {
  return useQuery<LaravelResponse<Post[]>, { message: string }>({
    queryKey: ["posts", page, category_id],
    queryFn: () => getPosts(page, category_id),
  });
}
