const express = require('express'); //import express
const { createSite, getSiteDetails, updateSite, getSites, getSiteMembers } = require('../Controllers/site');

// 1.
const router  = express.Router(); 
  
router.get('/', (req, res) => getSites(req, res))
  
router.post('/', (req, res) => createSite(req, res))

router.put('/:id', (req, res) => updateSite(req, res))

router.get('/:id', (req, res) => getSiteDetails(req, res))

router.get('/:id/members', (req, res) => getSiteMembers(req, res))
  

module.exports = router;