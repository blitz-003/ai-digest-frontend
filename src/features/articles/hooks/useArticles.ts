

import {
 useQuery
} from "@tanstack/react-query";

import {
 getArticles
} from "../api/article.api";


export function useArticles(params?:any){

 return useQuery({

  queryKey:[
   "articles",
   params
  ],

  queryFn:()=>getArticles(params)

 });

}

