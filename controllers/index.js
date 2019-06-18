// Dependencies
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../models');
const router = express.Router();



// Define route for homepage
router.get('/', (req, res) => {
  // Send out a request to the database and retrieve all - if any - scraped articles.
  db.Article.find({})
    .then(result => {
      // If any Articles are found, send them to the client
      res.render('index', { result });
    })
    .catch(err => {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});



// GET route for saved articles
router.get('/saved', (req, res) => {
  res.render('saved');
});



// Route used for initializing web-scrape
router.get('/scrape', (req, res) => {
  // First things first: remove current entries from the database to avoid repeats
  db.Article.deleteMany()
    .then(() => {
      axios.get('https://www.infoworld.com/category/web-development/')
        .then(response => {
          // Use the power of cheerio to capture all the html of the target site
          let $ = cheerio.load(response.data);

          // Iterate over a specified portion of the target site
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
            db.Article.create(package).then(result => console.log(result)).catch(err => console.log(err));
          });

          // Sends a success message to the browser once complete
          res.send('success');
        })
        // Catch axios errors
        .catch(err => {
          if (err) res.send(err);
        });
    })
    // Catch mongoose errors
    .catch(err => console.log(err));
});



// Handles requests to update the `saved` field for an Article
router.put('/toggleSaved/:id', (req, res) => {
  // Capture the document id from the request
  let { id } = req.params;

  // Find the concerned document
  db.Article.findById(id, (err, doc) => {
    if (err) {
      return console.log(err);
    }

    // Update the value of the `saved` field
    if (!doc.saved) {
      doc.saved = true;
    } else {
      doc.saved = false;
    }

    // Save the changes
    doc.save();
  });

  // Return a success message
  res.send('Successfully updated `saved` field');
});


// Export the router as a module
module.exports = router;