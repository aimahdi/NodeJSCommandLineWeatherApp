const request = require('request')

const geocode = (address, callback) => {
    const mapboxURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
        + encodeURIComponent(address)
        + '.json?access_token=pk.eyJ1IjoiYW1pbXVsIiwiYSI6ImNsM2hpZnR4ODBmdGgzam8yeHAyenV4MjEifQ.M97sqieD34tzPjoPhVy5bA&limit=1'

    request({ url: mapboxURL, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location service.')
        } else if (response.body.features.length == 0) {
            callback('Unable to find location. Try another search')
        }        else {
            const features = response.body.features[0]
            const latitude = features.center[1]
            const longitude = features.center[0]
            const location = features.place_name

            callback(undefined, {
                latitude: latitude,
                longitude: longitude,
                location: location
            })
        }
    })
}

module.exports = geocode