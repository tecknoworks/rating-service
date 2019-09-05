const express = require('express');
const router = express.Router();

const ratingApi=require('./rating');
const RatingController = require('../controllers/index').RatingController;

router.use('/', ratingApi(express.Router()));

module.exports=router;