const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const paths = require('./paths');
const loaders = require('./loaders/loaders.common');

module.exports = {
  entry: [
    paths.indexTs
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    loaders: loaders
  },
  plugins: [
    // do type checking in a separate process
    new ForkCheckerPlugin(),

    // simplify creation of HTML files for serving webpack bundles
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.indexHtml
    }),

    new LoaderOptionsPlugin({
      debug: true,
      options: {
        tslint: {
          emitErrors: false,
          failOnHint: false,
          resourcePath: paths.src
        },
        sassLoader: {
          includePaths: [
            paths.styles,
            paths.breakpointSass,
            paths.dressCode
          ]
        }
      }
    })
  ],
  // provide empty mocks for unused Node modules
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
