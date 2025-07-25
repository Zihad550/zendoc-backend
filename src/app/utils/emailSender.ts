import nodemailer from "nodemailer";
import config from "../config";

const emailSender = async (email: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: config.SENDER_EMAIL,
      pass: config.SENDER_APP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  await transporter.sendMail({
    from: '"PH Health Care" <fahimfiroz.ph@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Reset Password Link", // Subject line
    //text: "Hello world?", // plain text body
    html, // html body
  });
};

export default emailSender;
