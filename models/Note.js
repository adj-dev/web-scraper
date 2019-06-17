// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



// Define the Article schema
const noteSchema = new Schema({
  title: String,
  content: String
});



// Create the Article model
const Note = mongoose.model('Note', noteSchema);



// Export as a module
module.exports = Note;