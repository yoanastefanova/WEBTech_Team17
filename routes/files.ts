const express = require('express');
const filesRouter = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const bodyParser = require("body-parser");
const path = require('path');
const multer = require("multer");
const UserSchema = require("../models/User");


download = async (req: Request, res: Response) => {
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
    const user = res.locals.user;
    const file =  res.locals.file;

    let location = UPLOAD_DIR + user.id + file.path + file.name;

    res.download(location);
}