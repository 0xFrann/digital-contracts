/* eslint-disable */
const withSass = require("@zeit/next-sass");
const withLess = require("@zeit/next-less");
const withCSS = require("@zeit/next-css");
const { modifiedVariables } = require("./constants/theme");

// fix: prevents error when .less files are required by node
if (typeof require !== "undefined") {
  require.extensions[".less"] = (file) => {};
}

module.exports = withCSS({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  },
  ...withLess(
    withSass({
      lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: modifiedVariables,
      },
      typescript: {
        ignoreBuildErrors: true,
      },
      publicRuntimeConfig: {
        firebaseConfig: process.env.FIREBASE_SERVICE_ACCOUNT,
      },
      webpack(config) {
        config.module.rules.push({
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        });

        return config;
      },
    })
  ),
});
