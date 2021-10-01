import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

describe('film routes', () => {
    const server = setupServer(
        rest.get('/api/films/random', (req, res, ctx) => {
            return res(
                ctx.json({
                    title: 'The Last Jedi',
                    releaseDate: '2017-12-15',
                    episodeId: '8',
                    director: 'J. J. Abrams',
                })
            );
        })
    );

    beforeAll(() => {
        server.listen({
            onUnhandledRequest: 'bypass',
        });
    });

    beforeEach(() => {
        return setup(pool);
    });

    beforeEach(() => {
        return request(app).post('/api/films').send({
            title: 'Rogue One',
            releaseDate: '2016-12-16',
            episodeId: null,
            director: 'Gareth Edwards',
        });
    });
    beforeEach(() => {
        return request(app).post('/api/films').send({
            title: 'The Last Jedi',
            releaseDate: '2017-12-15',
            episodeId: '8',
            director: 'J. J. Abrams',
        });
    });

    it('should get a random star wars film', () => {
        return request(app)
            .get('/api/films/random')
            .then((res) => {
                expect(res.body).toEqual({
                    id: expect.any(Number),
                    title: expect.any(String),
                    releaseDate: expect.any(String),
                    episodeId: expect.any(String),
                    director: expect.any(String),
                });
            });
    });

    it('should let you add your own star wars film', () => {
        return request(app)
            .post('/api/films')
            .send({
                title: 'Rogue One',
                releaseDate: '2016-12-16',
                episodeId: null,
                director: 'Gareth Edwards',
            })
            .then((res) => {
                expect(res.body).toEqual({
                    id: 3,
                    title: 'Rogue One',
                    releaseDate: '2016-12-16',
                    episodeId: null,
                    director: 'Gareth Edwards',
                });
            });
    });

    it('should get a star wars film by id', () => {
        return request(app)
            .get('/api/films/1')
            .then((res) => {
                expect(res.body).toEqual({
                    id: 1,
                    title: 'Rogue One',
                    releaseDate: '2016-12-16',
                    episodeId: null,
                    director: 'Gareth Edwards',
                });
            });
    });

    it('should get all films', () => {
        return request(app)
            .get('/api/films')
            .then((res) => {
                expect(res.body).toEqual([
                    {
                        id: 1,
                        title: 'Rogue One',
                        releaseDate: '2016-12-16',
                        episodeId: null,
                        director: 'Gareth Edwards',
                    },
                    {
                        id: 2,
                        title: 'The Last Jedi',
                        releaseDate: '2017-12-15',
                        episodeId: '8',
                        director: 'J. J. Abrams',
                    },
                ]);
            });
    });

    it('should patch a star wars film by id', () => {
        return request(app)
            .put('/api/films/1')
            .send({
                id: 1,
                title: 'Rogue One: A Star Wars Story',
                releaseDate: 'December, 12th 2016',
                episodeId: null,
                director: 'Gareth Edwards',
            })
            .then((res) => {
                expect(res.body).toEqual({
                    id: 1,
                    title: 'Rogue One: A Star Wars Story',
                    releaseDate: 'December, 12th 2016',
                    episodeId: null,
                    director: 'Gareth Edwards',
                });
            });
    });

    it('should delete a film by id and return the deleted film', () => {
        return request(app)
            .delete('/api/films/1')
            .then((res) => {
                expect(res.body).toEqual({
                    id: 1,
                    title: 'Rogue One',
                    releaseDate: '2016-12-16',
                    episodeId: null,
                    director: 'Gareth Edwards',
                });
            });
    });

    afterAll(() => {
        pool.end();
        server.close();
    });
});
