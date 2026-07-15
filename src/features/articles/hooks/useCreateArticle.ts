

import {
 useMutation,
 useQueryClient
} from "@tanstack/react-query";


import {
 createArticle
} from "../api/article.api";


export function useCreateArticle(){

 const queryClient =
 useQueryClient();


 return useMutation({

  mutationFn:createArticle,


  onSuccess(){

   queryClient.invalidateQueries({

    queryKey:[
     "articles"
    ]

   });

  }

 });

}

