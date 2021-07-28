const mongoose = require('mongoose');
const config = require('../config');

module.exports = {
    connection: mongoose.connect(config.databaseUrl, { useNewUrlParser: true })
};