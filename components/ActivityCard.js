export default function ActivityCard({ children, date }){
    return (
        <div className="border-b dark:border-b-zinc-800 py-3">
            <main className="opacity-75 mb-3">{children}</main>
            <time className="opacity-50 my-3">Published on {date}</time>
        </div>
    )
}