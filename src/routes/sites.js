const express = require('express'); //import express
const { createSite, getSiteDetails, updateSite, getSites } = require('../Controllers/site');

// 1.
const router  = express.Router(); 
  
router.get('/', (req, res) => getSites(req, res))
  
router.post('/', (req, res) => createSite(req, res))

router.put('/', (req, res) => updateSite(req, res))

router.get('/:id', (req, res) => getSiteDetails(req, res))
  

module.exports = router;