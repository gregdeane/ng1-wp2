import loaders from './loaders/loaders.common-ts';
import paths from './paths-ts';
import settings from './settings';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const autoprefixer = require('autoprefixer');

export default {
  entry: [
    `webpack-dev-server/client?http://localhost:${settings.port}/`,
    paths.indexTs
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    loaders: loaders
  },
  plugins: [
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
