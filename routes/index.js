var express = require("express");
var router = express.Router();
var Url = require("../models/url");

router.get("/:shortid", async (req, res) => {
  const shortid = req.params.shortid;
  const result = await Url.findOne({ urlCode: shortid });
  if (!result) return res.sendStatus(404);
  res.redirect(result.longUrl);
});

module.exports = router;
