import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('Planet routes', () => {
    beforeEach(() => {
        return setup(pool);
    });

    it('should get, store and return a random planet', () => {
        return request(app)
            .get('/api/planets/random')
            .then((res) => {
                expect(res.body).toEqual({
                    id: 1,
                    name: expect.any(String),
                    climate: expect.any(String),
                    terrain: expect.any(String),
                    population: expect.any(String),
                });
            });
    });

    afterAll(() => {
        pool.end();
    });
});
