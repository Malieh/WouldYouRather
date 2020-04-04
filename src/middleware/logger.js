const logger = () => {
  return function (next) {
    return function (action) {
      return next(action);
    };
  };
};
export default logger;
