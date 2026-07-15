"use client";


import {
    useForm
} from "react-hook-form";


import {
    zodResolver
} from "@hookform/resolvers/zod";


import {
    z
} from "zod";


import {
    Input
} from "@/components/ui/input";


import {
    Textarea
} from "@/components/ui/textarea";


import {
    Button
} from "@/components/ui/button";


import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";


import {
    useRouter
} from "next/navigation";


import {
    useCreateArticle
} from "../hooks/useCreateArticle";


import ArticleEditor from "./ArticleEditor";


import {
    useCategories
} from "@/features/categories/hooks/useCategories";




const schema = z.object({

    title:
        z.string()
        .min(
            5,
            "Title must be at least 5 characters"
        ),


    summary:
        z.string()
        .min(
            20,
            "Summary must be at least 20 characters"
        ),


    content:
        z.string()
        .min(
            50,
            "Content must be at least 50 characters"
        ),


    cover_image:
        z.string()
        .optional()
        .or(
            z.literal("")
        ),


    category_id:
        z.string()
        .min(
            1,
            "Please select a category"
        ),

});



type FormData =
    z.infer<typeof schema>;





export default function CreateArticleForm(){


    const router =
        useRouter();



    const mutation =
        useCreateArticle();



    const {
        data:categories,
        isLoading:categoriesLoading
    } =
    useCategories();





    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{
            errors
        }

    }
    =
    useForm<FormData>({

        resolver:
            zodResolver(schema),


        defaultValues:{

            title:"",
            summary:"",
            content:"",
            cover_image:"",
            category_id:""

        }

    });




    const content =
        watch(
            "content"
        );






    function onSubmit(
        data:FormData
    ){


        mutation.mutate(

            data,

            {

                onSuccess(){

                    router.push(
                        "/articles"
                    );

                }

            }

        );


    }






return (

<div
className="
relative
min-h-screen
overflow-hidden
bg-white
"
>


{/* AI Digest subtle glow */}


<div
className="
pointer-events-none
absolute
left-[-200px]
top-[-200px]
h-[500px]
w-[500px]
rounded-full
bg-blue-100/30
blur-3xl
"
/>



<div
className="
pointer-events-none
absolute
right-[-200px]
bottom-[-200px]
h-[500px]
w-[500px]
rounded-full
bg-cyan-100/30
blur-3xl
"
/>



<div
className="
pointer-events-none
absolute
left-[45%]
top-[35%]
h-[350px]
w-[350px]
rounded-full
bg-purple-100/20
blur-3xl
"
/>





<div
className="
relative
container
mx-auto
max-w-5xl
px-4
py-20
"
>



<h1
className="
text-center
text-5xl
font-bold
tracking-tight
"
>

Write Your AI Article

</h1>



<p
className="
mt-4
text-center
text-muted-foreground
"
>

Share AI news, research and insights with the community.

</p>





<Card
className="
mx-auto
mt-12
max-w-4xl
border
bg-white
shadow-xl
"
>



<CardHeader>

<CardTitle
className="
text-center
text-3xl
font-bold
"
>

Create Article

</CardTitle>


</CardHeader>






<CardContent>


<form

onSubmit={
    handleSubmit(onSubmit)
}

className="
space-y-6
"

>



{/* TITLE */}

<div>

<label
className="
mb-2
block
font-medium
"
>
Title
</label>


<Input

placeholder="Enter article title"

{...register(
    "title"
)}

/>


<p className="text-sm text-red-500">

{errors.title?.message}

</p>


</div>






{/* SUMMARY */}

<div>

<label
className="
mb-2
block
font-medium
"
>
Summary
</label>


<Textarea

placeholder="Short description"

rows={4}

{...register(
    "summary"
)}

/>


<p className="text-sm text-red-500">

{errors.summary?.message}

</p>


</div>






{/* CATEGORY */}

<div>

<label
className="
mb-2
block
font-medium
"
>
Category
</label>



<select

className="
h-10
w-full
rounded-md
border
bg-white
px-3
text-sm
"

disabled={
    categoriesLoading
}

{...register(
    "category_id"
)}

>


<option value="">

{
categoriesLoading

?

"Loading categories..."

:

"Select category"

}

</option>



{
categories?.map(
(category)=>(

<option

key={
    category.id
}

value={
    category.id
}

>

{
category.name
}

</option>


))
}



</select>



<p className="text-sm text-red-500">

{errors.category_id?.message}

</p>


</div>







{/* IMAGE */}

<div>

<label
className="
mb-2
block
font-medium
"
>
Cover Image URL (Optional)
</label>



<Input

placeholder="https://example.com/image.jpg"

{...register(
    "cover_image"
)}

/>



<p className="text-sm text-red-500">

{errors.cover_image?.message}

</p>


</div>








{/* EDITOR */}

<div>

<label
className="
mb-2
block
font-medium
"
>
Content
</label>



<ArticleEditor

value={
    content
}

onChange={
(value)=>{

setValue(

    "content",

    value,

    {
        shouldValidate:true
    }

);

}

}

/>



<p className="text-sm text-red-500">

{errors.content?.message}

</p>


</div>








<Button

type="submit"

disabled={
    mutation.isPending
}

className="
w-full
bg-blue-600
hover:bg-blue-700
"

>


{

mutation.isPending

?

"Publishing..."

:

"Publish Article"

}


</Button>




</form>



</CardContent>


</Card>



</div>


</div>

);


}