const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// Set up the express app
const app = express();

// Log requests to the console
app.use(logger('dev'));

// Register the port to the server
app.set('port', process.env.PORT || 8858);

// Parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Setup a default catch-route that sends back a welcome message in json format
app.get('*', (req, res, next) => {
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