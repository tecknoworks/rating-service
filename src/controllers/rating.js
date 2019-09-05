const CrudService = require('../services/crud');
const Rating = require('../models/rating').Rating;
const RatingService = CrudService(Rating);

module.exports = {
    getAllRatingsCtrl: async function (req, res) {
        try {
            let ratingsList = await RatingService.getAll();
            
            res.send(ratingsList);
        } catch (error) {
            res.send(error.message);
        }
    },
    getRatingByIdCtrl: async function (req, res) {
        try {
            let rating = await RatingService.getById(req.params.id);
            
            res.send(rating);
        } catch (error) {
            res.send(error.message);
        }
    },
    getRatingsByUserCtrl: async function (req, res) {
        try {
            let rating = await RatingService.getRatingsByUser(req.userId);
            
            res.send(rating);
        } catch (error) {
            res.send(error.message);
        }
    },
    getRatingsByMovieCtrl: async function (req, res) {
        try {
            let rating = await RatingService.getRatingsByMovie(req.query.screenplayId);
            
            res.send(rating);
        } catch (error) {
            res.send(error.message);
        }
    },
    getRatingByUserAndMovieCtrl: async function (req, res) {
        try {
            let rating =await RatingService.getRatingByUserAndMovie(req.userId,req.query.screenplayId);
            
            res.send(rating);
        } catch (error) {
            res.send(error.message);
        }
    },
    getAverageRatingForMovieCtrl: async function(req,res){
        try {
            let result = await RatingService.getAverageRatingForMovie(req.query.screenplayId);

            res.send(result);
        } catch (error) {
            res.send(error.message)
        }
    },
    insertRatingCtrl: async function (req, res) {
        try {
            let rating = await RatingService.insert(Object.assign({ userId: req.userId },req.body));
            
            res.send(rating);
        } catch (error) {
            res.send(error.message);
        }
    },
    deleteRatingCtrl: async function (req, res) {
        try {
            res.send(await RatingService.delete(req.params.id));
        } catch (error) {
            res.send(error.message);
        }
    },
    getAverageRatings: async function(req,res){
        try {    
            let result = await RatingService.getAverageRatings(JSON.parse(req.query.list));
            
            res.send(result);
        } catch (error) {
            res.send(error.message)
        }
    }
}