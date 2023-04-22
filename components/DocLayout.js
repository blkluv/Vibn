import Head from "next/head";
import Navbar from "./Navbar";
import Link from "next/link";

const DocLayout = ({ children, title }) => {
  return (
    <div className="px-4">
      <Head>
        <title>{title}</title>
      </Head>
      
      <Navbar />

      <div className="mt-16 max-w-6xl prose mx-auto px-4 md:px-6 sm:px-6">
        {children}
      </div>

    </div >
  )
}

export default DocLayout