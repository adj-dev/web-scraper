// Dependencies
const mongoose = require('mongoose');
let Schema = mongoose.Schema;


// Define the Article schema
const articleSchema = new Schema({
  title: String
});