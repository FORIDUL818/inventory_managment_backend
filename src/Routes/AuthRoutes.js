const express = require('express');
const router = express.Router();

router.get('/register', (req, res) => {
  // Registration logic here
  res.send(' successfully');
}); 

module.exports = router;