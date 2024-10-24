const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GOOGLE_USER,
    pass: process.env.GOOGLE_APP_PWD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
transporter.verify((err, data) => {
  if (err) console.error("mail verify", err);
  console.log("smtp user availabel", data);
});

exports.sendConfirmationTokenMail = async (email, token) => {
  try {
    // const url = `http://localhost:3000/account/confirm/${token}`;
    const url = `${process.env.HOST}/account/confirm/${token}`;
    // console.log({ email, token });
    const mailOptions = {
      from: process.env.GOOGLE_USER,
      to: "ckumargn1998@gmail.com,ndcsm9611595047@gmail.com",
      subject: "Hello from gmail using API",
      text: "Hello from gmail using API",
      html: `<div class="v1block" style="box-sizing: border-box; width: 100%; margin-bottom: 30px; background: #ffffff; border: 1px solid #f0f0f0">
              <table style="box-sizing: border-box; width: 100%; border-spacing: 0; mso-table-rspace: 0pt; mso-table-lspace: 0pt; border-collapse: separate !important" width="100%">
                  <tbody>
                      <tr>
                          <td class="v1wrapper" style="box-sizing: border-box; font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 16px; vertical-align: top; padding: 30px" valign="top">
                          <table style="box-sizing: border-box; width: 100%; border-spacing: 0; mso-table-rspace: 0pt; mso-table-lspace: 0pt; border-collapse: separate !important" width="100%">
                              <tbody>
                                  <tr>
                                      <td style="box-sizing: border-box; padding: 0; font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 16px; vertical-align: top" valign="top">
                                      <h2 style="margin: 0; margin-bottom: 30px; font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-weight: 300; line-height: 1.5; font-size: 24px; color: #294661 !important">You're on your way!<br>
                                      Let's confirm your email address.</h2>
  
                                      <p style="margin: 0; margin-bottom: 30px; color: #294661; font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 300">By clicking on the following link, you are confirming ${email} address.</p>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td style="box-sizing: border-box; padding: 0; font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 16px; vertical-align: top" valign="top">
                                      <table cellpadding="0" cellspacing="0" class="v1btn v1btn-primary" style="box-sizing: border-box; border-spacing: 0; mso-table-rspace: 0pt; mso-table-lspace: 0pt; width: 100%; border-collapse: separate !important" width="100%">
                                          <tbody>
                                              <tr>
                                                  <td align="center" style="box-sizing: border-box; padding: 0; font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 16px; vertical-align: top; padding-bottom: 15px" valign="top">
                                                  <table cellpadding="0" cellspacing="0" style="box-sizing: border-box; border-spacing: 0; mso-table-rspace: 0pt; mso-table-lspace: 0pt; width: auto; border-collapse: separate !important">
                                                      <tbody>
                                                          <tr>
                                                              <td align="center" bgcolor="#348eda" style="box-sizing: border-box; padding: 0; font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 16px; vertical-align: top; background-color: #348eda; border-radius: 2px; text-align: center" valign="top"><a href="${url}" style="box-sizing: border-box; border-color: #348eda; font-weight: 400; text-decoration: none; display: inline-block; margin: 0; color: #ffffff; background-color: #348eda; border: solid 1px #348eda; border-radius: 2px; cursor: pointer; font-size: 14px; padding: 12px 45px" target="_blank" rel="noreferrer">Confirm Email Address</a></td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          </td>
                      </tr>
                  </tbody>
              </table>
              </div>
          "  
         
          `,
    };

    const info = transporter.sendMail(mailOptions);
    return info.response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
