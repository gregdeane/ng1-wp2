import clearConsole from './utils/clearConsole';

// display issues (linting, etc.)
const issues = (msgs: Array<string>) => {
  clearConsole();
  msgs.forEach(msg => {
    console.log(msg);
  });
};

// display message
const msg = (msg: string) => {
  console.log(msg);
};

// default Webpack output is turned off
// present messages/warnings/errors in readable format
export default () => {
  return { msg, issues };
};
