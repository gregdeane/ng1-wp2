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

const friendlySyntaxErrorLabel = 'Syntax error:';

const isLikelyASyntaxError = (message: string): boolean => {
  return message.indexOf(friendlySyntaxErrorLabel) !== -1;
};

const removeWebpackLoaderNotation = (name: string): string => {
  return (name.lastIndexOf('!') !== -1 && name.substr(name.lastIndexOf('!') + 1)) || name;
};

const trimVerboseModuleMessages = (message: string): string => {
  return message.replace(`Cannot resolve'file' or 'directory' `, '')
    .replace('Cannot resolve module ', '')
    .replace('Error: ', '');
};

const cleanSyntaxErrorMessages = (messages: Array<string>): Array<string> => {
  let errorText = messages[1].substr('Module build failed: '.length);
  let cleanedLines: Array<string> = [];
  let hasReachedDuplicateMessage = false;

  // Gather lines until we reach the beginning of duplicate message.
  messages.forEach((line: string, index: number) => {
    if (index !== 1 && line.length >= errorText.length && line.indexOf(errorText) === line.length - errorText.length) {
      hasReachedDuplicateMessage = true;
    }

    if (!hasReachedDuplicateMessage || index === messages.length - 1) {
      cleanedLines.push(line);
    }
  });

  messages = cleanedLines;
  messages[1] = messages[1].replace('Module build failed: SyntaxError:', friendlySyntaxErrorLabel);

  return messages;
};

const formatMessage = (message: string): string => {
  let lines: Array<string> = message.split('\n'); // line[0] = filename, line[1] = error message

  if (!lines[0] || !lines[1]) {
    return message;
  }

  // strip webpack-specific loader notation from filename
  lines[0] = removeWebpackLoaderNotation(lines[0]);

  // clean up verbose "module not found" messages for files/packages
  if (lines[1].indexOf('Module not found: ') === 0) {
    lines = [lines[0], trimVerboseModuleMessages(lines[1]), '', lines[lines.length - 1]];
  }

  // clean up syntax error messages
  if (lines[1].indexOf('Module build failed: ') === 0) {
    lines = cleanSyntaxErrorMessages(lines);
  }

  // reassemble the message.
  message = lines.join('\n');

  // internal stacks are generally useless so strip them
  message = message.replace(/^\s*at\s.*:\d+:\d+[\s\)]*\n/gm, ''); // at ... ...:x:y

  return message;
};

export default (json: any): any => {
  let formattedErrors: Array<string> = json.errors.map((message: string) => {
    return `Error in ${formatMessage(message)}`;
  });

  let formattedWarnings: Array<string> = json.warnings.map((message: string) => {
    return `Warning in ${formatMessage(message)}`;
  });

  let result: any = {
    errors: formattedErrors,
    warnings: formattedWarnings
  };

  // If there are any syntax errors, show just them
  if (result.errors.some(isLikelyASyntaxError)) {
    result.errors = result.errors.filter(isLikelyASyntaxError);
  }

  return result;
};
