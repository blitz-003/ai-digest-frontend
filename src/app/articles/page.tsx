"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  useArticles,
} from "@/features/articles/hooks/useArticles";

import ArticleCard from "@/features/articles/components/ArticleCard";

import {
  useCategories,
} from "@/features/categories/hooks/useCategories";



function useDebounce(
  value: string,
  delay = 500
) {

  const [debounced, setDebounced] =
    useState(value);


  useEffect(()=>{

    const timer = setTimeout(()=>{

      setDebounced(value);

    }, delay);


    return ()=>clearTimeout(timer);


  },[value, delay]);


  return debounced;

}





export default function ArticlesPage() {


  const router = useRouter();

  const searchParams = useSearchParams();



  const initialSearch =
    searchParams.get("search") ?? "";


  const initialCategory =
    searchParams.get("category_id") ?? "";


  const initialPage =
    Number(
      searchParams.get("page") ?? 1
    );



  const [search,setSearch] =
    useState(initialSearch);


  const [category,setCategory] =
    useState(initialCategory);


  const [page,setPage] =
    useState(initialPage);



  const debouncedSearch =
    useDebounce(search);



  const {
    data: categories,
  } = useCategories();



  useEffect(()=>{


    const params =
      new URLSearchParams();


    if(debouncedSearch)
      params.set(
        "search",
        debouncedSearch
      );


    if(category)
      params.set(
        "category_id",
        category
      );


    if(page > 1)
      params.set(
        "page",
        String(page)
      );



    const query =
      params.toString();



    router.replace(
      query
        ? `/articles?${query}`
        : "/articles"
    );


  },[
    debouncedSearch,
    category,
    page,
    router
  ]);





  const {
    data: articles,
    isLoading,
  } = useArticles({

    page,

    limit:10,

    search:
      debouncedSearch || undefined,


    category_id:
      category || undefined,

  });





  return (

    <main className="
      container
      mx-auto
      px-4
      py-10
    ">


      <div className="mb-10">


        <h1 className="
          text-4xl
          font-bold
        ">
          Articles
        </h1>


        <p className="
          mt-2
          text-muted-foreground
        ">
          Explore the latest AI news,
          research, and insights.
        </p>


      </div>




      <div className="
        mb-8
        flex
        flex-col
        gap-4
        md:flex-row
      ">


        <input

          value={search}

          onChange={(e)=>{

            setSearch(
              e.target.value
            );

            setPage(1);

          }}

          placeholder="
            Search articles...
          "

          className="
            h-10
            rounded-md
            border
            bg-background
            px-4
            text-sm
            md:w-96
          "

        />




        <select

          value={category}

          onChange={(e)=>{

            setCategory(
              e.target.value
            );

            setPage(1);

          }}

          className="
            h-10
            rounded-md
            border
            bg-background
            px-4
          "

        >


          <option value="">
            All Categories
          </option>



          {
            categories?.map(
              (item)=>(
                
                <option
                  key={item.id}
                  value={item.id}
                >

                  {item.name}

                </option>

              )
            )
          }


        </select>



      </div>





      {
        isLoading ? (

          <div className="
            py-20
            text-center
          ">
            Loading articles...
          </div>


        ) : articles?.length ? (


          <div className="
            grid
            gap-6
            md:grid-cols-2
            lg:grid-cols-3
          ">

            {
              articles.map(
                article=>(
                  
                  <ArticleCard

                    key={
                      article.id
                    }

                    article={
                      article
                    }

                  />

                )
              )
            }

          </div>



        ) : (


          <div className="
            rounded-lg
            border
            py-20
            text-center
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

          disabled={
            page === 1
          }

          onClick={()=>{

            setPage(
              page-1
            );

          }}

          className="
            rounded-md
            border
            px-4
            py-2
            disabled:opacity-50
          "

        >

          Previous

        </button>



        <span className="
          flex
          items-center
          text-sm
        ">

          Page {page}

        </span>



        <button

          disabled={
            !articles ||
            articles.length < 10
          }

          onClick={()=>{

            setPage(
              page+1
            );

          }}

          className="
            rounded-md
            border
            px-4
            py-2
            disabled:opacity-50
          "

        >

          Next

        </button>


      </div>



    </main>

  );

}