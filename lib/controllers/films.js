import { Router } from 'express';
// import { fetchFilm } from '../utils/swapi.js';
import FilmService from '../services/FilmService.js';

export default Router()
    .get('/random', async (req, res, next) => {
        try {
            const savedFilm = await FilmService.saveRandomFilm();
            res.json(savedFilm);
        } catch (error) {
            next(error);
        }
    })
    .post('/', async (req, res, next) => {
        try {
            const newFilm = await FilmService.saveNewFilm(req.body);
            res.send(newFilm);
        } catch (error) {
            next(error);
        }
    });
