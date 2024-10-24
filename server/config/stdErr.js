function Custom400Error(res, options = {}) {
  const { status = 400, type, message } = options; //default value of status can be changed.
  const ErrorObj = {};
  if (type) {
    ErrorObj.type = type;
  }
  if (message) {
    ErrorObj.message = message;
  }
  return res.status(status).send(ErrorObj);
}
module.exports = Custom400Error;
