import Link from 'next/link'

export default function Footer() {
    return (
        <div className="flex flex-row justify-between font-semibold mt-16 mb-8 max-w-6xl mx-auto px-6">
           <p>©2023 IKER</p>
           <div>
            <Link className="opacity-75" href="/job">
                工作机会
            </Link>
           </div>
        </div>
    )
}