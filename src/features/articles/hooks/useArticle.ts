

import {
 useQuery
} from "@tanstack/react-query";

import {
 getArticle
} from "../api/article.api";


export function useArticle(
 id:string
){

 return useQuery({

  queryKey:[
   "article",
   id
  ],

  queryFn:()=>getArticle(id),

  enabled:Boolean(id)

 });

}

