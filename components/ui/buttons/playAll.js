export default function PlayAll({ onClick }) {
  return (
    <button
      className="rounded-lg text-sm font-medium bg-black dark:bg-white text-white  dark:text-black px-4 py-1.5"
      onClick={onClick}
    >
      播放全部
    </button>
  );
}
