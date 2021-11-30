//Promise wrapper to handler all network requests
module.exports = (func) => (req, res, next) => {
  Promise.resolve(func(req, res, next)).catch(next);
};

//This allows to avoid try/catch
