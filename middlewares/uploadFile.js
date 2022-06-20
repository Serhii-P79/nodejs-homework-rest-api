const multer = require("multer");

const { UnsupportedMediaType } = require("http-errors");

const path = require("path");
const rootDir = require("../rootDir");
const tmpUploadDir = path.join(rootDir, "tmp/uploads");

const multerOpt = {
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, tmpUploadDir);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
  limits: {
    fileSize: 2097152,
  },
  fileFilter: function (req, file, cb) {
    try {
      switch (file.mimetype) {
        case "image/jpeg":
        case "image/png":
        case "image/bmp":
        case "image/tiff":
        case "image/gif":
          cb(null, true);
          break;
        default:
          throw new UnsupportedMediaType();
      }
    } catch (error) {
      cb(error);
    }
  },
};

const uploadFile = multer(multerOpt);

module.exports = uploadFile;
