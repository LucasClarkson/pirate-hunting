const express = require('express');
const app = express();
app.use( require('body-parser').json() );

const MongoClient = require('mongodb').MongoClient;

// Initialize connection once
MongoClient.connect("mongodb://mongodb:27017/pirate-hunting", function(err, database) {
    if(err) return console.error(err);
    
    const hunter = require('./api/hunter')(app, database);
    const stand = require('./api/stand')(app, database);
    const hunt = require('./api/hunt')(app, database);

    app.use(express.static('app-src'))

    app.listen(80, function () {
        console.log('Pirate hunting on port 80')
    })
});