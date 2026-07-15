

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
href={`/articles/${article.id}`}
className="mt-4 inline-block text-primary"
>

Read More

</Link>


</div>

);


}

