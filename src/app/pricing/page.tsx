import {
  Check,
} from "lucide-react";


const plans=[

{
name:"Free",
price:"$0",
description:"Explore AI content.",
features:[
"Read AI articles",
"Basic search",
"Bookmark articles"
]
},


{
name:"Pro",
price:"$9/month",
description:"For AI enthusiasts.",
popular:true,
features:[
"Premium articles",
"Advanced search",
"AI newsletters",
"Unlimited bookmarks"
]
},


{
name:"Enterprise",
price:"Custom",
description:"For teams.",
features:[
"Team access",
"Analytics",
"Priority support"
]
}


];



export default function PricingPage(){


return (

<main className="
container
mx-auto
px-4
py-20
">


<div className="
text-center
">

<h1 className="
text-5xl
font-bold
">

Pricing

</h1>


<p className="
mt-4
text-muted-foreground
">

Choose the plan that fits you.

</p>


</div>



<div className="
mt-12
grid
gap-8
md:grid-cols-3
">


{
plans.map(plan=>(


<div
key={plan.name}
className={`
rounded-2xl
border
p-8
shadow-sm
${
plan.popular
?
"bg-gradient-to-br from-blue-50 to-purple-50"
:
"bg-background"
}
`}
>


{
plan.popular && (

<div className="
mb-4
text-sm
font-semibold
text-primary
">
Most Popular
</div>

)

}



<h2 className="
text-2xl
font-bold
">

{plan.name}

</h2>


<div className="
mt-4
text-4xl
font-bold
">

{plan.price}

</div>



<p className="
mt-3
text-muted-foreground
">

{plan.description}

</p>




<ul className="
mt-6
space-y-3
">

{
plan.features.map(feature=>(

<li
key={feature}
className="
flex
gap-2
text-sm
"
>

<Check
className="
h-4
w-4
text-primary
"/>

{feature}

</li>

))

}

</ul>



<button className="
mt-8
w-full
rounded-md
bg-primary
px-4
py-2
text-primary-foreground
">

Choose Plan

</button>



</div>


))

}


</div>


</main>

)

}