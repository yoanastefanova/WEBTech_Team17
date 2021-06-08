var express = require('express');
var app = express();
var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://Team17:Team17@team17.z8081.mongodb.net/Team17?retryWrites=true&w=majority'

var connectDB = () => {
    return mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
};

app.get('/', function (req, res) {
    res.send('Hello Team17!');
});

connectDB()
.then(() => {
    console.log('Database connection successful');
    app.listen(3001, function () {
        console.log("Server is listening on port 3001");
    });
})
.catch(error => console.error('Database connection error'));



