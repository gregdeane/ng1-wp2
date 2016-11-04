/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * Adapted for TypeScript by Zalando / Team Norris
 *
 * See https://github.com/facebookincubator/create-react-app/tree/master/packages/react-dev-utils
 * for original implementation.
 */

// WARNING: this code is untranspiled and is used in browser too.
// Please make sure any changes are in ES5 or contribute a Babel compile step.

// Some custom utilities to prettify Webpack output.
// This is quite hacky and hopefully won't be needed when Webpack fixes this.
// https://github.com/webpack/webpack/issues/2878

const friendlySyntaxErrorLabel = 'Syntax error:';

const isLikelyASyntaxError = (message: string): boolean => {
  return message.indexOf(friendlySyntaxErrorLabel) !== -1;
};

const formatMessage = (message: string): string => {
  let lines: Array<string> = message.split('\n');

  // line #0 is filename
  // line #1 is the main error message
  if (!lines[0] || !lines[1]) {
    return message;
  }

  // Remove webpack-specific loader notation from filename.
  // Before:
  // ./~/css-loader!./~/postcss-loader!./src/App.css
  // After:
  // ./src/App.css
  if (lines[0].lastIndexOf('!') !== -1) {
    lines[0] = lines[0].substr(lines[0].lastIndexOf('!') + 1);
  }

  // Cleans up verbose "module not found" messages for files and packages.
  if (lines[1].indexOf('Module not found: ') === 0) {
    lines = [
      lines[0],
      // Clean up message because "Module not found: " is descriptive enough.
      lines[1].replace(
          'Cannot resolve \'file\' or \'directory\' ', ''
      ).replace(
          'Cannot resolve module ', ''
      ).replace(
          'Error: ', ''
      ),
      // Skip all irrelevant lines.
      // (For some reason they only appear on the client in browser.)
      '',
      lines[lines.length - 1] // error location is the last line
    ]
  }

  // Cleans up syntax error messages.
  if (lines[1].indexOf('Module build failed: ') === 0) {
    // For some reason, on the client messages appear duplicated:
    // https://github.com/webpack/webpack/issues/3008
    // This won't happen in Node but since we share this helpers,
    // we will dedupe them right here. We will ignore all lines
    // after the original error message text is repeated the second time.
    var errorText = lines[1].substr('Module build failed: '.length);
    var cleanedLines: Array<string> = [];
    var hasReachedDuplicateMessage = false;
    // Gather lines until we reach the beginning of duplicate message.
    lines.forEach((line: string, index: number) => {
      if (
          // First time it occurs is fine.
      index !== 1 &&
      // line.endsWith(errorText)
      line.length >= errorText.length &&
      line.indexOf(errorText) === line.length - errorText.length
      ) {
        // We see the same error message for the second time!
        // Filter out repeated error message and everything after it.
        hasReachedDuplicateMessage = true;
      }
      if (
          !hasReachedDuplicateMessage ||
          // Print last line anyway because it contains the source location
          index === lines.length - 1
      ) {
        // This line is OK to appear in the output.
        cleanedLines.push(line);
      }
    });
    // We are clean now!
    lines = cleanedLines;
    // Finally, brush up the error message a little.
    lines[1] = lines[1].replace(
        'Module build failed: SyntaxError:',
        friendlySyntaxErrorLabel
    );
  }

  // Reassemble the message.
  message = lines.join('\n');
  // Internal stacks are generally useless so we strip them
  message = message.replace(
      /^\s*at\s.*:\d+:\d+[\s\)]*\n/gm, ''
  ); // at ... ...:x:y

  return message;
};

export default (json: any): any => {
  let formattedErrors: Array<string> = json.errors.map((message: string): string => {
    return 'Error in ' + formatMessage(message)
  });

  let formattedWarnings: Array<string> = json.warnings.map((message: string): string => {
    return 'Warning in ' + formatMessage(message)
  });

  let result: any = {
    errors: formattedErrors,
    warnings: formattedWarnings
  };

  if (result.errors.some(isLikelyASyntaxError)) {
    // If there are any syntax errors, show just them.
    // This prevents a confusing ESLint parsing error
    // preceding a much more useful Babel syntax error.
    result.errors = result.errors.filter(isLikelyASyntaxError);
  }
  return result;
};