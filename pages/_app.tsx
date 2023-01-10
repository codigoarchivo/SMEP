import type { AppProps } from "next/app";
import { ColorsProvider, MembershipProvider } from "../context";
import "../scss/styles.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MembershipProvider>
      <ColorsProvider>
        <Component {...pageProps} />
      </ColorsProvider>
    </MembershipProvider>
  );
}
