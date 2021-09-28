import { Router } from 'express';
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
    })
    .get('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            const film = await FilmService.getFilm(id);
            res.send(film);
        } catch (error) {
            next(error);
        }
    })
    .get('/', async (req, res, next) => {
        try {
            const films = await FilmService.getAllFilms();
            res.send(films);
        } catch (error) {
            next(error);
        }
    })
    .put('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            const { title, releaseDate, episodeId, director } = req.body;
            const updatedFilm = await FilmService.updateFilm({
                id,
                title,
                releaseDate,
                episodeId,
                director,
            });
            res.send(updatedFilm);
        } catch (error) {
            next(error);
        }
    })
    .delete('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            const deletedFilm = await FilmService.deleteFilm(id);
            res.send(deletedFilm);
        } catch (error) {
            next(error);
        }
    });
