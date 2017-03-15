/* 
Name: Navjot Kaur
Student ID: 300869349
File Name: books.js
Web app name: https://comp308-2017-midterm-300869349.herokuapp.com/
*/

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let contactlist = require('../models/contactslist');

// create a function to check if the user is authenticated
function requireAuth(req, res, next) {
  // check if the user is logged in
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
}


/* GET books List page. READ */
router.get('/', requireAuth, (req, res, next) => {
  // find all books in the books collection
  contactlist.find((err, contactslist) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('contactslist/index', {
        title: 'Business Contacts List',
        books: contactslist,
        displayName: req.user.displayName
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', requireAuth, (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/

  res.render('contactslist/details', {
    title: "Add a new Contact",
    contactslist: '',
    displayName: req.user.displayName
  });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', requireAuth, (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/

  let newContact = new contactlist({
    "Contact Name": req.contactlist.contactname,
    "Contact Number": req.contactlist.contactnumber,
    "Email Address": req.contactlist.emailaddress
  });

  contactlist.create(newContact, (err, contactlist) => {
    console.log(req, res)
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect('/contactslist');
    }
  });

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', requireAuth, (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/


  try {
    // get a reference to the id from the url
    let id = mongoose.Types.ObjectId.createFromHexString(req.params.id);

    // find one book by its id
    contactlist.findById(id, (err, contactslist) => {
      if (err) {
        console.log(err);
        res.end(error);
      } else {
        // show the book details view
        res.render('contactslist/details', {
          title: 'Contact Details',
          contactslist: contactslist,
          displayName: req.user.displayName
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.redirect('/errors/404');
  }

});

// POST - process the information passed from the details form and update the document
router.post('/:id', requireAuth, (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/

  // get a reference to the id from the url
  let id = req.params.id;

  let updatedContact = contactlist({
    "_id": id,
    "Contact Name": req.contactlist.contactname,
    "Contact Number": req.contactlist.contactnumber,
    "Email Address": req.contactlist.emailaddress
  });

  contactlist.update({ _id: id }, updatedContact, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the books List
      res.redirect('/contactslist');
    }
  });

});

// GET - process the delete by user id
router.get('/delete/:id', requireAuth, (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/
  // get a reference to the id from the url
  let id = req.params.id;

  contactlist.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the games list
      res.redirect('/contactslist');
    }
  });


});


module.exports = router;
