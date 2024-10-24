const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const hashPassword = require("../utils/encryt");
const signupSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Not a valid Email");
        }
      },
    },
    mobile: {
      type: String,
      // required: true,
    },
    AccountVerified: {
      type: Boolean,
      default: false,
    },
    companyName: String,
    dob: String,
    password: String,
  },
  { timestamps: true }
);

signupSchema.pre("save", async function create(next) {
  const signupInfo = this;
  if (!signupInfo.isModified("password")) return next();
  try {
    this.password = await hashPassword(signupInfo);
    return next();
  } catch (error) {
    return next(error);
  }
});

signupSchema.methods.confirmPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("signupInfo", signupSchema);
