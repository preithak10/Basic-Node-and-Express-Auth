const express = require('express');
const searchController = require('../controller/searchController');

const router = express.Router();

router.get('/', searchController.search)

module.exports = router;