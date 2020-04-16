const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Profile = require("../../model/Profiles");
const multer = require("multer");
const fs = require("fs");

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

// @route GET api/profiles
// @desc Get All profiles
// @access Public
router.get("/", (req, res) => {
  Profile.find()
    .sort({ date: -1 })
    .then(profiles => res.json(profiles));
});

// @route POST api/profiles
// @desc Create an profile
// @access Private
router.post("/", auth, upload.single("image"), (req, res) => {
  const newProfile = new Profile({
    name: req.body.name,
    description: req.body.description,
    number: req.body.number,
    photoPath: req.file.path,
    img: {
      data: fs.readFileSync(req.file.path),
      contentType: req.file.mimetype
    }
  });
  newProfile.save().then(profile => res.json(profile));
});

// @route DELETE api/profiles/delete/:id
// @desc delete an item
// @access Private
router.delete("/:id", auth, (req, res) => {
  Profile.findById(req.params.id)
    .then(profile => profile.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
