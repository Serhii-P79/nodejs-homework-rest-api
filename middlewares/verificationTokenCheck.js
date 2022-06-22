const { User } = require("../models");
const { NotFound } = require("http-errors");
const jwt = require("jsonwebtoken");

const { JWT_SECRET_KEY } = process.env;

const verificationTokenCheck = async (req, res, next) => {
  const { verificationToken } = req.params;

  try {
    if (!verificationToken) {
      throw new NotFound("Not Found");
    }
    const { id } = jwt.verify(verificationToken, JWT_SECRET_KEY);

    const user = await User.findById(id);
    if (!user || verificationToken !== user.verificationToken) {
      throw new NotFound("Not Found");
    }
    req.user = user;

    next();
  } catch (error) {
    error.message = "Not Found";
    error.status = 404;
    next(error);
  }
};

module.exports = verificationTokenCheck;
