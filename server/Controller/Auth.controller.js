const expressAsyncHandler = require("express-async-handler");
const Model = require("../Models/Signup.model");
const { sendConfirmationTokenMail } = require("../Email/Email");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createAccount = expressAsyncHandler(async (req, res) => {
  try {
    const userInput = req.body;
    console.log("userInput", userInput);
    if (!userInput) {
      return res.status(400).json({
        status: "Regristration Failed",
        message: "Data not availabel",
      });
    }
    const doesEmailExist = await Model.findOne({ email: userInput.email });
    if (doesEmailExist) {
      return res.status(409).send({
        type: "EMAIL EXISTS",
        message: "Failed! Email is already in use!",
      });
    }
    const inputModel = new Model(userInput);
    const result = await inputModel.save();
    if (result) {
      //handle verification mail generation
      const tempToken = generateToken.generateMailToken({ id: result._id });
      console.log("tempToken", tempToken);
      const sendMail = await sendConfirmationTokenMail(
        userInput.email,
        tempToken
      );
      if (sendMail !== null) {
        const date = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        }).format(new Date());
        console.log("date", date);
        res.status(201).send({
          status: "Registration successfull",
          message: `An email was sent at ${userInput.email} at ${date}. pls check  it for verification !`,
        });
      } else {
        res.status(403).json({
          status: "Registration failed",
          message: "Error sending verification mail",
        });
      }
    } else {
      throw new Error("Error occurred while creating user Account");
    }
  } catch (error) {
    console.error("Error creating account!. check controller!", error);
    return res.status(500).json({
      message: "Unknown error occured at server side",
      error: error.message,
    });
  }
});
const signInAccount = expressAsyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await Model.findOne({ email });
    if (!result) {
      return res
        .status(400)
        .json({ type: "FAILED", message: "email not existing" });
    }
    const validUser = await bcrypt.compare(password, result.password);
    if (validUser) {
      if (result.AccountVerified) {
        const userData = {
          // email: result.email,
          id: result._id.toString(),
        };

        userData.token = generateToken.generateToken(userData);

        res.status(200).json({
          type: "SUCCESS",
          message: "login successfull !",
          userData,
        });
      } else {
        console.log("not verified", result.AccountVerified);
        res.status(403);
        throw new Error("Please check you email and verify yourself !");
      }
    } else {
      res.status(404);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    console.log("login error", error);
    throw new Error(error);
  }
});
const verifyAccount = expressAsyncHandler(async (req, res) => {
  try {
    const { token } = req.params;
    const result = jwt.verify(token, process.env.JWT_MAIL_SECRET);
    if (result) {
      const updateUser = await Model.findByIdAndUpdate(
        result.id,
        {
          AccountVerified: true,
        },
        { new: true, runValidators: true }
      );
      if (updateUser) {
        return res.status(200).json({
          status: "Verification successfull",
          url: `${process.env.HOST}/signin`,
        }); // localhost
        // return res.redirect(`${process.env.PROD_CLIENT}/signin`);
      } else {
        res
          .status(404)
          .json({ status: "Verfication failed", message: "User not found" });
      }
    } else {
      res.status(404);
      throw new Error("User not found!");
    }
  } catch (error) {
    console.error("Error verifying user", error);
    res
      .status(500)
      .json({ status: "An internal error Occured", message: error.message });
  }
});
module.exports = { createAccount, signInAccount, verifyAccount };
// setTimeout(() => {
//   try {
//     // Verify the token
//     const verifyToken = jwt.verify(token, "temp");
//     console.log("verifyToken", verifyToken); // Valid token
//   } catch (error) {
//     // Handle errors for invalid/expired tokens
//     console.error("Token verification failed:", error.message);
//     if (error.name === "TokenExpiredError") {
//       console.log("Token has expired.");
//     } else if (error.name === "JsonWebTokenError") {
//       console.log("Invalid token.");
//     } else {
//       console.log("Token verification failed for unknown reason.");
//     }
//   }
// }, 2000);
