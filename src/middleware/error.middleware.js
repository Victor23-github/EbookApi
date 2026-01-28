const errorLogger = () => {
  return (err, req, res, next) => {
    console.error(err.stack);
    next(err);
  };
};
export default errorLogger
