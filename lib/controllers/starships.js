import { Router } from 'express';
import StarshipService from '../services/StarshipService.js';

export default Router()
    .get('/random', async (req, res, next) => {
        try {
            const newStarship = await StarshipService.saveRandomStarship();
            res.json(newStarship);
        } catch (error) {
            next(error);
        }
    })
    .post('/', async (req, res, next) => {
        try {
            const newStarship = await StarshipService.addNewStarship(req.body);
            res.send(newStarship);
        } catch (error) {
            next(error);
        }
    })
    .get('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            const starship = await StarshipService.getStarship(id);
            res.send(starship);
        } catch (error) {
            next(error);
        }
    })
    .get('/', async (req, res, next) => {
        try {
            const starships = await StarshipService.getAllStarships();
            res.send(starships);
        } catch (error) {
            next(error);
        }
    })
    .put('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            const { name, model, starshipClass, passengers } = req.body;
            const updatedStarship = await StarshipService.updateStarship({
                id,
                name,
                model,
                starshipClass,
                passengers,
            });
            res.send(updatedStarship);
        } catch (error) {
            next(error);
        }
    })
    .delete('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            const deletedStarship = await StarshipService.deleteStarship(id);
            res.send(deletedStarship);
        } catch (error) {
            next(error);
        }
    });
