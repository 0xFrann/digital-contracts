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

const MyApp = ({ Component, pageProps }: AppProps): React.ReactElement => {
  const currentRoute = useRouter().pathname;
  const [loadingPage] = useLoadingPage();
  return (
    <ThemeProvider theme={{ ...theme }}>
      <Spin spinning={loadingPage} style={{ maxHeight: "100vh" }}>
        {!currentRoute.includes("/admin") ? (
          <Layout style={{ height: "100vh", overflow: "hidden" }}>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <Layout style={{ height: "100vh" }}>
            <Sider />
            <Layout>
              <Component {...pageProps} />
              <Footer />
            </Layout>
          </Layout>
        )}
      </Spin>
    </ThemeProvider>
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
