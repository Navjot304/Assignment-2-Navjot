let mongoose = require('mongoose');

// create a model class
let contactslistSchema = mongoose.Schema({
    name: String,
    number: Number,
    email: String
    
},
{
  collection: "contactslist"
});

module.exports = mongoose.model('contactslist', contactslistSchema);
