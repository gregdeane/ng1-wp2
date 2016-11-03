const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const paths = require('./paths');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-source-map',
  output: {
    path: paths.dist,
    pathinfo: true,
    filename: 'static/js/bundle.js',
    publicPath: paths.root
  }
});
