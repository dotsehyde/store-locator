const express = require('express');
const Controller = require('../controllers/stores.controller');
const router = express.Router();

router.get('/', Controller.getStores).post('/',Controller.addStore);

module.exports = router;