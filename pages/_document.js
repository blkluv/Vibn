import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
    
<script src="//cdn.jsdelivr.net/npm/eruda"></script>
<script>
eruda.init();
console.log('控制台打印信息');
  </script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
