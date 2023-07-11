import Layout from "@/components/Layout";
import { getPosts } from "../utils/mdxUtils";
import moment from "moment/moment";
import Link from "next/link";

export default function Home({ posts }) {
  return (
    <Layout
      title="Home · Geng Yue"
      desc=" Geng Yue is currently a senior grade 2 student of Yantai No.1 Middle
    School of Shandong . And he's course selection combination is Physics,
    Chemistry, and Biology."
    >
      <div className="flex flex-col md:flex-row sm:flex-row mt-12">
        <div className="max-w-xl w-full opacity-75">I.Introduction Part</div>
        <div className="max-w-3xl mt-6 md:mt-0 sm:mt-0">
          I'm a senior grade 2 student of{" "}
          <a href="http://www.ytyz.net/">
            Yantai No.1 Middle School of Shandong.
          </a>
          I'm currently living in Yantai City, Shandong in where my home is near
          the coast and I could see the blue sea whenever I come downstairs. My
          favorite days are the childhood time I experienced, instead of doing
          just tons of homework ( most of them are test papers, I called them
          "waste" or "litre"), I could spend all my spare time enjoy playing by
          the coast. It's the greatest time of my life! Now beside as a normal
          student, I know little about Javascript and React. I'm not a really
          "self-taught developer" or "designer", but I enjoy building foolish
          websites. Nice to meet you anyway!
          <img src="/static/ytyz.jpg" className="grayscale mt-8" />
          <p className="text-sm opacity-75 mt-4">
            This is what my "old and beautiful, (founded in 1931)" school looks
            like ↑
          </p>
        </div>
      </div>

      <hr />

      <div className="flex flex-col md:flex-row sm:flex-row mt-16">
        <div className="max-w-xl w-full opacity-75" id="blog">
          II.Blog
        </div>
        <div className="max-w-3xl mt-6 md:mt-0 sm:mt-0">
          I wrote about everything except sexual (just joking...). I'm not
          really good at writing, but I want to have a space on my own to
          express my thoughts so I established this part "Blog" as a part of my
          website.To be honest, I should call it "Thoughts" for better because I
          can't write so long like somebody...you know. I'm not a man who says a
          lot but quiet... not that!
          <p className="text-sm opacity-75 mt-4">
            Let's stop talking, it's getting late.
          </p>
          <div className="mt-12">
            {posts.map((post) => (
              <div key={post.filePath} className="mb-4">
                <Link
                  as={`/posts/${post.filePath.replace(/\.mdx?$/, "")}`}
                  href={`/posts/[slug]`}
                >
                  <button className="flex flex-col w-full">
                    <h1 className="font-medium">{post.data.title}</h1>

                    <p className="no-underline font-normal text-sm opacity-75">
                      {moment(post.data.date).format("dddd, MMMM DD , YYYY")} (
                      {moment(post.data.date).fromNow()})
                    </p>
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <hr />

      <div className="flex flex-col md:flex-row sm:flex-row mt-12" id="design">
        <div className="max-w-xl w-full opacity-75">III.Design Part</div>
        <div className="max-w-3xl mt-6 md:mt-0 sm:mt-0">
          I'm a senior grade 2 student of{" "}
          <a href="http://www.ytyz.net/">
            Yantai No.1 Middle School of Shandong.
          </a>
          I wrote a design guideline previously, based on it, I want to expend
          it to a wider space. What I do is "break a old ugly world and start a
          new world". The new design system is scheduled to be named as "Dreabe
          UI" which combines the words "Dream" and "To be". Particularly focus
          on userinterface and userexperience. Black/White are the main colors.
          <div className="w-full bg-black dark:bg-white mt-8 py-24">
            <h1 className="font-medium text-white dark:text-black text-center text-3xl md:text-4xl sm:text-5xl">
              Dreabe UI
            </h1>

            <p className="max-w-lg mx-auto px-4 mt-8 text-lg md:text-xl sm:text-xl opacity-75 text-white dark:text-black text-center">
              A userinterface collection particularly focus on userinterface and
              userexperience. with black/white as the main colors.
            </p>

            <p className="opacity-75 mt-8 text-center text-white dark:text-black">
              Avalibale Mid-August
            </p>
          </div>
          <p className="text-sm opacity-75 mt-4">
            Note: Preview version is scheduled to be released on August 2023.
          </p>
        </div>
      </div>

      <hr />
    </Layout>
  );
}

export function getStaticProps() {
  const posts = getPosts();

  return { props: { posts } };
}
