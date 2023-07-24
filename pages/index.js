import BetaLayout from "@/components/BetaLayout";

export default function Beta() {
  return (
    <BetaLayout title="Beta...">
      <h1 className="text-3xl leading-normal">
        <span className="opacity-75">耿越</span>是一名就读于<a href="http://www.ytyz.net">烟台一中</a>的新高二学生。<br />
        自由主义者。<span className="line-through opacity-75">可能是</span> <a href="https://nextjs.org">Next.js</a>业余开发者。<br />
        <span className="opacity-75">各种单机<span className="line-through">老</span>游戏</span>的狂热追随者。但<span className="opacity-75">没时间玩</span>。
        偶尔<span className="opacity-75">研究点数学</span>。可能写点<a href="https://tailwindcss.com">TailwindCSS</a>。
      </h1>
    </BetaLayout>
  );
}
