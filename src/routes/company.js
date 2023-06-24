const express = require('express'); //import express
const { createCompany, getCompanies, updateCompany } = require('../Controllers/company');

// 1.
const router  = express.Router(); 
  
router.get('/', (req, res) => getCompanies(req, res))
  
router.post('/', (req, res) => createCompany(req, res))

router.put('/', (req, res) => updateCompany(req, res))
  

module.exports = router;