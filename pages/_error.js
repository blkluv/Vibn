import Head from "next/head";
import Link from "next/link";

function Error({ statusCode }) {
  return (
    <div className="max-w-xl mx-auto px-6 py-40">
      <Head>
        <title>{statusCode} · Geng Yue</title>
      </Head>

        <b className="text-neutral-700">
          {statusCode ? (
            <span>
              An error {""}
              <span className="font-semibold">{statusCode}</span> occurred on
              server
            </span>
          ) : (
            <span>An error occurred on client</span>
          )}
        </b>

    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
