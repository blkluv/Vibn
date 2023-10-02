export default function InvertButton({ onClick, children }) {
    return (
      <button
        onClick={onClick}
        className="rounded-lg bg-gradient-to-t from-black to-neutral-700 dark:from-white dark:to-neutral-300 text-white dark:text-black px-8 py-2 w-full mb-2"
      >
        {children}
      </button>
    );
  }