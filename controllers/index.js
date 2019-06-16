// Dependencies
const express = require('express');
const router = express.Router();



// Define all routes
router.get('/', (req, res) => {
  res.render('home');
});



// Export the router as a module
module.exports = router;