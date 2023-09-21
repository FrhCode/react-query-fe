import axios from "@/service/axios";
import LaravelResponse from "@/type/laravel-response";
import Post from "@/type/post";

export async function getPosts(page = 1, category_id = "") {
  const { data } = await axios.get<LaravelResponse<Post[]>>("/posts", {
    params: { page, category_id },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    },
  });
  return data;
}

export async function createPost(formData: FormData) {
  const { data } = await axios.post("/posts", formData);

  return data;
}
