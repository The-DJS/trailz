/**
 * when an error occurs in an async router handler, the error
 * is manually passed to this function. This function simply
 * sends a internal server error status code back. Error handling
 * in this project could definitely be handled more gracefully.
 */
module.exports = (err, req, res, next) => {
  res.statusCode(500);
};
