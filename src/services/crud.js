module.exports = function (Model) {
    return {
        getAll: async function () {
            let resultList = await Model.find();

            return resultList.map(doc => doc.toObject());
        },

        getById: async function (id) {
            let result = await Model.findById(id);

            return result.toObject();
        },

        insert: async function (ModelMap) {
            ModelMap.createdAt = new Date();
            let result = await Model.findOneAndUpdate({userId:ModelMap.userId, screenplayId: ModelMap.screenplayId},ModelMap,{upsert: true, new: true});
            
            return result.toObject();
        },

        delete: async function (id) {
            let result = await Model.findByIdAndDelete(id);
            return result.toObject();
        },

        getRatingsByUser: async function($userId) {
            try {
                let result = await Model.find({userId: $userId});
                let ratingMap = {}
                for(var i in result)
                    ratingMap[result[i].screenplayId]=result[i].toObject();

                return ratingMap;
            } catch (error) {
                return error.message
            }
        },

        getRatingsByMovie: async function($screenplayId) {
            try {
                let result = await Model.find({screenplayId: $screenplayId});
                let ratingMap= {};
                
                for(var i in result)
                    ratingMap[result[i].userId]=result[i].toObject();
                
                return ratingMap
            } catch (error) {
                return error.message
            }
        },

        getRatingByUserAndMovie: async function($userId,$screenplayId) {
                let result = await Model.findOne({userId: $userId, screenplayId: $screenplayId})

                return result ? result.toObject() : { rating : 0 };
        },

        getAverageRatingForMovie: async function($screenplayId) {
            try {
                let result = await Model.find({screenplayId: $screenplayId})
                let ratingSum = result.reduce((prev, current) => prev + current.rating, 0);
                let ratingCount = result.length;
                let average = 0;
                
                if(ratingSum!=0)
                    average=ratingSum/ratingCount;
                
                let solution = {
                    average: average,
                    total: ratingCount
                };

                return solution;
            } catch (error) {
                return error.message
            }
        },

        getAverageRatings: async function($list) {
            try{
                let result = {};

                for(screenplayId in $list){
                    let ratingObj = await this.getAverageRatingForMovie($list[screenplayId]);
                    result[$list[screenplayId]] = ratingObj.average;
                }

                return result;
            }
            catch(error){
                return error.message;
            }
        }
    }
}