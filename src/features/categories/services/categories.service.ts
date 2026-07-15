import api from "@/lib/axios";

import {
    Category
} from "../types/categories.types";



export async function getCategories(){

    const response =
        await api.get<Category[]>(
            "/categories"
        );


    return response.data;

}