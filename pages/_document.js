import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/core/styles";

class MyDocument extends Document {
  setGoogleTags() {
    if (process.env.NEXT_PUBLIC_PRODUCTION_API) {
      return {
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-204324898-1');
   `,
      };
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <script src="https://accounts.google.com/gsi/client" async defer />
          <meta charSet="UTF-8" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="yes" />
          <meta name="apple-mobile-web-app-title" content="Vedifly" />
          <meta
            name="p:domain_verify"
            content="b2666a47ce2019ef96afa5b4b91da6a2"
          />
          <link
            rel="alternate"
            href={process.env.NEXT_PUBLIC_DOMAIN_URL}
            hrefLang="en-us"
          />
          <link
            defer
            rel="dns-prefetch"
            href={process.env.NEXT_PUBLIC_DOMAIN_URL}
          />
          <link
            defer
            rel="preconnect"
            href={process.env.NEXT_PUBLIC_DOMAIN_URL}
            crossOrigin
          />
          <link
            defer
            rel="preconnect"
            href="https://www.googletagmanager.com"
            crossOrigin
          />
          <link rel="icon" href="/vedifly.svg" />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-204324898-1"
          ></script>

          <script
            src="https://apis.google.com/js/platform.js?onload=onLoadCallback"
            async
            defer
          ></script>
          <script defer dangerouslySetInnerHTML={this.setGoogleTags()} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};

export default MyDocument;
