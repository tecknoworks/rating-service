const mongoose = require('mongoose');
const schemaBuilder = require('../helpers/schema_builder').schemaBuilder;

module.exports = {
    Rating: mongoose.model(
        'rating', 
        schemaBuilder({
            userId: String,
            screenplayId: String,
            rating: Number,
            createdAt: Date
        })
    )
};