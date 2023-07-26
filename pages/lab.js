import BetaLayout from "@/components/BetaLayout";

export default function Lab() {
  return (
    <BetaLayout title="实验室">
      <h1 className="text-2xl md:text-3xl sm:text-3xl leading-normal mb-8">
        不成熟的<span className="opacity-75">想法</span>或
        <span className="opacity-75">设计</span>。
      </h1>

      <h1 className="text-2xl md:text-3xl sm:text-3xl leading-normal mb-8">
       很遗憾当前实验室并不可用。
      </h1>
    </BetaLayout>
  );
}
