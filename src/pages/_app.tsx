import { type AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";
import { useEffect } from "react";
import { useBoundStore } from "~/hooks/useBoundStore";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  const setTheme = useBoundStore((state) => state.setTheme);

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, [setTheme]);

  return (
    <>
      <Head>
        <title>PrayGo</title>
        <meta
          name="description"
          content="praygo web app clone written with React"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0A0" />
        <link rel="manifest" href="/app.webmanifest" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
