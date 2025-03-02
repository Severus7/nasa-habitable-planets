const { getAllPlanets } = require('../../models/planets.model')

function httpGetAllPlanets(req, res) {
    // console.log(res.status(200).json(loadPlanetsData))
    return res.status(200).json(getAllPlanets());
}

module.exports = {
    httpGetAllPlanets
};