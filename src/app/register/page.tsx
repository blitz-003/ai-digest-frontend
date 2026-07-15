"use client";


import {
    useState
} from "react";


import {
    useRouter
} from "next/navigation";


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
    Button
} from "@/components/ui/button";


import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";


import Link from "next/link";

import api from "@/lib/axios";




const schema = z.object({

    username:
        z.string()
        .min(3,"Username must be at least 3 characters"),


    full_name:
        z.string()
        .min(3,"Full name is required"),


    email:
        z.string()
        .email("Invalid email"),


    password:
        z.string()
        .min(6,"Password must be at least 6 characters"),


    confirm_password:
        z.string()

})
.refine(

(data)=>data.password === data.confirm_password,

{
    message:"Passwords do not match",
    path:["confirm_password"]
}

);



type RegisterForm =
z.infer<typeof schema>;





export default function RegisterPage(){


const router =
useRouter();


const [serverError,setServerError] =
useState("");



const [loading,setLoading] =
useState(false);




const {
    register,
    handleSubmit,
    formState:{
        errors
    }

}
=
useForm<RegisterForm>({

    resolver:
        zodResolver(schema)

});






async function onSubmit(
    data:RegisterForm
){


try {


setLoading(true);

setServerError("");



await api.post(

    "/auth/register",

    {

        username:data.username,

        full_name:data.full_name,

        email:data.email,

        password:data.password

    },

    {
        withCredentials:true
    }

);



// go to login after registration

router.push("/login");



}
catch(error: unknown){

    setServerError(
        error instanceof Error
        ? error.message
        : "Registration failed"
    );

}
finally{

    setLoading(false);

}


}





return (

<main
className="
relative
min-h-screen
overflow-hidden
bg-white
flex
items-center
justify-center
px-4
"
>


{/* AI Digest soft background */}

<div
className="
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
absolute
left-[40%]
top-[30%]
h-[350px]
w-[350px]
rounded-full
bg-purple-100/20
blur-3xl
"
/>





<Card
className="
relative
w-full
max-w-md
shadow-xl
bg-white
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

Create Account

</CardTitle>


<p
className="
text-center
text-sm
text-muted-foreground
"
>

Join AI Digest and explore AI knowledge.

</p>


</CardHeader>






<CardContent>


<form

onSubmit={
    handleSubmit(onSubmit)
}

className="
space-y-5
"

>



<div>

<Input

placeholder="Username"

{...register(
"username"
)}

/>


<p className="text-sm text-red-500">
{errors.username?.message}
</p>


</div>






<div>

<Input

placeholder="Full name"

{...register(
"full_name"
)}

/>


<p className="text-sm text-red-500">
{errors.full_name?.message}
</p>


</div>







<div>

<Input

placeholder="Email"

type="email"

{...register(
"email"
)}

/>


<p className="text-sm text-red-500">
{errors.email?.message}
</p>


</div>








<div>

<Input

placeholder="Password"

type="password"

{...register(
"password"
)}

/>


<p className="text-sm text-red-500">
{errors.password?.message}
</p>


</div>







<div>

<Input

placeholder="Confirm password"

type="password"

{...register(
"confirm_password"
)}

/>


<p className="text-sm text-red-500">
{errors.confirm_password?.message}
</p>


</div>








{
serverError && (

<p
className="
text-sm
text-red-500
text-center
"
>

{serverError}

</p>

)

}







<Button

type="submit"

disabled={loading}

className="
w-full
bg-blue-600
hover:bg-blue-700
"

>

{

loading
?
"Creating account..."
:
"Register"

}


</Button>






<p
className="
text-center
text-sm
text-muted-foreground
"
>

Already have an account?{" "}

<Link

href="/login"

className="
text-blue-600
hover:underline
"

>

Login

</Link>


</p>






</form>



</CardContent>



</Card>



</main>

);


}