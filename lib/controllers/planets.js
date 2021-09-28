import { Router } from 'express';
import PlanetService from '../services/PlanetService';

export default Router()
    .get('/random', async (req, res, next) => {
        try {
            const newPlanet = await PlanetService.saveRandomPlanet();
            res.json(newPlanet);
        } catch (error) {
            next(error);
        }
    })
    .post('/', async (req, res, next) => {
        try {
            const newPlanet = await PlanetService.addNewPlanet(req.body);
            res.send(newPlanet);
        } catch (error) {
            next(error);
        }
    })
    .get('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            const planet = await PlanetService.getPlanet(id);
            res.send(planet);
        } catch (error) {
            next(error);
        }
    })
    .get('/', async (req, res, next) => {
        try {
            const planets = await PlanetService.getAllPlanets();
            res.send(planets);
        } catch (error) {
            next(error);
        }
    })
    .put('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            const { name, climate, terrain, population } = req.body;
            const updatedPlanet = await PlanetService.updatePlanet({
                id,
                name,
                climate,
                terrain,
                population,
            });
            res.send(updatedPlanet);
        } catch (error) {
            next(error);
        }
    });
