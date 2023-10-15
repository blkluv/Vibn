export default function InvertButton({ onClick, children }) {
    return (
      <button
        onClick={onClick}
        className="rounded-lg bg-black dark:bg-white text-white dark:text-black px-10 py-2 w-full mb-2"
      >
        {children}
      </button>
    );
  }