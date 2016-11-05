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

const opn = require('opn');

export default (url: string): boolean => {
  try {
    opn(url).catch(() => {}); // Prevent `unhandledRejection` error.
    return true;
  } catch (err) {
    return false;
  }
};
