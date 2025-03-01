const express = require("express"); 
const { getAllPlanets } = require("./planets.controller");
const { loadPlanetsData } = require('../../models/planets.model');

const planetsRouter = express.Router();

planetsRouter.get('/planets', getAllPlanets);

// planetsRouter.get('/planets', async (req, res) => {
//     try {
//         const planets = await loadPlanetsData();
//         console.log("API Response Planets:", planets); // ✅ Debug log
//         if (Array.isArray(planets)) {
//             res.json(planets); // ✅ Send the array
//         } else {
//             console.error("Error: Planets data is not an array!");
//             res.status(500).json({ error: "Planets data is not an array" });
//         }
//     } catch (err) {
//         console.error("Error fetching planets:", err);
//         res.status(500).json({ error: "Failed to load planets" });
//     }
// });

module.exports = planetsRouter;
