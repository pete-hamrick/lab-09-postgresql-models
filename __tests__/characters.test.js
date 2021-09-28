import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('Character routes', () => {
    beforeEach(() => {
        return setup(pool);
    });

    it('should get, store and return a random star wars character', () => {
        return request(app)
            .get('/api/characters/random')
            .then((res) => {
                expect(res.body).toEqual({
                    id: 1,
                    name: expect.any(String),
                    height: expect.any(String),
                });
            });
    });

    it('should let you add your own star wars character', () => {
        return request(app)
            .post('/api/characters')
            .send({
                name: 'Babu Frik',
                height: '22',
            })
            .then((res) => {
                expect(res.body).toEqual({
                    id: 1,
                    name: 'Babu Frik',
                    height: '22',
                });
            });
    });

    afterAll(() => {
        pool.end();
    });
});
