const nodemailer = require("nodemailer");
const { MAIL_PASSWORD, MAIL_FOR_SENDING } = process.env;

const sendMail = async ({ mailRecipient, mailText = "", mailHtml = "" }) => {
  const config = {
    host: "mx1.cityhost.com.ua", // smtp.meta.ua
    port: 465,
    secure: true,
    auth: {
      user: MAIL_FOR_SENDING,
      pass: MAIL_PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(config);
  const emailOptions = {
    from: MAIL_FOR_SENDING,
    to: mailRecipient,
    subject: "Mail confirmation",
    text: mailText,
    html: mailHtml,
  };

  console.log("mailHtml: ", mailHtml);

  // const result = await
  transporter.sendMail(emailOptions);
  // .then((info) => console.log(info))
  // .catch((err) => console.log(err));
  // console.log(result);
};

module.exports = sendMail;
