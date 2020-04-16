const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const multer = require("multer");
const Files = require("../../model/Files");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Upload/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

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
router.post("/", upload.single("File"), (req, res, next) => {
  const file = new Files({
    FilePath: req.file.path,
    data: fs.readFileSync(req.file.data) //maybe
  });
  console.log(req.file.data);
  file
    .save()
    .then(result => {
      //console.log(result);
      res.status(201).json({
        message: "Created image successfully",
        filePath: result.File
      });
    })
    .catch(err => {
      //console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
