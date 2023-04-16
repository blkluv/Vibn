import Layout from "../components/Layout"
import Link from "next/link"

export default function War() {
    return (
        <Layout title="江河战争的真实照片">
            <Link href="/" className="opacity-75">← 回到主页</Link>

            <h1 className='mt-8 text-teal-600'>江河战争的真实照片</h1>

            <p className="mt-4 max-w-md">
                <span className="text-teal-600">江河战争</span>
                是指1145年至1919年期间，贱河人与贵江人进行的长期战争。战争初期，强大的贵江人曾经凭着优越的武器数次击败了贱河人，迫使其成为附庸。
                1900年，马丁·路德·崔就任贱河领导人，在他的领导下，贱河先后进行了三次起义。最终在<span className="text-teal-600">第三次江河战争</span>期间，
                腐朽的贵江政府终于倒台，在逃亡过程中数学方舟被击毁，全体官兵停止抵抗。政府领导人<span className="text-teal-600">沙沙德·安部究办·三者</span>
                流亡海外。
            </p>


            <h1 className="text-teal-600 mt-16">贵江方面</h1>

            <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 justify-between">
                <div className="w-full sm:w-1/2 mt-12 flex flex-col sm:flex-row space-x-0 space-y-6 sm:space-y-0 sm:space-x-6 overflow-x-auto">
                    <div className="opacity-100 w-full sm:w-1/2">
                        <img src="/collection/wgj.jpeg" className="hover:invert border border-teal-800" />
                    </div>
                    <div className="w-full sm:w-1/2">
                        <span className="text-teal-600">沙沙德·安部究办·三者</span>

                        <p className="mt-4">政府领导人/最高领袖</p>

                        <p className="mt-6">
                            1912-1919年的贵江政府首脑，曾国藩·王阳明·三者之子。在他的领导下，贵江政治腐败，民不聊生。
                            他不惜重金打造数学方舟，并且强迫民众为之纳税。所有这些使他输掉了第三次江河战争，数学方舟也被击毁，
                            本人流亡海外。
                        </p>

                        <p className="mt-4">
                            这是他在总统府前留下的照片
                        </p>
                    </div>
                </div>
                <div className="w-full sm:w-1/2 mt-12 flex flex-col sm:flex-row space-x-0 space-y-6 sm:space-y-0 sm:space-x-6 overflow-x-auto">
                    <div className="opacity-100 w-full sm:w-1/2">
                        <img src="/collection/jj.jpg" className="hover:invert border border-teal-800" />
                    </div>
                    <div className="w-full sm:w-1/2">
                        <span className="text-teal-600">阿里·简·锂·杰</span>

                        <p className="mt-4">贵江政府五星上将</p>

                        <p className="mt-6">
                            五星上将。1908-1912任国防部长。1913起改任最高司令部长官，十分受沙沙德·安部究办·三者的器重。
                            第三次江河战争期间，在下河攻防战作战时，由于年龄过大，反应过慢。负重伤，后随沙沙德·安部究办·三者守卫数学方舟。
                            方舟陷落后下落不明。据说曾经有人在苏格兰的小酒馆里看见过他。
                        </p>

                        <p className="mt-4">
                            这是他出征前在贵江畔留下的照片
                        </p>

                    </div>
                </div>
            </div>

            <h1 className="text-teal-600 mt-16">贱河方面</h1>

            <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 justify-between">
                <div className="w-full sm:w-1/2 mt-12 flex flex-col sm:flex-row space-x-0 space-y-6 sm:space-y-0 sm:space-x-6 overflow-x-auto">
                    <div className="opacity-100 w-full sm:w-1/2">
                        <img src="/collection/cmf.jpg" className="hover:invert border border-teal-800 w-full" />
                    </div>
                    <div className="w-full sm:w-1/2">
                        <span className="text-teal-600">马丁·路德·崔</span>

                        <p className="mt-4">贱河起义军领袖</p>

                        <p className="mt-6">
                            1912年起，带领民众发动了第三次对抗贵江残暴统治的起义。团结一心的贱河民众一举推翻了腐朽的贵江政府，
                            建立了民主政府。击毁数学方舟后，他本人就任贱河总统。1922年，他由于长期吸烟引发了肺癌。
                            贱河将何去何从？
                        </p>

                        <p className="mt-4">
                            这是他在向民众讲演时留下的照片
                        </p>
                    </div>
                </div>

            </div>

            <p className="mt-16 mb-8 border border-teal-800 px-4 sm:px-8 py-4">其实从前这江河从没有贵贱之分，自从有了贵江，也就有了贱河   {``}  — 马丁·路德·崔《对贱河起义者的讲演》</p>

        </Layout>
    )
}