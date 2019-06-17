// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



// Define the Article schema
const articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  brief: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  // Create a reference to a possible note
  note: {
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }
});



// Create the Article model
const Article = mongoose.model('Article', articleSchema);



// Export as a module
module.exports = Article;