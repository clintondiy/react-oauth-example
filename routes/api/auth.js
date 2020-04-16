const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const User = require("../../model/Users");

// @route POST api/auth
// @desc Create an user
// @access Public
router.post("/", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ msg: "enter all please" });

  User.findOne({ username }).then(user => {
    if (!user) return res.status(400).json({ msg: "User does not exists" });

    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) res.status(400).json({ msg: "password not correct" });
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

// @route Get api/auth/user
// @desc Create an user
// @access Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .populate("role")
    .populate("info")
    .then(user => res.json(user));
});

module.exports = router;
