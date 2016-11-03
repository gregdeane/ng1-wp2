import checkRequiredFiles from './utils/checkRequiredFiles';
import * as detect from 'detect-port';
import * as chalk from 'chalk';
import prompt from './utils/prompt';
import clearConsole from './utils/clearConsole';
// import runDevServer from './server';
import paths from '../config/paths-ts';

const DEFAULT_PORT = process.env.PORT || 8080;

// warn and crash if required files are missing
if (!checkRequiredFiles([paths.indexHtml, paths.indexTs])) {
  process.exit(1);
}

const promptUser = (port: number) => {
  let question = [
    chalk.yellow(`Something is already running on port ${DEFAULT_PORT}.\n\n`),
    'Would you like to run the app on another port instead?'
  ].join('');

  clearConsole();

  prompt(question, true).then(shouldChangePort => {
    // if (shouldChangePort) {
    //   run(port);
    // }
  });
};

// attempt to use the default port. if it's in use, offer to run on
// a different port. `detect()` Promise resolves to the next free port.
detect(DEFAULT_PORT).then((port: number) => {
  if (port === DEFAULT_PORT) {
    // run(port);
    return;
  }

  promptUser(port);

});
