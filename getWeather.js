'use strict';
const http = require('https'),
    key = require('./key.json'),
    events = require('events');


const myEmitter = new events.EventEmitter();

const adress = `https://api.openweathermap.org/data/2.5/weather?q=alesund&units=metric&APPID=${key.weather}`;
function get (){
    myEmitter.addListener('done', () => {
        let time = new Date().toTimeString();
        console.log('Weather scraped at ' + time + ' UTC');
    });

    http.get(adress, (req, res) => {
        let body = '';
        
        req.on('data', (data) => {
            body += data;
        });
        
        req.on('end', () => {
            let parsed = JSON.parse(body);
            myEmitter.emit('done', parsed);
            myEmitter.removeAllListeners();
        });
    });

} 
    
    
    module.exports.emitter = myEmitter;
    module.exports.get = get;