import fs from "fs";
import path from "path";

const filePath = path.join(
  process.cwd(),
  "src/app/articles/page.tsx"
);


const content = `"use client";

import { useState } from "react";

import {
  useArticles,
} from "@/features/articles/hooks/useArticles";

import ArticleCard from "@/features/articles/components/ArticleCard";


export default function ArticlesPage() {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);


  const {
    data: articles,
    isLoading,
  } = useArticles({

    page,

    limit: 10,

    search,

    category_id: category || undefined,

  });



  return (

    <main className="container mx-auto px-4 py-10">


      <div className="mb-10">

        <h1 className="text-4xl font-bold tracking-tight">
          Articles
        </h1>

        <p className="mt-2 text-muted-foreground">
          Explore the latest AI news, research, and insights.
        </p>

      </div>



      <div className="mb-8 flex flex-col gap-4 md:flex-row">


        <input

          value={search}

          onChange={(e)=>{

            setSearch(e.target.value);

            setPage(1);

          }}

          placeholder="Search articles..."

          className="
            h-10
            rounded-md
            border
            bg-background
            px-4
            text-sm
            outline-none
            md:w-96
          "

        />



        <select

          value={category}

          onChange={(e)=>{

            setCategory(e.target.value);

            setPage(1);

          }}

          className="
            h-10
            rounded-md
            border
            bg-background
            px-4
            text-sm
          "

        >

          <option value="">
            All Categories
          </option>

          <option value="ai">
            Artificial Intelligence
          </option>

          <option value="ml">
            Machine Learning
          </option>

          <option value="llm">
            LLM
          </option>

        </select>


      </div>




      {
        isLoading ? (

          <div className="py-20 text-center text-muted-foreground">
            Loading articles...
          </div>

        ) : (


          <>

            {
              articles?.length ? (

                <div className="
                  grid
                  gap-6
                  md:grid-cols-2
                  lg:grid-cols-3
                ">

                  {
                    articles.map((article)=>(
                      
                      <ArticleCard

                        key={article.id}

                        article={article}

                      />

                    ))
                  }


                </div>


              ) : (


                <div className="
                  rounded-lg
                  border
                  py-20
                  text-center
                  text-muted-foreground
                ">

                  No articles found.

                </div>


              )

            }



            <div className="
              mt-10
              flex
              justify-center
              gap-4
            ">


              <button

                disabled={page === 1}

                onClick={()=>setPage(page - 1)}

                className="
                  rounded-md
                  border
                  px-4
                  py-2
                  text-sm
                  disabled:opacity-50
                "

              >

                Previous

              </button>




              <span className="
                flex
                items-center
                text-sm
                text-muted-foreground
              ">

                Page {page}

              </span>




              <button

                disabled={!articles || articles.length < 10}

                onClick={()=>setPage(page + 1)}

                className="
                  rounded-md
                  border
                  px-4
                  py-2
                  text-sm
                  disabled:opacity-50
                "

              >

                Next

              </button>


            </div>


          </>


        )

      }


    </main>

  );

}
`;


if (!fs.existsSync(path.dirname(filePath))) {
  fs.mkdirSync(path.dirname(filePath), {
    recursive: true,
  });
}


fs.writeFileSync(
  filePath,
  content,
  "utf8"
);


console.log("✅ Articles page updated successfully");