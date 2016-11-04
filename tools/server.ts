import * as WebpackDevServer from 'webpack-dev-server';
// import openBrowser from 'react-dev-utils/openBrowser';
import * as chalk from 'chalk';
import compiler from './compiler';
// import middleware from './middleware';
import logger from './logger';
import paths from '../config/paths-ts';

const log = logger();

export default (host: string, port: number, protocol: string): void => {
  let devServer = new WebpackDevServer(compiler(host, port, protocol), {
    contentBase: paths.dist,
    publicPath: paths.root,
    quiet: true,
    https: protocol === 'https'
  });

  // Launch WebpackDevServer.
  devServer.listen(port, (err: string) => {
    if (err) {
      return log.msg(chalk.red(err));
    }

    log.msg(chalk.cyan('Starting the development server...\n'));
    //openBrowser(protocol + '://' + host + ':' + port + '/');
  });
};