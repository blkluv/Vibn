import nav from "@/lib/nav.config"
import Link from "next/link"

export default function Menu() {
    return (
        <div className="bg-black">
            <div className="bg-black text-white max-w-6xl mx-auto py-6">
                <div className="px-2 py-4 columns-1 sm:columns-2 md:columns-2">
                    {nav.map((nav) => (
                        <Link href={nav.href}>
                            <h1 className='text-base font-bold'>
                                {nav.text}
                            </h1>
                            <p className="text-sm opacity-75 mb-6">{nav.desc}</p>
                        </Link>
                    ))}
                </div>

                <div className="border-t border-t-zinc-800 columns-1">
                    <h1 className="font-bold text-center text-3xl md:text-5xl text:text-6xl my-6">审算无错，逢阻且过</h1>
                </div>
            </div>
        </div>
    )
}