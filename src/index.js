const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const app = express();
const port = 3008;

app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));

const router = require('./api');

const connection = require('./loaders/mongoose');

app.use('/ratings', router);

app.listen(port, () => console.log(`rating-service listening on port ${port}!`));