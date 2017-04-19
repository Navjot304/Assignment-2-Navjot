
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');


//define the user models
let UserModel = require('../models/users');
let User = UserModel.User; // Alias for User*/
// define the book model
let contact = require('../models/contacts');


//function to check if the user is authenticated
function requireAuth(req,res,next) {
  //check if the user is logged index
  if(!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
}

/* GET contacts List page. READ */
router.get('/',requireAuth, (req, res, next) => {
  // find all contacts in the contacts collection
  contact.find( (err, contacts) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('contact/index', {
        title: 'ContactList',
        contact: contacts,
        displayName : req.user.displayName

      });
    }
  });

});


//  GET the Book Details page in order to add a new Book
router.get('/add',requireAuth,(req, res, next) => {

 res.render('contact/details', {
    title: 'Add a new Contact',
    contact : ' ',
    displayName :  req.user.displayName

  });
    
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', requireAuth,(req, res, next) => {

contact.create ({
    "name" : req.body.name,
    "number" : req.body.number,
    "email" : req.body.email
    
  }, (error , contact)=>  {
    if(error) {
      console.log (err);
      res.end(err);
    }
    else
    {
      res.redirect('/contact');
    }
  });

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id',requireAuth,(req, res, next) => {

//get a rederence to the id of the book to edit
let id = mongoose.Types.ObjectId.createFromHexString(req.params.id);

  
  // find the contacts to edit by its id in the contacts collection
  contact.findById(id,(err, contacts) => {
  
    if (err) {
        console.error(err);
      res.end(error);
    }
    else {
        // show the edit view
      res.render('contact/details', {
        title: 'Contact Details',
        contact : contacts,
        displayName : req.user.displayName

      });
    }
  }); 
  
});

// POST - process the information passed from the details form and update the document
router.post('/:id',requireAuth, (req, res, next) => {

 //get a rederence to the id of the book to edit
    let id = req.params.id;

//create a new contacts object to hold the changes
    let contacts = new contact({
        "_id":id,
        "name" : req.body.name,
    "number" : req.body.number,
    "email" : req.body.email
    
      });

  contact.update({ _id: id }, contacts ,(err) =>{
  if(err){
    console.log(err);
    res.end(error);
  }
  else{
    //refresh the book list
    res.redirect('/contact');
  }
  });

});

// GET - process the delete by user id
router.get('/delete/:id',requireAuth,(req, res, next) => {

//get a rederence to the id of the book to edit
    let id = req.params.id;
  
  contact.remove({_id : id}, (err) => {
    if(err) {
      console.log(err);
      res.end(err);
    }
    else
    {
      res.redirect('/contact');
     }
  });
});


module.exports = router;
