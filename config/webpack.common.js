const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const autoprefixer = require('autoprefixer');
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
    // perform type checking in a separate process
    new ForkCheckerPlugin(),

    // simplify creation of HTML files for serving webpack bundles
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.indexHtml
    }),

    // load helpers (tslint, postcss, etc.)
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
        },
        postcss: function () {
          return [
            autoprefixer({
              browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']
            }),
          ];
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
