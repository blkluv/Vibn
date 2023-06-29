export default function Button({ children }) {
  return (
    <button className="bg-zinc-100 border-2 border-zinc-200 w-full rounded-md px-6 py-1.5">
        {children}
    </button>
  );
}
