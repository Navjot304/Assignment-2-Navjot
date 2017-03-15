/*
Name: Navjot Kaur
Student ID: 300869349
File Name: contactslist.js
Web app name: https://comp308-2017-midterm-300869349.herokuapp.com/

*/
let mongoose = require('mongoose');

// create a model class
let contactslistSchema = mongoose.Schema({
    ContactName: String,
    ContactNumber: String,
    EmailAddress: String
},
{
  collection: "contactslist"
});

module.exports = mongoose.model('contactslist', contactslistSchema);
