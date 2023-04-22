import Link from "next/link"
import { useState } from "react"

function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
    const [menu, setMenu] = useState(false)
    return (
        <div
            className={cn('px-4 md:px-8 sm:px-8 py-4 max-w-6xl mx-auto',
                menu === false ? 'relative' : 'px-8 md:px-8 sm:px-8 fixed top-0 inset-x-0 bg-white min-h-screen'
            )}>
            <div className="flex flex-row justify-between">
                <Link href="/">
                    <h1 className="text-xl font-bold">IKER</h1>
                </Link>

                <div className="hidden md:inline sm:inline flex flex-row space-x-8">
                    <Link href="/get-started">
                        快速上手
                    </Link>

                    <Link href="/about">
                        我们是谁
                    </Link>

                    <Link href="/teams">
                        团队&政策
                    </Link>

                    <Link href="/pricing">
                        定价
                    </Link>
                </div>

                <button onClick={() => setMenu(menu === false ? true : false)}>
                    导航栏
                </button>
            </div>
            {
                menu === true && (
                    <div className="bg-white max-w-6xl mx-auto px-8 md:px-8 sm:px-8 bg-opacity-100 w-full inset-x-0 fixed min-h-screen mt-16">
                        <div className="overflow-x-auto flex flex-row justify-between max-w-xl">
                            <div className="">
                                <h1 className="font-medium opacity-75">导航</h1>

                                <div className="flex flex-col space-y-2 mt-6 text-xl">
                                    <Link href="/get-started">
                                        快速上手
                                    </Link>

                                    <Link href="/about">
                                        我们是谁
                                    </Link>

                                    <Link href="/teams">
                                        团队&政策
                                    </Link>

                                    <Link href="/pricing">
                                        定价
                                    </Link>
                                </div>
                            </div>

                            <div className="">
                                <h1 className="font-medium opacity-75">资源</h1>

                                <div className="flex flex-col space-y-2 mt-6 text-xl">
                                    <Link href="/war">
                                        江河战争
                                    </Link>

                                    <Link href="/docs">
                                        人物文档
                                    </Link>

                                    <Link href="/globe">
                                        世界观
                                    </Link>

                                    <Link href="/darkside">
                                        阴间玩意
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    )
}