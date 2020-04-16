const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const User = require("../../model/Users");
const Info = require("../../model/Infos");

const mongoose = require("mongoose");
const mail = require("./common/mail");

// @route GET api/users
// @desc Get All users
// @access Public
router.get("/", (req, res) => {
  User.find()
    .sort({ username: 1 })
    .populate("role")
    .exec((err, users) => {
      if (err) return handleError(err);
      res.json(users);
    });
});

// @route POST api/users
// @desc Create an user
// @access Public
router.post("/", (req, res) => {
  const { username, email, password } = req.body;
  const newInfo = new Info({
    _id: new mongoose.Types.ObjectId()
  });
  newInfo.save();

  if (!username || !email || !password)
    return res.status(400).json({ msg: "enter all please" });

  User.findOne({ username }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({
      username,
      email,
      password,
      info: newInfo._id
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            {
              expiresIn: 3600
            },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  username: user.username,
                  email: user.email
                }
              });
            }
          );
        });
      });
    });
  });
});

// @route DELETE api/users/delete/:id
// @desc delete an user
// @access Public
router.delete("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user => user.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
