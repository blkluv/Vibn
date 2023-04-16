import Layout from "../components/Layout"
import Link from "next/link"

export default function About() {
    return (
        <Layout title="该世界观是什么?">
            <Link href="/" className="opacity-75">← 回到主页</Link>

            <h1 className='mt-8 text-teal-600'>该世界观是什么?</h1>

            <p className="mt-4 max-w-md">
               添加内容是需要时间的，看，头发都白了。
                
            </p>


            <p className="mt-16 mb-8 border border-teal-600 px-4 sm:px-8 py-4">不贵于江，而贵于河   {``}  — 马丁·路德·崔《对贱河起义者的讲演》</p>

        </Layout>
    )
}