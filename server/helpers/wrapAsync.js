/**
 * wrap async can be used to wrap route handlers that
 * require the await keyword. if you don't want to use
 * this function, you have to wrap the function body in
 * a try catch block and manually pass the error to the
 * error handling middleware function.
 */

module.exports = (fn) => (req, res, next) =>
  fn(req, res).catch((error) => {
    next(error);
  });
