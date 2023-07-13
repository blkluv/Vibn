export default function Image({ src, desc }) {
  return (
    <div className="overflow-x-auto">
      <img src={src} className="rounded-xl w-full" />
      <p className="text-sm opacity-75 -mt-6">↑ {desc}</p>
    </div>
  );
}
