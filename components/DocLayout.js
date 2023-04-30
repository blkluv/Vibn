import Head from "next/head";
import Link from "next/link";

const DocLayout = ({ children, title }) => {
  return (
    <div className="">
      <Head>
        <title>{title}</title>
      </Head>

      <div className="bar px-6 py-8 max-w-6xl prose mx-auto">
        <br />
        <br />
        <br />
        <main>
          <div className="absolute w-1/6 md:w-1/6 sm:w-auto -mt-12 md:-mt-8 sm:-mt-6 right-4 md:right-8 sm:right-64">
           <img src="/static/doc.svg" />
          </div>
          {children}
        </main>
      </div>

    </div >
  )
}

export default DocLayout