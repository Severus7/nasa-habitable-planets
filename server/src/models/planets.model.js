const fs = require('fs');
const path = require('path')
const { parse } = require('csv-parse')
// const { getAllPlanets } = require('../routes/planets/planets.controller');

let habitablePlanets = [];

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
    &&  planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    &&  planet['koi_prad'] < 1.6; // returns true or false
}

function loadPlanetsData() {
    return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
        .pipe(parse({
            comment: '#',
            columns: true
        }))
        .on('data', (data) => {
            if(isHabitablePlanet(data)) {
                habitablePlanets.push(data);
            }
        })
        .on('error', (err) => {
            console.log(err);
            reject(err);
        })
        .on('end', () => {
            console.log(`${habitablePlanets.length} habitable planets found!`);
            resolve();
        });
    });
}

function getAllPlanets() {
    return habitablePlanets;
}

module.exports = {
    loadPlanetsData,
    getAllPlanets
};