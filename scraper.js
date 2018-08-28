const emitter = require('./getWeather.js').emitter,
    get = require('./getWeather.js').get,
    fs = require("fs"),    
    mongoose = require('mongoose'),
    cors = require('cors'),
    Schema = mongoose.Schema;;

    const weatherObject = new Schema({
        time: String,
        weather: Object
    }, {
        collection: 'Weather'
    });

    const Model = mongoose.model('Model', weatherObject);
    mongoose.connect('mongodb://localhost:27017/lorweather')

function startScraper() {
    get();
    emitter.on("done", (parsed) => {
        let savedData = new Model({
            'time': new Date().toISOString(),
            'weather': parsed
        }).save(function(err, result){
            if( err ){
                throw err;
            }
            if ( result ) {
                console.log('Great success, stuff in the database');
            }
        })
        fs.appendFileSync('./json/weatherScraped.txt', "\n" + new Date().toUTCString() + "\n" + JSON.stringify(parsed) + "\n");
    });
}

startScraper();


setInterval(() => {
    startScraper();
}, 1000*60*15);