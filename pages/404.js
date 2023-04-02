import Layout from "../components/Layout"
import Link from "next/link"
import Image from '../components/Image'

export default function FOF() {
    return (
        <Layout
            title="404"
            isFixed="true"
        >

            <h1 className="inter font-medium my-8">404 - Not Found</h1>

            <p className="opacity-75 my-8">Invalied URL. Please try again later.</p>

            <Image src="https://source.unsplash.com/random" className="w-full" />
        </Layout>
    )
}