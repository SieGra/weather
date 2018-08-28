'use strict';

const express = require('express'),
    app = express();

app.use(express.static('public'));


app.use((req, res, next) => {
    console.log('connection incomming: ' + req.connection.remoteAddress);
    next();
});

app.get('/', (req, res) => {
    res.sendfile('index.html');
});

app.listen(3000, () => {
    console.log('Server Started!');
});