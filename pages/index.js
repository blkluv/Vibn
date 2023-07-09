import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout title="Home · Geng Yue" subtitle="Home">
      <h1 className="font-medium text-3xl md:text-5xl sm:text-7xl my-24">
        Geng Yue is a senior grade 2 student who currently studying in Yantai
        No.1 Middle School. Meanwhile he's also a self-taught developer.
      </h1>

      <p className="max-w-2xl my-16 text-zinc-700 dark:text-zinc-300">
        What I'm intersted in is just math and design. I create and craft
        foolish websites, less content but more thoughts. Mostly interested in
        userinterface.
      </p>

      <h1 className="font-medium text-3xl md:text-5xl sm:text-7xl mt-48 mb-24">
        2022.08.29 - 2025.06.07. <br />
        <span className="bg-black dark:bg-white text-white dark:text-black">
          1013 days, 24312 hours.
        </span>
      </h1>

      <p className="max-w-2xl my-16 text-zinc-700 dark:text-zinc-300">
        I am currently preparing for the National College Entrance Examination
        in 2025. To focus on my studies, I will be limiting my online activity
        and my response to messages may experience significant delays. Thanks
        for your understanding.
      </p>
    </Layout>
  );
}
