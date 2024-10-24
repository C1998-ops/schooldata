const bcrypt = require("bcrypt");
const SALT_FACTOR = 8;
const hashPassword = async (user) => {
  const password = user?.password;
  const salt = await bcrypt.genSalt(SALT_FACTOR);
  const hashedPwd = await new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });
  return hashedPwd;
};
module.exports = hashPassword;