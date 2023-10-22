import Head from "next/head";


export default function Container({ children, title }) {
  return (
    <div className="leading-relaxed py-2">
      <Head>
        <title>{title}</title>
      </Head>

      <main>{children}</main>
    </div>
  );
}
