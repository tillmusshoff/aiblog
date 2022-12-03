// create typical _document.js
//
import Document, { Html, Head, Main, NextScript } from "next/document";

const MyDocument = ({ children }) => {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        {children}
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDocument;
