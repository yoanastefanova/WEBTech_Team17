const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const app = express();
// Static files
app.use(express.static('public'));
app.use('styles', express.static(__dirname + '../public/styles'));
app.use('images', express.static(__dirname + '../public/images'));
app.use('scripts', express.static(__dirname + '../public/scripts'));


// Load User model
const User = require('../models/User');

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));

// Register Handle
router.post('/register', (req, res) => {
    //destructuring
    const { username, email, password, password2 } = req.body;
    let errors = [];

    // Check required fields
    if(!username || !email || !password || !password2){
        errors.push({msg: 'Please fill in all fields!'});
    }

    // Check password match
    if(password != password2){
        errors.push({msg: 'Passwords do not match!'});
    }

    // Check password length
    if(password.length <6){
        errors.push({msg: 'Passwords should be at leas 6 characters!'});
    }
    // Check other things validation --------------------------

    if(errors.length > 0){
        res.render('register', {    //re-render registration form
            errors,
            username,   // short for username: username
            email,
            password,
            password2
        });
    } else {
        // Validation pass => Use the model
        User.findOne({ email: email })  //returns a promise from User model
            .then(user => {
                if(user) {
                    // User already exists
                    errors.push({ msg: 'Email is already registered!'})
                    res.render('register', {    //re-render registration form
                        errors,
                        username,
                        email,
                        password,
                        password2
                    });
                } else {
                    const newUser = new User({
                        username,
                        email,
                        password
                    });

                    // Hash Password
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;
                            // Set password
                            newUser.password = hash;
                            // Save user
                            newUser.save()  //Gives us a promise
                                .then(user => {
                                    req.flash('success_msg', 'You are now registered and can log in!');
                                    res.redirect('/users/login');
                                    return res.sendStatus(204);
                                })
                                .catch(err => console.log());
                        }))
                }
            });
    }
});

// Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/homepage',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// Logout Handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You have logged out.');
    res.redirect('/users/login');
})
module.exports = router;
