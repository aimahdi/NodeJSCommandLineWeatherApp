const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const weatherStackURL = 'http://api.weatherstack.com/current?access_key=ac9f0b61b03a723e580c312797a7eb89&query='
        + latitude
        + ','
        + longitude
        + '&units=m'

    request({ url: weatherStackURL, json: true }, (error, response) => {

        if (error) {
            callback('Unable to connect to weather service')
        } else if (response.body.error) {
            callback('Unable to find location')

        } else {

            const current = response.body.current

            const temperature = current.temperature

            const feelsLike = current.feelslike

            const weatherDescription = current.weather_descriptions[0]

            const output = weatherDescription +
            ". It is currently " +
            temperature +
            " degrees out. It feels like " +
            feelsLike +
            " degrees out."
            
            callback(undefined, output)
        }

    })
}

module.exports = forecast