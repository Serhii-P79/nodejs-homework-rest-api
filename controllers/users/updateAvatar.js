const { User } = require("../../models");
const { NotFound } = require("http-errors");
const Jimp = require("jimp");
const path = require("path");
const rootDir = require("../../rootDir");
const { unlink, readdir } = require("fs/promises");

const updateAvatar = async (req, res) => {
  const fileName = {
    id: req.user._id,
    type: "",
  };

  switch (req.file.mimetype) {
    case "image/jpeg":
      fileName.type = ".jpg";
      break;
    case "image/png":
      fileName.type = ".png";
      break;
    default:
      break;
  }

  const uploadAvatarDir = path.join(rootDir, "public/avatars");

  const files = await readdir(uploadAvatarDir);
  for (const file of files) {
    if (file.indexOf(fileName.id) !== -1) {
      const deleteFile = path.join(uploadAvatarDir, file);

      unlink(deleteFile).catch((err) => {
        throw err;
      });
    }
  }

  const uploadAvatar = path.join(rootDir, "public", "avatars", fileName.id + fileName.type);

  Jimp.read(req.file.path)
    .then((avatar) => {
      return avatar
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .write(uploadAvatar); // save
    })
    .catch((err) => {
      throw err;
    });

  unlink(req.file.path).catch((err) => {
    throw err;
  });

  const avatarURL = path.join("public", "avatars", fileName.id + fileName.type);

  const updUser = await User.findByIdAndUpdate(fileName.id, { avatarURL }, { new: true });
  if (!updUser) {
    throw NotFound("Not found");
  }

  res.json({ avatarURL: updUser.avatarURL });
};

module.exports = updateAvatar;
