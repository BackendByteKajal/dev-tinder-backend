const nodemailer = require("nodemailer");

// async function sendMail(request) {
//   console.log('request: ', request);
//   console.log("process.env.APP_PASSWORD: ", process.env.APP_PASSWORD);
//   // 1. Create transporter (SMTP details)
//   console.log("sendMal");
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "kajaljagtap5232@gmail.com",
//       pass: process.env.APP_PASSWORD,
//     },
//   });

//   // 2. Email details
//   console.log(" // 2. Email details: "); // 2. Email details);
//   const info = await transporter.sendMail({
//     from: "kajaljagtap5232@gmail.com",
//     to: request.toUserId.emailId,
//     subject: "You Have Friend Request From DevTinder",
//     text: `hey ${request.toUserId.firstName} you have devTinderRequest From ${request.fromUserId.firstName}`,
//   });

//   console.log("Email sent:", info.messageId);
// }

async function sendMail(emailIds) {
  // 1. Create transporter (SMTP details)
  console.log("sendMal");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kajaljagtap5232@gmail.com",
      pass: process.env.APP_PASSWORD,
    },
  });

  // 2. Email details
  console.log(" // 2. Email details: "); // 2. Email details);
  const info = await transporter.sendMail({
    from: "kajaljagtap5232@gmail.com",
    to: emailIds,
    subject: "You Have Friend Request From DevTinder",
    text: `hey you have devTinderRequest `,
  });

  console.log("Email sent:", info.messageId);
}

module.exports = sendMail;
