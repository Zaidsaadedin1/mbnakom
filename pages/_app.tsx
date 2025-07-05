import React, { useEffect } from "react";
import { appWithTranslation } from "next-i18next";
import Head from "next/head";
import { MantineProvider, Stack } from "@mantine/core";
import MenuComponent from "../app/blocks/MenuComponent/MenuComponent";
import Footer from "../app/blocks/Footer/Footer";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../app/contexts/AuthContext";
import { Notifications } from "@mantine/notifications";
import { Open_Sans } from "next/font/google";
import { theme } from "../theme"; // adjust this import

const openSansFont = Open_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--open-sans-font",
});

function App({
  Component,
  pageProps,
}: {
  readonly Component: React.ElementType;
  readonly pageProps: Readonly<Record<string, unknown>>;
}) {
  const router = useRouter();
  const dir = router.locale === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = router.locale ?? "en";
  }, [dir, router.locale]);

  const queryClient = new QueryClient();

  return (
    <MantineProvider theme={theme}>
      <Notifications position="top-right" zIndex={1000} />
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Head>
            <title>Dr Majdoline Aldeek</title>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
            />
            <link rel="shortcut icon" href="/favicon.svg" />
          </Head>

          <Stack
            className={openSansFont.className}
            mr="5%"
            ml="5%"
            style={{ direction: dir }}
          >
            <MenuComponent />
            <Component {...pageProps} />
            <Footer />
          </Stack>
        </QueryClientProvider>
      </AuthProvider>
    </MantineProvider>
  );
}

export default appWithTranslation(App);
