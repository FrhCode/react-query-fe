import useCategories from "@/hooks/useCategories";
import removeFalsyValues from "@/utils/remove-falsy-values";
import { useSearchParams } from "react-router-dom";

export default function CategoryList() {
  const { data, status, error } = useCategories();
  const [, setSearchParams] = useSearchParams();

  const handleClick = (category_id: number) => {
    const query = removeFalsyValues({ category_id: category_id });
    setSearchParams(query);
  };

  if (status === "pending") return <p>Loading...</p>;
  if (status === "error") return <p>{error.message}</p>;

  return (
    <div className="flex gap-1 flex-wrap">
      {data.data.map(({ name, id }) => {
        return (
          <button
            key={id}
            className="rounded bg-blue-600 px-3 py-2 text-white cursor-pointer"
            onClick={() => handleClick(id)}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
}
