// Dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const controller = require('./controllers');
const mongoose = require('mongoose');



// Initialize server
const app = express();
const PORT = process.env.PORT || 3000;



// Dev-dependencies (set up morgan)
// const morgan = require('morgan');
// app.use(morgan('dev'));



// Configure the express server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');



// Configure the mongodb connection to work for `development` or `production` and create connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/webscraper';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });



// Router
app.use('/', controller);



// Spin-up server
app.listen(PORT, () => {
  console.log(`Running express server on port ${PORT}`);
});
