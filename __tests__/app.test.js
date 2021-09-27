import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('film routes', () => {
    beforeEach(() => {
        return setup(pool);
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

    afterAll(() => {
        pool.end();
    });
});
