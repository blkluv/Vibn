import { useRouter } from "next/router";
import Link from "next/link";

export default function NavButton({ title, href }) {
  const router = useRouter();
  return (
    <Link href={href}>
      <button className="rounded-full border bg-white dark:bg-black text-black dark:text-white px-6 py-2">{title}</button>
    </Link>
  );
}
