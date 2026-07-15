import Link from "next/link";
import {
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";


export default function Footer() {


  return (

    <footer className="
      mt-20
      border-t
      bg-gradient-to-br
      from-blue-50
      via-purple-50
      to-indigo-50
    ">


      <div className="
        container
        mx-auto
        px-4
        py-12
      ">


        <div className="
          grid
          gap-10
          md:grid-cols-4
        ">


          {/* Brand */}

          <div>

            <h2 className="
              text-2xl
              font-bold
              tracking-tight
            ">
              AI Digest
            </h2>


            <p className="
              mt-3
              text-sm
              text-muted-foreground
            ">
              Stay updated with the latest
              artificial intelligence news,
              research, and tools.
            </p>


          </div>




          {/* Navigation */}

          <div>

            <h3 className="
              font-semibold
            ">
              Explore
            </h3>


            <div className="
              mt-4
              flex
              flex-col
              gap-3
              text-sm
            ">


              <Link href="/">
                Home
              </Link>


              <Link href="/articles">
                Articles
              </Link>


              <Link href="/about">
                About
              </Link>


              <Link href="/pricing">
                Pricing
              </Link>


            </div>

          </div>




          {/* Resources */}

          <div>

            <h3 className="
              font-semibold
            ">
              Resources
            </h3>


            <div className="
              mt-4
              flex
              flex-col
              gap-3
              text-sm
            ">


              <Link href="#">
                AI Research
              </Link>


              <Link href="#">
                AI Tools
              </Link>


              <Link href="#">
                Community
              </Link>


            </div>


          </div>





          {/* Social */}

          <div>


            <h3 className="
              font-semibold
            ">
              Follow Us
            </h3>


            <div className="
              mt-4
              flex
              gap-4
            ">


              <Github
                className="
                  h-5
                  w-5
                  cursor-pointer
                "
              />


              <Twitter
                className="
                  h-5
                  w-5
                  cursor-pointer
                "
              />


              <Linkedin
                className="
                  h-5
                  w-5
                  cursor-pointer
                "
              />


            </div>


          </div>



        </div>





        <div className="
          mt-10
          border-t
          pt-6
          text-center
          text-sm
          text-muted-foreground
        ">

          © {new Date().getFullYear()}
          {" "}
          AI Digest. All rights reserved.

        </div>


      </div>


    </footer>

  );

}