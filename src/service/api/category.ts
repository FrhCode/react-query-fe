import axios from "@/service/axios";
import Category from "@/type/category";

export async function getCategories() {
  const { data } = await axios.get<{ data: Category[] }>("/categories");
  return data;
}
