export default function PlayAll({ onClick }) {
  return (
    <button
      className="flex flex-row space-x-2 rounded-lg bg-gradient-to-t bg-black dark:bg-white text-white  dark:text-black px-10 py-2"
      onClick={onClick}
    >
      <svg
        t="1692268110901"
        fill="currentColor"
        className="w-5 h-5 mt-1"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="4017"
      >
        <path
          d="M793.6 549.802667c33.621333-19.413333 50.389333-29.098667 56.021333-41.813334a42.666667 42.666667 0 0 0 0-34.688c-5.632-12.672-22.4-22.357333-56.021333-41.770666L326.4 161.792c-33.621333-19.370667-50.389333-29.098667-64.213333-27.648a42.666667 42.666667 0 0 0-30.037334 17.365333c-8.149333 11.221333-8.149333 30.634667-8.149333 69.418667v539.477333c0 38.826667 0 58.197333 8.149333 69.418667a42.666667 42.666667 0 0 0 30.037334 17.365333c13.824 1.450667 30.592-8.277333 64.213333-27.648l467.2-269.738666z"
          p-id="4018"
        ></path>
      </svg>
      <span>播放</span>
    </button>
  );
}
