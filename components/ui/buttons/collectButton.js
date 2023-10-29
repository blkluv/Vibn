export default function CollectButton({ onClick, isFavorited }) {
  return (
    <button
      className="font-medium text-sm flex flex-row space-x-2 rounded-lg border bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 px-4 py-1.5"
      onClick={onClick}
    >
      <span>{isFavorited && '取消'}收藏</span>
    </button>
  );
}
