import Document, { Html, Head, Main, NextScript } from "next/document";
import universalLanguageDetect from "@unly/universal-language-detector";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const lng: string = universalLanguageDetect({
      supportedLanguages: ["en", "de", "pl"],
      fallbackLanguage: "en",
      acceptLanguageHeader: ctx.req.headers["accept-language"],
    });
    return { ...initialProps, lng };
  }
  render() {
    return (
      <Html
        lang={
          //@ts-ignore
          this.props.lng || "en"
        }
      >
        <Head>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-173273228-2"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `  
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'UA-173273228-2');
              `,
            }}
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
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
