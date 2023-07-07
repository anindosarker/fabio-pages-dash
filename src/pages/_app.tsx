import Navbar from "@/components/Navbar";
import trackActivity from "@/lib/track";
import trackAnalytics from "@/lib/track2";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      // trackActivity();
      trackAnalytics();
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
