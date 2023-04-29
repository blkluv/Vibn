import Link from "next/link"
import { useState, useEffect } from "react"
import { useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton } from "@chakra-ui/react";
import { motion, useScroll } from "framer-motion"

function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

const variants = {
    unpinned: {
        y: "-100%",
    },
    pinned: {
        y: 0,
    },
};

const inRange = (num, rangeStart, rangeEnd = 0) =>
    (rangeStart < num && num < rangeEnd) || (rangeEnd < num && num < rangeStart);

export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [placement] = useState('right')
    const [variant, setVariant] = useState("pinned");
    const { scrollY } = useScroll();

    useEffect(() => {
        scrollY.onChange((latest) => {
            const previous = scrollY.getPrevious();
            const diff = latest - previous;
            const currentScrolledPixels = scrollY.get();
            // If we have yet to scroll 80 pixels, return early
            if (currentScrolledPixels < 80 || inRange(diff, -20, 20)) {
                return;
            }

            if (latest > previous) {
                setVariant("unpinned");
            } else {
                setVariant("pinned");
            }
        });
    }, [scrollY]);
    return (
        <motion.nav
            initial="pinned"
            animate={variant}
            variants={variants}
            transition={{
                bounce: 0,
            }}
            className="bar fixed inset-x-0 top-0 z-50">
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
                        <DrawerCloseButton />
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
        </motion.nav>
    )
}