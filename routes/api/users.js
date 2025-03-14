const express = require("express");

const router = express.Router();

const {
  ctrlWrapper,
  validation,
  tokenCheck,
  uploadFile,
  verificationTokenCheck,
} = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { joiSchema } = require("../../models");

router.post("/signup", validation(joiSchema.userAdd), ctrlWrapper(ctrl.userSignUp));
router.post("/login", validation(joiSchema.userLogin), ctrlWrapper(ctrl.userLogin));
router.post("/verify", validation(joiSchema.userResend), ctrlWrapper(ctrl.resendVerification));
router.get("/current", tokenCheck, ctrlWrapper(ctrl.userCurrent));
router.get(
  "/verify/:verificationToken",
  verificationTokenCheck,
  ctrlWrapper(ctrl.updateVerificationMail)
);
router.get("/logout", tokenCheck, ctrlWrapper(ctrl.userLogout));
router.patch("/", tokenCheck, ctrlWrapper(ctrl.updateSubscription));
router.patch("/avatars", tokenCheck, uploadFile.single("avatar"), ctrlWrapper(ctrl.updateAvatar));

module.exports = router;
