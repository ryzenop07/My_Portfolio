const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');

router.get('/', portfolioController.getPortfolio);
router.put('/', portfolioController.updatePortfolio);

module.exports = router;
