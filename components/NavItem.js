import Link from "next/link";
import { useRouter } from "next/router";

function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function NavItem({ href, onClick, children }) {
    const router = useRouter();
    return (
        <button onClick={onClick} className="">
            <Link
                href={href}
                className=
                {cn('flex flex-row rounded-lg px-4 py-2.5 border-none w-64 sm:w-96 opacity-75',
                    router.asPath === href ? 'bg-zinc-100 dark:bg-zinc-900' : 'hover:bg-zinc-100 dark:hover:bg-zinc-900'
                )}
                prefetch
            >
                {children}
            </Link>
        </button>
    )
}