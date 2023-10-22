import Container from "@/components/layout/Container";
import Huge from "@/components/ui/headings/Huge";
import Medium from "@/components/ui/headings/Medium";
import Head from "next/head";
import Link from "next/link";

function Error({ statusCode }) {
  return (
    <Container title={statusCode && statusCode}>
      <Medium>
        {statusCode ? (
          <span>
            Error{``}
            <span className="ml-1">{statusCode}</span>
          </span>
        ) : (
          <span>Error</span>
        )}
      </Medium>
    </Container>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
