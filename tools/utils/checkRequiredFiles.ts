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

import * as fs from 'fs';
import * as path from 'path';
import * as chalk from 'chalk';

let currentFilePath: string;

export default (files: Array<string>): boolean => {
  try {
    files.forEach((filePath: string) => {
      currentFilePath = filePath;
      fs.accessSync(filePath, fs.constants.F_OK);
    });
    return true;
  } catch (err) {
    let dirName: string = path.dirname(currentFilePath);
    let fileName: string = path.basename(currentFilePath);
    console.log(chalk.red('Could not find a required file.'));
    console.log(chalk.red('  Name: ') + chalk.cyan(fileName));
    console.log(chalk.red('  Searched in: ') + chalk.cyan(dirName));
    return false;
  }
};
