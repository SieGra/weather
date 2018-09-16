'use strict';

const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

const fetchEmitter = require('./outputWeather').fetchEmitter,
sendTimeAndTemp = require('./outputWeather').sendTimeAndTemp;

app.use(express.static('public'));
bodyParser.urlencoded({extended: true})


app.use((req, res, next) => {
    console.log('connection incomming: ' + req.connection.remoteAddress);
    next();
});

app.get('/', (req, res) => {
    res.sendfile('index.html');
});

app.post('/', (req, res) => {
    sendTimeAndTemp();
    fetchEmitter.on('done', (output)=>{
        console.log(output.length);
        res.send(output);
    });
});

app.listen(3000, () => {
    console.log('Server Started!');
});