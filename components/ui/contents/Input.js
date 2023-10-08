export default function Input({ placeholder, type, onChange, value }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="rounded-lg focus:outline-none border bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 focus:ring-4 focus:ring-black dark:focus:ring-white px-6 py-2 w-full mb-2"
    />
  );
}
