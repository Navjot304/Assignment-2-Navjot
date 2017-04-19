/*
Name: Navjot Kaur
Student ID: 300869349
File Name: index.js
Web app name: https://comp308-2017-midterm-300869349.herokuapp.com/
*/

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');



//define the user models
let UserModel = require('../models/users');
let User = UserModel.User; // Alias for User

// define the contact model
let contact = require('../models/contacts');


//function to check if the user is authenticated
function requireAuth(req,res,next) {
  //check if the user is logged index
  if(!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
}
/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    displayName : req.user ? req.user.displayName : '',
    contacts: ''
   });
});

/* GET about page. */
router.get('/about', (req, res, next) => {
  res.render('content/about', {
    title: 'About',
    displayName : req.user ? req.user.displayName : '',
    contacts: ''
   });
});

/* GET about page. */
router.get('/resume', (req, res, next) => {
  res.render('content/resume', {
    title: 'Resume',
    displayName : req.user ? req.user.displayName : '',
    contacts: ''
   });
});


/* GET about page. */
router.get('/skills', (req, res, next) => {
  res.render('content/skills', {
    title: 'Skills',
    displayName : req.user ? req.user.displayName : '',
    contacts: ''
   });
});


/* GET about page. */
router.get('/contactme', (req, res, next) => {
  res.render('content/contactme', {
    title: 'Contact Me',
    displayName : req.user ? req.user.displayName : '',
    contacts: ''
   });
});


/* GET /Login - render the Login view*/
router.get('/login',(req,res,next) => {
// check to see if the user is not already logged in
  if(!req.User){
    //render the login page
    res.render('auth/login',{
      title : 'Login',
      contacts : '',
      messages : req.flash('loginMessage'),
      displayName : req.user ? req.user.displayName : ''

    });
    return;
  }
  else{
    return res.redirect('/contact') // rediredct to the game list
  }
});

//POST /Login - process the Login Page
router.post('/login', passport.authenticate('local',{
  successRedirect : '/contact',
  failureRedirect : '/login',
  failureFlash : 'bad login'
}));


// GET /register - render the register page
router.get('/register' ,(req,res,next) => {
  // check if the user is not already logged in
  if(!req.user)
  {
    // render the register page
    res.render('auth/register',{
      title : 'Register',
      contacts : '',
      messages : req.flash('registerMessage'),
      displayName : req.user ? req.user.displayName : ''
    });
    return;
  }
  else
  {
    return res.redirect('/contact'); // redirect to games list
  }
  
});

//POST //register - process the registration page
router.post('/register',(req,res,next)=>{
  User.register(
    new User({
        username : req.body.username,
        password : req.body.password,
        email : req.body.email,
        displayName : req.body.displayName
      }),
      req.body.password,
      (err) => {
        if(err){
          console.log('Error inserting new user');
          if(err.name == 'UserExistError') {
          req.flash('registerMessage' , 'Registration error : user already Exist');
        }
        return res.render('auth/register',{
            title : 'Register',
            contacts : '',
            messages : req.flash('registerMessage'),
            displayName : req.user ? req.user.displayName : ''
        });
      }
      // if Registration is successfull
      return passport.authenticate('local')(req,res,()=> {
          res.redirect('/contact');
      });
    });
});

//GET /logout - logout the user and redirect to the home page
router.get('/logout',(req,res,next) => {
  req.logout();
  res.redirect('/'); // redirect to homepage
});


module.exports = router;
