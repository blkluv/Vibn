import Container from "@/components/layout/Container";
import Huge from "@/components/ui/headings/Huge";

function Error({ statusCode }) {
  return (
    <Container title={statusCode}>
      <Huge>
        {statusCode ? (
          <span>
            An error {""}
            <span className="font-semibold">{statusCode}</span> occurred on
            server
          </span>
        ) : (
          <span>An error occurred on client</span>
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
