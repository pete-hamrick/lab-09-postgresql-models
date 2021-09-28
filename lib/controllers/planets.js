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
        const newPlanet = await PlanetService.addNewPlanet(req.body);
        res.send(newPlanet);
    });
