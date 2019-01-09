const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const chalk = require('chalk');

const Config  = require('./config/config');
const authApi = require('./api/user');

// Set up the express app
const app = express();

// Log requests to the console
app.use(logger('dev'));

// Register the port to the server
app.set('port', process.env.PORT || 8858);

// Set the promise
mongoose.Promise = Promise;
// Setup mongoose database
mongoose.connect(Config.mongo.url, {useNewUrlParser: true});
// Console successfull
mongoose.connection.on('open', (err) => {
    if (err) console.log(chalk.red("Database not connected"))
    console.log(chalk.green("Database connected"))
});

// Parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/v1/auth', authApi);

// Setup a default catch-route that sends back a welcome message in json format
app.get('/', (req, res, next) => {
    res.status(200).send({
        message: "Welcome to the beggining of nothingness"
    })
});

app.listen(
    app.get('port'), () => {
        console.warn(`app listening on port ${app.get('port')}`)
    }
)

module.exports = app;