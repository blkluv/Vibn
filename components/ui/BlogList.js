import { useState } from "react";
import Link from "next/link";
import cn from "classnames"

export default function BlogList({ posts }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div>
      <div
        onClick={() => setIsOpen(isOpen === false ? true : false)}
        className={cn("cursor-pointer flex flex-row justify-between", isOpen ? 'opacity-100' : 'opacity-75 hover:opacity-100')}
      >
        <h1>Blog</h1>
        <span>{posts.length} posts</span>
      </div>
      {isOpen && (
        <div className="flex flex-col">
          {posts.map((post) => {
            return <Link href={`/blog/${post.slug}`} className="opacity-75 hover:opacity-100">{post.data.title}</Link>;
          })}
        </div>
      )}
    </div>
  );
}
