import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('film routes', () => {
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
                    id: 2,
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

    afterAll(() => {
        pool.end();
    });
});
