import Link from "next/link"
import { useState } from "react"
import { useDisclosure, Drawer, DrawerOverlay, DrawerContent } from "@chakra-ui/react";

function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [placement] = useState('right')
    return (
        <div className="bar absolute inset-x-0 top-0 z-50">
            <div className={cn('px-6 md:px-8 sm:px-8 py-4 max-w-6xl mx-auto'
            )}>
                <div className="flex flex-row justify-between">
                    <Link href="/">
                        <h1 className="text-xl font-bold tracking-[1rem]">IKER</h1>
                    </Link>

                    <div className="center justify-items-center hidden md:inline sm:inline flex flex-row space-x-8">
                        <Link href="/get-started">
                            快速开始
                        </Link>

                        <Link href="/pricing">
                            定价
                        </Link>

                        <Link href="/conf">
                            Conf 2023
                        </Link>

                        <Link href="/job">
                            工作机会
                        </Link>

                    </div>

                    <button
                        className="rounded-lg bg-zinc-50/25 px-4 py-1 backdrop-blur-lg"
                        onClick={onOpen}
                    >
                        导航栏
                    </button>
                </div>
                <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
                    <DrawerOverlay className="backdrop-blur-md" />
                    <DrawerContent className="tracking-wide px-8 py-16 text-lg font-medium bar flex flex-col space-y-2">
                        <Link href="/">
                            主页
                        </Link>
                        <Link href="/get-started">
                            快速开始
                        </Link>

                        <Link href="/pricing">
                            定价
                        </Link>

                        <Link href="/conf">
                            Conf 2023
                        </Link>

                        <Link href="/job">
                            工作机会
                        </Link>

                        <br />

                        <Link href="/docs">
                            文档资源
                        </Link>

                        <Link href="/globe">
                            世界观
                        </Link>

                        <Link href="/war">
                            江河战争
                        </Link>

                        <Link href="/special">
                            IKER独家
                        </Link>


                    </DrawerContent>
                </Drawer>
            </div>
        </div>
    )
}