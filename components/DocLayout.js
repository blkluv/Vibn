import Head from "next/head";
import Link from "next/link";

const DocLayout = ({ children, title }) => {
  return (
    <div className="">
      <Head>
        <title>{title}</title>
      </Head>

      <div className="px-6 py-8 max-w-6xl prose mx-auto">
        <br />
        <br />
        {children}
      </div>

    </div >
  )
}

export default DocLayout