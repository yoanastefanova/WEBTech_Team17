const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
/*
const app = express();
// Static files
app.use(express.static('public'));
app.use('styles', express.static(__dirname + 'public/styles'));
app.use('images', express.static(__dirname + 'public/images'));
app.use('scripts', express.static(__dirname + 'public/scripts'));
*/

// Welcome Page
router.get('/', (req, res) => res.render('welcome'));

// Home logged in
router.get('/homepage',  ensureAuthenticated, (req, res) =>
    res.render('homepage', {
        username: req.user.username
    }));

// Shared page logged in
router.get('/shared',  ensureAuthenticated, (req, res) =>
    res.render('shared', {
        username: req.user.username
    }));

module.exports = router;