import React from "react";
import { mantineHtmlProps } from "@mantine/core";
import Document, { Html, Head, Main, NextScript } from "next/document";
class MyDocument extends Document {
  render() {
    const currentLocale = this.props.__NEXT_DATA__.locale || "en";

    return (
      <Html lang={currentLocale} {...mantineHtmlProps}>
        <Head>
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
