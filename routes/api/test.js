const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const User = require("../../model/Users");
const Role = require("../../model/Roles");
const mongoose = require("mongoose");

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
router.post(
  "/",
  (req, res, next) => {
    console.log(req.body);
    next();
  },
  (req, res) => {
    console.log(req.body);
    res.send("NICE");
  }
);

// @route DELETE api/users/delete/:id
// @desc delete an user
// @access Public
router.delete("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user => user.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
