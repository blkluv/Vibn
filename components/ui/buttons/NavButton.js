export default function NavButton({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="text-lg md:text-lg sm:text-xl flex flex-row rounded-lg font-medium text-left py-2"
    >
      {children}
    </button>
  );
}
