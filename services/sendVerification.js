const { User } = require("../models");
const { InternalServerError } = require("http-errors");
const jwt = require("jsonwebtoken");

const sendMail = require("./email");
const { JWT_SECRET_KEY, DOMEN, PORT } = process.env;

const sendVerification = async ({ user = {} }) => {
  const { email, _id: id } = user;

  const payload = {
    id,
  };

  const verificationToken = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 60 * 60 * 24 });

  const updUser = await User.findByIdAndUpdate(id, { verificationToken }, { new: true });

  if (!updUser) {
    throw new InternalServerError();
  }

  const linkForConfirmation = `${DOMEN}:${PORT}/api/users/verify/${verificationToken}`;

  const mailHtml = `Перейдите по ссылке для подтверждения электронной почты <a href='${linkForConfirmation}'>${linkForConfirmation}</a>`;

  sendMail({ mailRecipient: email, mailHtml });
};

module.exports = sendVerification;
