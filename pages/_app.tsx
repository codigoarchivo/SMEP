import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { AuthProvider, ColorsProvider, MembershipProvider } from "../context";
import "../scss/styles.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <AuthProvider>
        <MembershipProvider>
          <ColorsProvider>
            <Component {...pageProps} />
          </ColorsProvider>
        </MembershipProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
