const express = require("express");
const router = express.Router();
const Info = require("../../model/Infos");
const _ = require("lodash");

// @route GET api/infos
// @desc Get All infos
// @access Public
router.get("/", (req, res) => {
  Info.find()
    .sort({ date: -1 })
    .then(infos => res.json(infos));
});

router.put("/:id", (req, res) => {
  let id = req.params.id;
  Info.findByIdAndUpdate(id, req.body, { new: true }, (error, result) => {
    if (error) {
      res.send(error);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;
