import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";
import { ReactElement, ReactFragment } from "react";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<{
    html: string;
    head?: JSX.Element[];
    styles?: ReactElement[] | ReactFragment;
  }> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
