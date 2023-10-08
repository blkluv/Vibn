import Container from "@/components/layout/Container";
import Huge from "@/components/ui/headings/Huge";
import Head from "next/head";
import Link from "next/link";

function Error({ statusCode }) {
  return (
    <Container title={statusCode && statusCode}>

        <Huge>
          {statusCode ? (
            <span>
              服务器发生
              <span className="font-extrabold">{statusCode}</span> 错误
            </span>
          ) : (
            <span>发生客户端异常</span>
          )}
        </Huge>

    </Container>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
