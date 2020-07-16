import NextApp from "next/app";
import NextCookies from "next-cookies";
import { AppProps } from "next/app";

import universalLanguageDetect from "@unly/universal-language-detector";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/index.css";

import i18n from "../i18n";
import { TranslationProvider } from "../context/translation";
import { ME_QUERY } from "../graphql/user/queries/me";
import { MeProvider } from "../context/me";
import redirect from "../utils/redirect";

function MyApp({ Component, pageProps }: AppProps) {
  let t = i18n.en;
  if (pageProps.lng) {
    t = i18n[pageProps.lng.split("").splice(0, 2).join("")] || i18n.en;
  }
  return (
    <MeProvider me={pageProps.me}>
      <TranslationProvider t={t} lng={pageProps.lng}>
        <Component {...pageProps} />
      </TranslationProvider>
    </MeProvider>
  );
}

MyApp.getInitialProps = async (props: any) => {
  const { ctx } = props;
  const { req, pathname, HI } = ctx;

  const readonlyCookies = NextCookies(ctx);
  const lng: string = universalLanguageDetect({
    supportedLanguages: ["en", "de", "pl"],
    fallbackLanguage: "en",
    acceptLanguageHeader: req.headers["accept-language"],
    serverCookies: readonlyCookies,
  });

  // console.log(props);
  const appProps = await NextApp.getInitialProps(props);
  const {
    pageProps: { apolloClient },
  } = appProps;

  let me = null;
  // if auth cookie is present get user data from redis, else setup protected routes
  try {
    if (readonlyCookies.sid && apolloClient) {
      const response = await apolloClient.query({ query: ME_QUERY });
      if (!response || !response.data || !response.data.me) {
        me = null;
      } else {
        me = response.data.me;
      }
    } else {
    }
  } catch (error) {
    console.log(error);
  }

  appProps.pageProps = {
    ...appProps.pageProps,
    lng,
    me,
  };
  return { ...appProps };
};

export default MyApp;
