export default function Image({ src, desc }) {
  return (
    <div>
      <img src={src} className="mr-0 md:mr-32 sm:mr-64" />
      <p className="text-sm opacity-75 mt-2">{desc}</p>
    </div>
  );
}
