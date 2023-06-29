import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useCategories from "@/hooks/useCategories";
import { createPost } from "@/service/api/post";
import { useSearchParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type FormData = {
  title: string;
  author: string;
  category_id: string;
};

const schema = z.object({
  title: z.string().nonempty("title is required"),
  author: z.string().nonempty("author is required"),
  category_id: z.string().nonempty("category_id is required"),
});

export default function AddPostForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const queryClient = useQueryClient();
  const { data, status, error } = useCategories();
  const [, setSearchParams] = useSearchParams();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      reset();
      setSearchParams({});
      queryClient.invalidateQueries({ queryKey: ["posts", 1, ""] });
    },
  });

  const onSubmit = handleSubmit(async ({ author, category_id, title }) => {
    console.log(data);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("author", author);
    formData.append("category_id", category_id);

    mutation.mutate(formData);
  });

  if (status === "pending") return <p>Loading...</p>;
  if (status === "error") return <p>{error.message}</p>;

  return (
    <form onSubmit={onSubmit} className="space-y-1">
      <div>
        <input type="text" placeholder="title" {...register("title")} />
        {errors.title && <p>{errors.title.message}</p>}
      </div>
      <div>
        <input type="text" placeholder="author" {...register("author")} />
        {errors.author && <p>{errors.author.message}</p>}
      </div>
      <div>
        <select id="" {...register("category_id")}>
          {data.data.map(({ id, name }) => {
            return (
              <option key={id} value={id}>
                {name}
              </option>
            );
          })}
        </select>
        {errors.category_id && <p>{errors.category_id.message}</p>}
      </div>
      <button
        className="rounded bg-blue-600 px-3 py-2 text-white cursor-pointer disabled:opacity-70"
        disabled={mutation.isPending}
      >
        submit
      </button>
    </form>
  );
}
