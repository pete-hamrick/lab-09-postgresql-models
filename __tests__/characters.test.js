import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe.skip('Character routes', () => {
    beforeEach(() => {
        return setup(pool);
    });

    beforeEach(() => {
        return request(app).post('/api/characters').send({
            name: 'Babu Frik',
            height: '22',
        });
    });
    beforeEach(() => {
        return request(app).post('/api/characters').send({
            name: 'Jyn Erso',
            height: '160',
        });
    });

    it('should get, store and return a random star wars character', () => {
        return request(app)
            .get('/api/characters/random')
            .then((res) => {
                expect(res.body).toEqual({
                    id: 3,
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
                    id: 3,
                    name: 'Babu Frik',
                    height: '22',
                });
            });
    });

    it('should get character by id', () => {
        return request(app)
            .get('/api/characters/1')
            .then((res) => {
                expect(res.body).toEqual({
                    id: 1,
                    name: 'Babu Frik',
                    height: '22',
                });
            });
    });

    it('should get all characters', () => {
        return request(app)
            .get('/api/characters')
            .then((res) => {
                expect(res.body).toEqual([
                    {
                        id: 1,
                        name: 'Babu Frik',
                        height: '22',
                    },
                    {
                        id: 2,
                        name: 'Jyn Erso',
                        height: '160',
                    },
                ]);
            });
    });

    it('should let you update a character', () => {
        return request(app)
            .put('/api/characters/1')
            .send({
                name: 'Babu Frik',
                height: '25',
            })
            .then((res) => {
                expect(res.body).toEqual({
                    id: 1,
                    name: 'Babu Frik',
                    height: '25',
                });
            });
    });

    it('should delete a character', () => {
        return request(app)
            .delete('/api/characters/2')
            .then((res) => {
                expect(res.body).toEqual({
                    id: 2,
                    name: 'Jyn Erso',
                    height: '160',
                });
            });
    });

    afterAll(() => {
        pool.end();
    });
});
