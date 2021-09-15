import type { AppContext, AppProps } from "next/app";
import { SSRKeycloakProvider, SSRCookies } from "@react-keycloak/ssr";
import { KEYCLOAK_CONFIG } from "../util/auth";
import { parseCookies } from "../util/cookies";

function MyApp({ Component, pageProps, cookies }: AppProps & { cookies: any }) {
  return (
    <SSRKeycloakProvider
      keycloakConfig={KEYCLOAK_CONFIG as any}
      persistor={SSRCookies(cookies)}
      initOptions={{
        onLoad: "check-sso",
        silentCheckSsoRedirectUri:
          typeof window !== "undefined"
            ? `${window.location.origin}/silent-check-sso.html`
            : null,
      }}
    >
      <Component {...pageProps} />
    </SSRKeycloakProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  return {
    cookie: parseCookies(appContext.ctx.req),
  };
};
export default MyApp;

//gateway para as paginas react
