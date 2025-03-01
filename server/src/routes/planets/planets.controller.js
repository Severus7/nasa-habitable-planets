const { loadPlanetsData, planets } = require('../../models/planets.model')

function getAllPlanets(req, res) {
    // console.log(res.status(200).json(loadPlanetsData))
    return res.status(200).json(planets);
}

module.exports = {
    getAllPlanets
};