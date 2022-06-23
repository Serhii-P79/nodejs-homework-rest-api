const { User } = require("../../models");
const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { sendVerification } = require("../../services");

const userSignUp = async (req, res, next) => {
  const { email: emailUser, password, subscription: subscriptionUser } = req.body;
  const user = await User.findOne({ email: emailUser });

  if (user) {
    throw new Conflict("Email in use");
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const userAvatar = await gravatar.url(emailUser, { protocol: "http", s: "250" });

  try {
    const result = await User.create({
      email: emailUser,
      password: hashPassword,
      subscription: subscriptionUser,
      avatarURL: userAvatar,
    });
    const { email, subscription } = result;

    sendVerification({ user: result });

    res.status(201).json({
      user: { email, subscription },
    });
  } catch (error) {
    if (error._message === "user validation failed") {
      error.status = 400;
    }
    next(error);
  }
};

module.exports = userSignUp;
