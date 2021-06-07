var express = require('express');
var app = express();
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const url = "mongodb://127.0.0.1:27017";

app.get('/', function (req, res) {
    res.send('Hello Team17!');
});

MongoClient.connect(url, function(err, client) {
    if(err) {
        client.close();
        return;
    }

    console.log('DB is listening on ' + url);

    app.listen(3001, function () {
        console.log("Server is listening on port 3001");
    });
});

