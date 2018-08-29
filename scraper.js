const emitter = require('./getWeather.js').emitter,
    get = require('./getWeather.js').get,
    fs = require('fs'),    
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    const weatherObject = new Schema({
        time: String,
        weather: Object
    }, {
        collection: 'Weather'
    });

    const WeatherCollection = mongoose.model('Model', weatherObject);
    mongoose.connect('mongodb://localhost:27017/lorweather')
    let savedData = new WeatherCollection({
        'time': new Date().toISOString(),
        'weather': Object
    })

function startScraper() {
    get();
    emitter.on('done', (parsed) => {
        savedData['weather'] = parsed;
        savedData.save(function(err, result){
            if( err ){
                throw err;
            }
            if ( result ) {
                console.log('Great success');
            }
        })
        fs.appendFileSync('./json/weatherScraped.txt', '\n' + new Date().toUTCString() + '\n' + JSON.stringify(parsed) + '\n');
    });
}

startScraper();


setInterval(() => {
    startScraper();
}, 1000*60*10);


module.exports.WeatherCollection = WeatherCollection;