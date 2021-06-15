const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const bodyParser = require("body-parser");
const path = require('path');
const multer = require("multer");
const File = require("../models/fileSchema");
/*
const app = express();
*/

router.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

// Welcome Page
router.get('/', (req, res) => res.render('welcome'));
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/files");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `${file.originalname}`);
    },
  });

  // const multerFilter = (req, file, cb) => {
  //   if (file.mimetype.split("/")[1] === "pdf") {
  //     cb(null, true);
  //   } else {
  //     cb(new Error("Not a PDF File!!"), false);
  //   }
  // };

const upload = multer({
    storage: multerStorage,
    //fileFilter: multerFilter,
  });

// Home logged in
router.get('/homepage',  ensureAuthenticated, (req, res) =>
    res.render('homepage', {
        username: req.user.username,
        email:req.user.email,
    },
));

router.post("/api/uploadFile", upload.single("myFile"),ensureAuthenticated, async (req, res) => {
    try {
        const newFile = await File.create({
          name: req.file.filename,
            owner: req.user.email,
            size: 5
        });
        res.status(200).json({
          status: "success",
          message: "File created successfully!!",
        });
      } catch (error) {
        res.json({
          error,
        });
      }
});

router.get("/api/getFiles", async (req, res) => {
    try {
      const files = await File.find();

      res.status(200).json({
        status: "success",
        files,
      });
    } catch (error) {
      res.json({
        status: "Fail",
        error,
      });
    }
  });

// Shared page logged in
router.get('/shared',  ensureAuthenticated, (req, res) =>
    res.render('shared', {
        username: req.user.username
    }));


module.exports = router;