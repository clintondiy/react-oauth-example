const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Config = require("../../model/Configs");

// @route GET api/configs
// @desc Get All configs
// @access Public
router.get("/", (req, res) => {
  Config.find()
    .sort({ date: -1 })
    .then(configs => res.json(configs));
});

// @route POST api/configs
// @desc Create an config
// @access Private
router.post("/", auth, (req, res) => {
  const newConfig = new Config({
    name: req.body.name,
    value: req.body.value,
    description: req.body.description
  });
  newConfig.save().then(config => res.json(config));
});

router.put("/:id", (req, res) => {
  let id = req.params.id;
  Config.findByIdAndUpdate(id, req.body, { new: true }, (error, result) => {
    if (error) {
      res.send(error);
    } else {
      res.send(result);
    }
  });
});

// @route DELETE api/configs/delete/:id
// @desc delete an config
// @access Private
router.delete("/:id", auth, (req, res) => {
  Config.findById(req.params.id)
    .then(config => config.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
