export default function AboutPage(){


return (

<main className="
container
mx-auto
px-4
py-20
">


<section className="
max-w-3xl
">

<h1 className="
text-5xl
font-bold
tracking-tight
">

About AI Digest

</h1>


<p className="
mt-6
text-lg
text-muted-foreground
">

AI Digest is a modern platform dedicated to
helping developers, researchers, and technology
enthusiasts stay updated with the rapidly
evolving world of artificial intelligence.

</p>



<p className="
mt-5
text-lg
text-muted-foreground
">

From breakthrough research papers to AI tools,
startups, and engineering practices, AI Digest
collects the information that matters most.

</p>


</section>




<section className="
mt-16
grid
gap-6
md:grid-cols-3
">


<div className="
rounded-xl
border
bg-blue-50
p-6
">

<h3 className="font-bold">
AI News
</h3>

<p className="mt-3 text-sm">
Latest developments from the AI industry.
</p>

</div>



<div className="
rounded-xl
border
bg-purple-50
p-6
">

<h3 className="font-bold">
Research
</h3>

<p className="mt-3 text-sm">
Discover important AI papers and ideas.
</p>

</div>



<div className="
rounded-xl
border
bg-indigo-50
p-6
">

<h3 className="font-bold">
Engineering
</h3>

<p className="mt-3 text-sm">
Learn how production AI systems are built.
</p>

</div>



</section>


</main>

)

}