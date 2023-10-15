export default function DownloadButton({ onClick }) {
  return (
    <button
      className="flex flex-row space-x-2 rounded-lg border bg-gradient-to-t from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800 border-neutral-200 dark:border-neutral-800 px-6 py-2"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        className="w-5 h-5 mt-1 main-grid-item-icon"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      >
        <polyline points="8 17 12 21 16 17" />
        <line x1="12" x2="12" y1="12" y2="21" />
        <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29" />
      </svg>

      <span>下载</span>
    </button>
  );
}