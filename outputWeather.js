const mongoose = require('mongoose'),
Schema = mongoose.Schema,
events = require('events');
const fetchEmitter = new events.EventEmitter();


const weatherObject = new Schema({
    time: String,
    weather: Object
}, {
    collection: 'Weather'
});

const WeatherCollection = mongoose.model('Model', weatherObject);
mongoose.connect('mongodb://localhost:27017/lorweather', {useNewUrlParser: true})


function sendTimeAndTemp ( ) {
    
    fetchEmitter.addListener('done', ()=>{
        console.log('fetched your stuff from the database');
    });
    
    WeatherCollection.find({}, function(error, body) {
        let outPutArray = [];
        body.forEach(element => {
            if(element.time && element.weather) {
                // console.log(element.time);
                // console.log(element.weather.main.temp);
                let obj = {}
                obj.time = element.time;
                obj.temp = element.weather.main.temp;
                outPutArray.push(obj);
            } 
        });
        
        fetchEmitter.emit('done', outPutArray);
        // console.log(body[i].weather.main.temp);
    });

    fetchEmitter.removeAllListeners();
}

module.exports.fetchEmitter = fetchEmitter;
module.exports.sendTimeAndTemp = sendTimeAndTemp;