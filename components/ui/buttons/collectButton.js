export default function CollectButton({ onClick, isFavorited }) {
  return (
    <button
      className="flex flex-row space-x-2 rounded-lg border bg-gradient-to-t from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800 border-neutral-200 dark:border-neutral-800 px-6 py-2"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-5 h-5 mt-1 main-grid-item-icon"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <polyline points="16 6 12 2 8 6" />
        <line x1="12" x2="12" y1="2" y2="15" />
      </svg>
      <span>{isFavorited && '取消'}收藏</span>
    </button>
  );
}
