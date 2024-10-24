const jwt = require("jsonwebtoken");
const tokenSecret = process.env.JWT_TOKEN;

const generateToken = (user) => {
  return jwt.sign(user, tokenSecret, {
    expiresIn: "1h",
  });
};
const generateMailToken = (id) => {
  return jwt.sign(id, process.env.JWT_MAIL_SECRET, { expiresIn: "1d" });
};
module.exports = { generateToken, generateMailToken };
