import api from "@/lib/axios";


export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}


export async function getCategories() {

  const response = await api.get<Category[]>(
    "/categories"
  );


  return response.data;

}