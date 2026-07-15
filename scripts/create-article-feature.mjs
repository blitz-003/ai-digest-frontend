import fs from "fs";
import path from "path";

const root = process.cwd();

const files = {
  "src/features/articles/types.ts": `

export interface Article {
  id:string;
  title:string;
  content:string;
  excerpt?:string;
  cover_image?:string;
  author_id:string;
  category_id?:string;
  created_at:string;
  updated_at:string;
}


export interface CreateArticlePayload {
  title:string;
  content:string;
  excerpt?:string;
  cover_image?:string;
  category_id?:string;
}


export interface UpdateArticlePayload {
  title?:string;
  content?:string;
  excerpt?:string;
  cover_image?:string;
  category_id?:string;
}

`,

  "src/features/articles/api/article.api.ts": `

import api from "@/lib/axios";

import {
 Article,
 CreateArticlePayload,
 UpdateArticlePayload
} from "../types";


export async function getArticles(params?:any){

 const response =
 await api.get<Article[]>(
  "/articles",
  {params}
 );

 return response.data;
}



export async function getArticle(
 id:string
){

 const response =
 await api.get<Article>(
  \`/articles/\${id}\`
 );

 return response.data;
}



export async function createArticle(
 data:CreateArticlePayload
){

 const response =
 await api.post<Article>(
  "/articles",
  data
 );

 return response.data;

}



export async function updateArticle(
 id:string,
 data:UpdateArticlePayload
){

 const response =
 await api.patch<Article>(
  \`/articles/\${id}\`,
  data
 );

 return response.data;

}



export async function deleteArticle(
 id:string
){

 await api.delete(
  \`/articles/\${id}\`
 );

}

`,

  "src/features/articles/hooks/useArticles.ts": `

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

`,

  "src/features/articles/hooks/useArticle.ts": `

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

`,

  "src/features/articles/hooks/useCreateArticle.ts": `

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

`,

  "src/features/articles/components/ArticleCard.tsx": `

import Link from "next/link";

import {
 Article
} from "../types";


export default function ArticleCard({
 article
}:{
 article:Article
}){


return (

<div className="rounded-xl border p-5">


<h2 className="text-xl font-bold">
{article.title}
</h2>


<p className="mt-3 text-muted-foreground line-clamp-3">
{article.content}
</p>



<Link
href={\`/articles/\${article.id}\`}
className="mt-4 inline-block text-primary"
>

Read More

</Link>


</div>

);


}

`,

  "src/app/articles/page.tsx": `

"use client";


import {
 useArticles
} from "@/features/articles/hooks/useArticles";

import ArticleCard from "@/features/articles/components/ArticleCard";


export default function ArticlesPage(){


const {
 data,
 isLoading
}=useArticles();



if(isLoading)
return <div>Loading...</div>



return (

<div className="container mx-auto py-10">


<h1 className="mb-8 text-3xl font-bold">
Articles
</h1>



<div className="grid gap-6 md:grid-cols-3">


{
data?.map(article=>(

<ArticleCard
key={article.id}
article={article}
/>

))
}


</div>


</div>

);


}

`,

  "src/app/articles/[articleId]/page.tsx": `

"use client";


import {
 useParams
} from "next/navigation";


import {
 useArticle
} from "@/features/articles/hooks/useArticle";



export default function ArticlePage(){


const params =
useParams();


const id =
params.articleId as string;



const {
 data,
 isLoading
}=useArticle(id);



if(isLoading)
return <div>Loading...</div>



return (

<article className="container mx-auto py-10">


<h1 className="text-4xl font-bold">
{data?.title}
</h1>


<div className="mt-8 whitespace-pre-line">

{data?.content}

</div>


</article>

);


}

`,

  "src/app/write/page.tsx": `

export default function WritePage(){

return (

<div className="container mx-auto py-10">

<h1 className="text-3xl font-bold">
Write Article
</h1>


</div>

)

}

`,
};

for (const file in files) {
  const filePath = path.join(root, file);

  fs.mkdirSync(path.dirname(filePath), {
    recursive: true,
  });

  if (fs.existsSync(filePath)) {
    console.log("Skipped:", file);
    continue;
  }

  fs.writeFileSync(filePath, files[file]);

  console.log("Created:", file);
}

console.log("\nArticle feature created successfully!");
