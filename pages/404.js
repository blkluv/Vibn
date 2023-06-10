import Layout from '../components/Layout'
import Link from 'next/link'

export default function Error() {
    return (
        <Layout title="Access Denied">
            <h2>Access Denied.</h2>

            <p className='my-2 text-lg'>You <i className='ml-0.5 mr-0.5'>do not</i> have the right to access this page.</p>


        </Layout>
    )
}