// const { sendEmail } = require('./email_services');

// function sendEmailWithOTP(to, subject,attachments,otp_code, callback) {
 
//   const mailOptions = {
//     from: 'izaz.m@mindvisiontechnologies.com',
//     to,
//     subject,
//     html: `<!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Email OTP Verification</title>
//         <style>
//           body {
//             margin: 0;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             height: 100vh;
//             background-color: #f4f4f4;
//           }
      
//           .otp-container {
//             background-color: #fff;
//             padding: 20px;
//             border-radius: 8px;
//             box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//             text-align: center;
//           }
      
//           .otp {
//             background-color: skyblue;
//             padding: 10px;
//             font-size: 30px;
//             border-radius: 4px;
//           }
      
//           .message {
//             margin-top: 20px;
//             font-size: 16px;
//           }
      
//           .attractive-contact {
//             margin-top: 20px;
//             font-weight: bold;
//             color: #4CAF50;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="otp-container">
//           <h2>Email OTP Verification</h2>
//           <p><span class="otp">${otp_code}</span></p>
//           <p class="message">Thank you for choosing Masfob for your verification needs.</p>
//           <p class="attractive-contact">For any inquiries, please contact our support team at support@masfob.com.</p>
//         </div>
//       </body>
//       </html>`,
//     attachments: attachments.map((file) => ({
//       filename: file.originalname || 'Untitled',
//       content: file.buffer || Buffer.from(''),
//     })),
//   };

//   sendEmail(mailOptions, (error, info) => {
//     callback(error, info);
//   });
// }

// module.exports = {
//   sendEmailWithOTP,
// };







// // const nodemailer = require('nodemailer');
// // const smtpTransport = require('nodemailer-smtp-transport');

// // function createTransporter() {
// //   return nodemailer.createTransport(
// //     smtpTransport({
// //       host: 'mail.mindvisiontechnologies.com',
// //       port: 587,
// //       secure: false,
// //       tls: {
// //         rejectUnauthorized: false,
// //       },
// //       auth: {
// //         user: 'izaz.m@mindvisiontechnologies.com',
// //         pass: 'India@123',
// //       },
// //     })
// //   );
// // }



// // function generateOTP() {
// //   // Generate a random 4-digit number
// //   const otp = Math.floor(1000 + Math.random() * 9000);
// //   return otp.toString();
// // }

// // function sendEmailWithOTP(to, subject, attachments, callback) {
// //   const transporter = createTransporter();
// //   const otp_code = generateOTP();

// //   const mailOptions = {
// //     from: 'izaz.m@mindvisiontechnologies.com',
// //     to,
// //     subject,
// //     html: 
// //     `<!DOCTYPE html>
// // <html lang="en">
// // <head>
// //   <meta charset="UTF-8">
// //   <meta name="viewport" content="width=device-width, initial-scale=1.0">
// //   <title>Email OTP Verification</title>
// //   <style>
// //     body {
// //       margin: 0;
// //       display: flex;
// //       align-items: center;
// //       justify-content: center;
// //       height: 100vh;
// //       background-color: #f4f4f4;
// //     }

// //     .otp-container {
// //       background-color: #fff;
// //       padding: 20px;
// //       border-radius: 8px;
// //       box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
// //       text-align: center;
// //     }

// //     .otp {
// //       background-color: skyblue;
// //       padding: 10px;
// //       font-size: 30px;
// //       border-radius: 4px;
// //     }

// //     .message {
// //       margin-top: 20px;
// //       font-size: 16px;
// //     }

// //     .attractive-contact {
// //       margin-top: 20px;
// //       font-weight: bold;
// //       color: #4CAF50;
// //     }
// //   </style>
// // </head>
// // <body>
// //   <div class="otp-container">
// //     <h2>Email OTP Verification</h2>
// //     <p> <span class="otp">${otp_code}</span></p>
// //     <p class="message">Thank you for choosing Masfob for your verification needs.</p>
// //     <p class="attractive-contact">For any inquiries, please contact our support team at support@masfob.com.</p>
// //   </div>
// // </body>
// // </html>`,
// //     attachments: attachments.map((file) => ({
// //       filename: file.originalname || 'Untitled',
// //       content: file.buffer || Buffer.from(''),
// //     })),
// //   };

// //   transporter.sendMail(mailOptions, (error, info) => {
// //     // Pass the generated OTP along with the other information to the callback
// //     callback(error, info, otp_code);
// //   });
// // }

// // module.exports = {
// //   sendEmailWithOTP,
// // };
