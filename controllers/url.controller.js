const nanoid = require("nanoid");
// import { nanoid } from 'nanoid'
const Url = require("../models/url");
const validUrl = require("valid-url");

exports.postUrl = async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = process.env.baseUrl;
  console.log(baseUrl);
  // check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).send({
      success: false,
      message: "Invalid base url",
      errorCode: "INVALID_BASE_URL",
    });
  }

  // Create url code
  const urlCode = nanoid().toString();

  // Check long url sent
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({
        longUrl,
      });

      if (url) {
        res.send({
          success: true,
          url: url,
        });
      } else {
        const shortUrl = baseUrl + "/" + urlCode;
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });
        url
          .save()
          .then((url) => {
            res.send({
              success: true,
              url: url,
            });
          })
          .catch((err) => {
            res.status(401).send({
              success: false,
              message: err,
            });
          });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  } else {
    res.status(401).json({ success: false, message: "Invalid Long URL" });
  }
};
