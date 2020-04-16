const express = require("express");
const router = express.Router();
const multer = require("multer");

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var storage = multer.diskStorage({
  destination: "./client/src/Upload/",
  filename: function(req, file, cb) {
    //req.body is empty...
    //How could I get the new_file_name property sent from client here?
    cb(
      null,
      file.originalname.split(".")[0] +
        "-" +
        Date.now() +
        "." +
        file.originalname.split(".")[1]
    );
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

// @route POST api/files
// @desc Get All files
// @access Public
router.post("/", upload.single("image"), (req, res, next) => {
  console.log(req);
  res.send(req.file.filename);
});

module.exports = router;
