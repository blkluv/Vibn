import Layout from "@/components/Layout";
import Link from "next/link";

export default function About() {
  return (
    <Layout title="关于作者">
      <Link
        href="/"
        className="text-sm mb-8 opacity-75 flex flex-row space-x-0.5 rounded-xl w-auto px-2 md:px-2 sm:px-0 py-2"
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 mt-0.5 mr-1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
        <span className="">返回"所有文章"</span>
      </Link>
      <div className="px-4 md:px-4 sm:px-0">
        <h1 className="font-semibold text-3xl mt-8">{">"} 关于作者</h1>

        <img src="/static/ytyz.jpg" className="rounded-xl mt-8" />
        <p className="text-sm opacity-75 mt-2 mb-8">
          ↑ 烟台一中，我目前就读的学校
        </p>

        <p className="mt-8">
          (｡･∀･)ﾉﾞ嗨大家好！我是耿越，现在是一名就读于山东省烟台第一中学的高二学牲。
          我的选科组合是物理、化学、生物。
          虽然有过无数次转大文的念头，但是还是坚持在烟台一中大实验摆烂。（主要是自己懒得背东西）。
          平常喜欢写点东西，就算写的不好，总归是要写点。
        </p>

        <p className="mt-8">
          虽然现在很多人都不写、不看博客了，短视频平台夺走了这些。我其实也一样，
          只不过我是一个比较怀旧的人吧（自认为），加上我从2020年就开始折腾博客了，实在是不舍得丢掉。所以偶尔写点，没人看的话，就算给自己看看吧。
        </p>

        <p className="mt-8">
          博客目前用Next.Js +
          TailwindCSS搭建，部署在Vercel上。如果你要了解更多，关于网站界面会很有帮助。
        </p>

        <p className="mt-8">祝您生活愉快 😎</p>

        <p className="text-sm opacity-75 mt-8">最后更新于2023年7月12日</p>
      </div>
    </Layout>
  );
}
