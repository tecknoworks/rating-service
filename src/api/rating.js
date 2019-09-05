const RatingController = require('../controllers/index').RatingController;
const validateToken = require('../helpers/validate_token');
module.exports = function(router){
    router.get('/all', RatingController.getAllRatingsCtrl ),
    router.get('/user',validateToken,RatingController.getRatingsByUserCtrl),
    router.get('/movie',RatingController.getRatingsByMovieCtrl),
    router.get('/average',RatingController.getAverageRatingForMovieCtrl),
    router.get('/one', validateToken, RatingController.getRatingByUserAndMovieCtrl),
    router.get('/averages', RatingController.getAverageRatings ),
    router.get('/:id', RatingController.getRatingByIdCtrl ),
    router.post('/',validateToken, RatingController.insertRatingCtrl ),
    router.delete('/:id', RatingController.deleteRatingCtrl )
    

    return router
}