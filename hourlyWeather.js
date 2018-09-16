const emitter = require('./getWeather.js').emitter,
    get = require('./getWeather.js').get,    
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    const hourlyWeatherObject = new Schema({
        isoTime: String,
        jsTime: Object,
        weather: Object
    }, {
        collection: 'hourlyweather'
    });

    const WeatherCollection = mongoose.model('Model', hourlyWeatherObject);
    mongoose.connect('mongodb://localhost:27017/weatherfetcher', {useNewUrlParser: true})
    let savedData = new WeatherCollection({
        'isoTime': new Date().toISOString(),
        'jsTime': new Date(),
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
                console.log('#HourlyWeather ::: Great success!');
            }
        })
    });
}


let lastHour;
setInterval(() => {
    let thisHour = new Date().getHours();
    if(thisHour !== lastHour) {
        lastHour = new Date().getHours();
        startScraper();
    }
}, 1000*10);

