import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr/_internal";
import { AuthProvider, ColorsProvider, MembershipProvider } from "../context";
import "../scss/styles.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <AuthProvider>
          <MembershipProvider>
            <ColorsProvider>
              <Component {...pageProps} />
            </ColorsProvider>
          </MembershipProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  );
}
