// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



// Define the Article schema
const noteSchema = new Schema({
  name: {
    type: String,
    default: 'anonymous'
  },
  content: String
});



/*
Because mongodb isn't a relational database a middleware is required if the 
desired outcome of "unsaving" an article is to also delete that articles 
associated note. It just so happens that this application does desire such 
funtionality, and as such the middleware follows...
*/
// noteSchema.pre('remove', function (next) {
//   this.model('Article').findByIdAndUpdate(this._id, { $unset: { note: '' } }, err => {
//     if (err) throw err;
//     next()
//   }, next);
// });



// Create the Article model
const Note = mongoose.model('Note', noteSchema);



// Export as a module
module.exports = Note;