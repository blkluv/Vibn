import Layout from '../components/Layout'
import Link from 'next/link'

export default function Error() {
    return (
        <Layout title="Access Denied">
            <h2 className="text-5xl md:text-7xl sm:text-7xl">Access Denied.</h2>

            <p>You <i>do not</i> have the right to access this page.</p>

            <br />

            <Link href="/">
                <button className='bg-black px-8 py-2 rounded-3xl text-white'>
                    <i>← Take me back home</i>
                </button>
            </Link>

        </Layout>
    )
}