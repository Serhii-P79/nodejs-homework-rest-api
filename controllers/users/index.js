const userSignUp = require("./signUp");
const userLogin = require("./login");
const userCurrent = require("./current");
const userLogout = require("./logout");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");
const updateVerificationMail = require("./updateVerification");
const resendVerification = require("./resendVerification");

module.exports = {
  userSignUp,
  userLogin,
  userCurrent,
  userLogout,
  updateSubscription,
  updateAvatar,
  updateVerificationMail,
  resendVerification,
};
