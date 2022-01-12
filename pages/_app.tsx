import type { AppProps /*, AppContext */ } from "next/app";
import React from "react";
import "antd/dist/antd.less";
import { ThemeProvider } from "styled-components";
import { Layout, Spin } from "antd";
import { useRouter } from "next/router";
import { theme } from "../constants/theme";
import Sider from "../components/Sider";
import Footer from "../components/Footer";
import useLoadingPage from "../hooks/useLoadingPage";
import { SWRConfig } from "swr";

const MyApp = ({ Component, pageProps }: AppProps): React.ReactElement => {
  const currentRoute = useRouter().pathname;
  const [loadingPage] = useLoadingPage();
  return (
    <ThemeProvider theme={{ ...theme }}>
      <SWRConfig
        value={{
          fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
          revalidateOnFocus: false,
          refreshInterval: 60000,
          dedupingInterval: 60000,
        }}
      >
        <Spin spinning={loadingPage} style={{ maxHeight: "100vh" }}>
          {LayoutSwitch(Component, pageProps, currentRoute)}
        </Spin>
      </SWRConfig>
    </ThemeProvider>
  );
};

const LayoutSwitch = (Component, pageProps, currentRoute) => {
  if (currentRoute.includes("/admin")) {
    return (
      <Layout style={{ height: "100vh" }}>
        <Sider />
        <Layout>
          <Component {...pageProps} />
          <Footer />
        </Layout>
      </Layout>
    );
  }
  if (currentRoute.includes("/pdf")) {
    return (
      <div>
        <Component {...pageProps} />
      </div>
    );
  }
  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      <Component {...pageProps} />
    </Layout>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp;
