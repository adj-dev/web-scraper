// Dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const controller = require('./controllers');



// Initialize server
const app = express();
const PORT = process.env.PORT || 3000;



// Set-up public folder
app.use(express.static('public'));



// Set-up handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');



// Router
app.use('/', controller);



// Spin-up server
app.listen(PORT, () => {
  console.log(`Running express server on port ${PORT}`);
});
