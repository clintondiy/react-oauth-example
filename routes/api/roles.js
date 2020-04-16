const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Role = require("../../model/Roles");

// @route GET api/roles
// @desc Get All roles
// @access Public
router.get("/", (req, res) => {
  Role.find()
    .sort({ date: -1 })
    .then(roles => res.json(roles));
});

// @route POST api/roles
// @desc Create an role
// @access Private
router.post("/", auth, (req, res) => {
  const newRole = new Role({
    name: req.body.name,
    description: req.body.description
  });
  newRole.save().then(role => res.json(role));
});

// @route DELETE api/roles/delete/:id
// @desc delete an role
// @access Private
router.delete("/:id", auth, (req, res) => {
  Role.findById(req.params.id)
    .then(role => role.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
