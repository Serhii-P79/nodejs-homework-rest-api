const { User } = require("../../models");
const { BadRequest, NotFound } = require("http-errors");
const { sendVerification } = require("../../services");

const resendVerification = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    throw new BadRequest("missing required field email");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFound();
  }

  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }

  try {
    sendVerification({ user });

    res.status(200).json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerification;
