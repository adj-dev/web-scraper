// Dependencies
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const router = express.Router();


// require the Article model -- testing stage
const Article = require('../models/Article.js');



// Define all routes
router.get('/', (req, res) => {
  // Send out a request to the database and retrieve all - if any - scraped articles.
  Article.find({})
    .then(result => {
      // If any Books are found, send them to the client
      console.log(result);
      res.render('index', { result });
    })
    .catch(err => {
      // If an error occurs, send it back to the client
      res.json(err);
    });

  // res.render('index');
});



// Route used for initializing web-scrape
router.get('/scrape', (req, res) => {
  axios.get('https://www.infoworld.com/category/web-development/')
    .then(response => {
      let $ = cheerio.load(response.data);

      $('.river-well').each((i, element) => {
        // Grab all relevant info from cheerio
        let title = $(element).find('a').text();
        let brief = $(element).find('h4').text();
        let url = $(element).find('a').attr('href');

        // Infoworld.com provides a partial href so the missing part must be concatenated manually
        url = 'https://www.infoworld.com' + url;

        // Wrap the package (es6 style)
        let package = { title, brief, url };

        // Send our neatly arranged package off to the db to be sorted
        Article.create(package).then(result => console.log(result)).catch(err => console.log(err));
      });

      res.send('success');
    })
    .catch(err => {
      if (err) res.send(err);
    });
});



// Export the router as a module
module.exports = router;