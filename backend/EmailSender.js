const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com", // Use the appropriate host for your email provider
    port: 587, //no need to use the below 2 are default fields
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.MAIL,
      pass: process.env.APP_PASSWORD, //get thisfrom the google app password
    },
  });

//for defining the mail options
async function main(mailID, password) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: {
        name:"Student-manager",
        address: process.env.MAIL, //sender email
    }, 
    to: mailID, // list of receivers
    subject: "Hello, We are from the Student manager team.", // Subject line
    text: "Your credentials are: \n\n Username: " + mailID + "\n Password: " + password + "\n\n Please do not share this with anyone. \n\n Thanks and Regards \n Student-manager", // plain text body
    html: "<b>Your credentials are: <br><br> Mail: " + mailID + "<br> Password: " + password + "<br><br> Please do not share this with anyone. <br><br> Thanks and Regards <br> Student-manager</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
}

async function changePassword(mailId, otp){
  const info = await transporter.sendMail({
    from: {
        name:"Student-manager",
        address: process.env.MAIL, //sender email
    }, 
    to: mailId, // list of receivers
    subject: "Hello, We are from the Student manager team.", // Subject line
    text: "Your OTP for password reset is: " + otp + "\n\n Please do not share this with anyone. \n\n Thanks and Regards \n Student-manager", // plain text body
    html: "<b>Your OTP for password reset is: " + otp + "<br><br> Please do not share this with anyone. <br><br> Thanks and Regards <br> Student-manager</b>", // html body
  })
  
  console.log("Message sent: %s", info.messageId);
}

module.exports ={
  mailer: main,
  changePassword: changePassword
} 