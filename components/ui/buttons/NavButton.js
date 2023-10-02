export default function NavButton({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-row rounded-lg font-medium text-left py-2"
    >
      {children}
    </button>
  );
}
