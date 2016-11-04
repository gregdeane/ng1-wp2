import * as webpackMerge from 'webpack-merge';
import commonConfig from './webpack.common-ts';
import paths from './paths-ts';

export default webpackMerge(commonConfig, {
  devtool: 'cheap-module-source-map',
  output: {
    path: paths.dist,
    pathinfo: true,
    filename: 'static/js/bundle.js',
    publicPath: paths.root
  }
});
