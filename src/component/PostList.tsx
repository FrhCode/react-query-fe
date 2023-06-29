import usePosts from "@/hooks/usePosts";
import tryParseInt from "@/utils/try-parse-int";
import { useSearchParams } from "react-router-dom";
import AddPostForm from "./AddPostForm";
import removeFalsyValues from "@/utils/remove-falsy-values";

export default function PostList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category_id = searchParams.get("category_id") || "";
  const page = tryParseInt(searchParams.get("page"));

  const { data, status, error } = usePosts(page, category_id);

  const handleClick = (number: number) => {
    const pageIsOneIfUndefined = page || 1;
    const query = removeFalsyValues({
      page: pageIsOneIfUndefined + number,
      category_id,
    });
    setSearchParams(query);
  };

  if (status === "pending") return <p>Loading...</p>;
  if (status === "error") return <p>{error.message}</p>;

  return (
    <>
      <ul>
        {data.data.map((post) => {
          return <li key={post.id}>{post.title}</li>;
        })}
      </ul>

      <div className="space-x-2">
        <button
          disabled={!data.links.prev}
          onClick={() => handleClick(-1)}
          className="rounded bg-blue-600 px-3 py-2 text-white cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <button
          disabled={!data.links.next}
          onClick={() => handleClick(1)}
          className="rounded bg-blue-600 px-3 py-2 text-white cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
        >
          Next
        </button>
        <p>
          Menampilkan {data.meta.from} sampai {data.meta.to} dari{" "}
          {data.meta.total}
        </p>
      </div>
      <br />
      <br />
      <AddPostForm />
    </>
  );
}
