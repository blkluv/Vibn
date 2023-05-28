import Layout from '../components/Layout'
import Link from 'next/link'

export default function Collection() {
    return (
        <Layout title="Collection">

            <h2 className="text-5xl md:text-7xl sm:text-7xl">Collection.</h2>

            <h2 className="text-5xl md:text-7xl sm:text-7xl">Flow, waste.</h2>


            <p className="max-w-2xl mt-24">
                The <i>Collection Page</i> inclueds various of items which are either useful or useless.
                You can access them for free! You might find some strings show what I'm recently doing at the same time.
            </p>

            <h3 className="text-sm">Talented People</h3>

            <div className='flex flex-col md:flex-row sm:flex-row space-x-0 md:space-x-8 sm:space-x-8 max-w-3xl'>
                <div className='flex flex-col'>
                    <img src="/collection/wgj.jpeg" className='rounded-3xl mix-blend-multiply' />
                    <img src="/collection/jj.jpg" className='rounded-3xl mix-blend-multiply' />
                </div>
                <div>
                    <img src="/collection/cmf.jpg" className='rounded-3xl mix-blend-multiply' />
                    <img src="/collection/ylt.jpg" className='rounded-3xl mix-blend-multiply' />

                </div>
            </div>

            <div className="max-w-2xl">

                <i>This project is under construction now! WIP...
                </i>

                <p>Cloudflare233@yandex.com</p>

            </div>

        </Layout>
    )
}