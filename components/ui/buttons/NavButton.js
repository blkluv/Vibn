export default function NavButton({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="bg-neutral-200 dark:bg-neutral-800 rounded-lg p-2 text-neutral-600 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
    >
      {children}
    </button>
  );
}
