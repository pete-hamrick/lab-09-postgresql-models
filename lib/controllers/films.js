import { Router } from 'express';
// import { fetchFilm } from '../utils/swapi.js';
import FilmService from '../services/FilmService.js';

export default Router()
    .get('/random', async (req, res, next) => {
        try {
            const savedFilm = await FilmService.saveFilm();
            res.json(savedFilm);
        } catch (error) {
            next(error);
        }
    })
    .get('/', (req, res, next) => {
        try {
            // console.log(req, res);
        } catch (error) {
            next(error);
        }
    });
