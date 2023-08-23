import Head from "next/head";
import Link from "next/link";

function Error({ statusCode }) {
  return (
    <div className="max-w-2xl px-6 md:px-12 sm:px-20 py-32 border-l border-neutral-200 dark:border-neutral-800 ml-2.5 md:mx-auto sm:mx-auto min-h-screen">
      <Head>
        <title>GENG YUE - STUDENT, SELF-TAUGHT DEVELOPER {statusCode}</title>
      </Head>

      <h1>GENG YUE</h1>
      <p className="opacity-75 mt-1">STUDENT, SELF-TAUGHT DEVELOPER</p>

      <div className="my-32">
        <p className="text-red-600">
          {statusCode ? (
            <span>
              An error {""}
              <span className="font-semibold">{statusCode}</span> occurred on
              server
            </span>
          ) : (
            <span>An error occurred on client</span>
          )}
        </p>
      </div>

      <h1>USEFUL LINKS</h1>
      <p className="opacity-75 mt-1">CAN HELP YOU WAY BACK</p>

      <div className="flex flex-col space-y-6 mt-12">
        <Link href="/" className="uppercase">
          Open the index page
        </Link>

        <Link href="/archive" className="uppercase">
          Open the archive page
        </Link>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
