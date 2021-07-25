var express = require("express");
var router = express.Router();
var apis = require("../controllers/url.controller");

router.post("/", apis.postUrl);

module.exports = router;
