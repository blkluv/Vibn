import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout title="Home · Geng Yue" subtitle="Home">
      <h1 className="mt-24 md:mt-36 sm:mt-48 mb-24 font-medium text-3xl md:text-5xl sm:text-7xl ">
        22.08.29 - 25.06.07. <br />
        <span className="bg-black dark:bg-white text-white dark:text-black">
          1013 days, 24312 hours.
        </span>
      </h1>

      <p className="max-w-2xl my-16">
        I am currently preparing for the National College Entrance Examination
        in 2025. To focus on my studies, I will be limiting my online activity
        and my response to messages may experience significant delays. Thanks
        for your understanding.
      </p>

      <h2 className="font-medium text-lg md:text-xl sm:text-2xl">
        View the rest of this site ↓
      </h2>

      <hr />

      <div className="flex flex-col md:flex-row sm:flex-row space-x-0 md:space-x-6 sm:space-x-8">
        <img src="/static/ytyz.jpg" className="my-12" />
        <div>
          <h2 className="text-xl md:text-2xl sm:text-4xl my-16">
            I'm currently a senior grade 2 student of{" "}
            <a
              href="http://www.ytyz.net"
              className="border-b border-b-black dark:border-b-white"
            >
              Yantai No.1 Middle School of Shandong
            </a>
            . And my course selection combination is Physics, Chemistry, and
            Biology.
          </h2>

          <h2 className="text-xl md:text-2xl sm:text-4xl my-8">
            Now in Zhiyuan Building, previously in the library.
            <br />
            You can react me at <br />
            Class 2, senior grade 2.
          </h2>
        </div>
      </div>

      <hr />

      <h1 className="mt-24 md:mt-36 sm:mt-48 mb-24 font-medium text-3xl md:text-5xl sm:text-7xl ">
        To dream and to be
        <br />
        <span className="bg-black dark:bg-white text-white dark:text-black">
          Userinterface First
        </span>
      </h1>

      <p className="max-w-2xl my-16">
        I'm currently building (planning) a design project called "Dreabe UI"
        which combines the word "Dream" & "Be" means that we could become better
        and achieve our dream throught that. Particular focused on
        userinterface.
      </p>

      <h2 className="font-medium text-lg md:text-xl sm:text-2xl">
        Preview version is not avaliable now
      </h2>

      <hr />
    </Layout>
  );
}
