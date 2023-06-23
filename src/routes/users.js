const express = require('express'); //import express
const { login, signup  } = require('../controllers/auth-api');
const { getUsers } = require('../controllers/users');

// 1.
const router  = express.Router(); 
  
router.post('/signup', (req, res) => signup(req, res))
  
router.post('/login', (req, res) => login(req, res))

router.get('/users', (req, res) => getUsers(req, res))
  

module.exports = router;