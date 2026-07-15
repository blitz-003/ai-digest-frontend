

"use client";


import {
 useParams
} from "next/navigation";


import {
 useArticle
} from "@/features/articles/hooks/useArticle";



export default function ArticleContent(){


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

