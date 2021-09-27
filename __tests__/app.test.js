import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('film routes', () => {
    beforeEach(() => {
        return setup(pool);
    });

    it('should get the first star wars film and show the title, release date, episode id, and director', () => {
        return request(app)
            .get('/api/films/1')
            .then((res) => {
                expect(res.body).toEqual({
                    title: expect.any(String),
                    releaseDate: expect.any(String),
                    episodeId: expect.any(String),
                    director: expect.any(String),
                });
            });
    });

    afterAll(() => {
        pool.end();
    });
});
