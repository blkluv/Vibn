export function Play({ isFull }) {
  return (
    <svg
      t="1692268110901"
      fill="currentColor"
      className={
        ("icon ",
        isFull === "true"
          ? "w-12 md:w-14 sm:w-16 h-16"
          : "w-10 md:w-12 sm:w-14 mt-2 md:mt-1 sm:mt-1")
      }
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
  );
}