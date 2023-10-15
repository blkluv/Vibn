export default function PrimaryButton({ onClick, children }) {
  return (
    <button
      className="w-full text-center rounded-lg border bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 px-10 py-2"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
