import cn from 'classnames'

// https://feathericons.dev/?search=chevron-down&iconset=feather&format=strict-jsx
export function ChevronDown({ display, isFull }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      className={cn(
        "items-center ",
        display ? "opacity-0 md:opacity-75 sm:opacity-75" : "opacity-75 ",
        isFull === "true"
          ? "w-8 md:w-10 h-8 md:h-10 sm:w-12 sm:h-12"
          : "w-0 h-0"
      )}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
