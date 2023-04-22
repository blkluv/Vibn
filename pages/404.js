import Layout from "../components/Layout"
import Link from "next/link"
import Image from '../components/Image'

export default function FOF() {
    return (
        <Layout
            title="404"
            isFixed="true"
        >

            <h1 className="inter font-bold text-6xl mt-16">404 - 找不到这个页面</h1>

            <p className="opacity-75 my-8">无效URL，请检查后重试.</p>

        </Layout>
    )
}