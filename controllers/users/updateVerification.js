const { User } = require("../../models");
const { NotFound } = require("http-errors");

const updateVerificationMail = async (req, res) => {
  const { _id } = req.user;

  const updUser = await User.findByIdAndUpdate(
    _id,
    {
      verify: true,
      verificationToken: null,
    },
    { new: true }
  );
  if (!updUser) {
    throw NotFound("Not found");
  }

  res.status(200).json({
    message: "Verification successful",
  });
};

module.exports = updateVerificationMail;
