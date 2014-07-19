'use strict';

/**
 *  Expose `error`
 */

module.exports = error;

/**
 *  Invoke the func when done
 *
 *  @param {Function}
 *  @return {Function}
 *  @api public
 */

function error (func, statuses) {

  if (typeof func != 'function') throw new Error('Must provide callback');

  if (!statuses || !(statuses instanceof Array))
    throw new Error('Must provide statuses array');

  return function(req, res, next) {

    function finish () {

      res.removeListener('finish', finish);
      res.removeListener('close', finish);

      // invoke func if status not in array
      if (~statuses.indexOf(res.statusCode)) func(req, res);
    };

    res.on('finish', finish);
    res.on('close', finish);

    next();
  };
};
