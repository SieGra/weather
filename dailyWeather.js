const emitter = require('./getWeather.js').emitter,
    get = require('./getWeather.js').get,    
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    const dailyWeatherObject = new Schema({
        isoTime: String,
        jsTime: Object,
        year: String,
        month: String,
        date: String,
        day: String,
        hour: String,
        minutes: String,
        weather: Object
    }, {
        collection: 'dailyweather'
    });

    const WeatherCollection = mongoose.model('Model', dailyWeatherObject);
    mongoose.connect('mongodb://localhost:27017/weatherfetcher', {useNewUrlParser: true})

    let savedData = new WeatherCollection({
        'isoTime': new Date().toISOString(),
        'jsTime': new Date(),
        'year' : new Date().getFullYear(),
        'month': new Date().getMonth(),
        'date' : new Date().getDate(),
        'day': new Date().getDay(),
        'hour': new Date().getHours(),
        'minutes': new Date().getMinutes(),
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
                console.log('#DailyWeather ::: Great success!');
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

