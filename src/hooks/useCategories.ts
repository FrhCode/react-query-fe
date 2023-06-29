import { getCategories } from "@/service/api/category";
import Category from "@/type/category";
import { useQuery } from "@tanstack/react-query";

export default function useCategories() {
  return useQuery<{ data: Category[] }>({
    queryKey: ["posts"],
    queryFn: () => getCategories(),
  });
}
