const mongoose = require('mongoose'),
WeatherCollection = require('./scraper.js').WeatherCollection,
events = require('events');


WeatherCollection.find({}, function(error, body) {
    body.forEach(element => {

            for (const key in element) {
                if(element.time && element.weather) {
                    console.log(element.time);
                    console.log(element.weather.main.temp);
                } else {
                    
                }
            }
        
    });
    
    // console.log(body[i].weather.main.temp);
});
