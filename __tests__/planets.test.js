import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('Planet routes', () => {
    beforeEach(() => {
        return setup(pool);
    });
    beforeEach(() => {
        return request(app).post('/api/planets').send({
            name: 'Earth',
            climate: 'worsening',
            terrain: 'mostly water',
            population: 'billions',
        });
    });
    beforeEach(() => {
        return request(app).post('/api/planets').send({
            name: 'Jedha',
            climate: 'cold',
            terrain: 'deserts, mesas, magma seas',
            population: '11.3 million',
        });
    });

    beforeEach(() => {});

    it('should get, store and return a random planet', () => {
        return request(app)
            .get('/api/planets/random')
            .then((res) => {
                expect(res.body).toEqual({
                    id: 3,
                    name: expect.any(String),
                    climate: expect.any(String),
                    terrain: expect.any(String),
                    population: expect.any(String),
                });
            });
    });

    it('should let you add your own planet', () => {
        return request(app)
            .post('/api/planets')
            .send({
                name: 'Earth',
                climate: 'worsening',
                terrain: 'mostly water',
                population: 'billions',
            })
            .then((res) => {
                expect(res.body).toEqual({
                    id: 3,
                    name: 'Earth',
                    climate: 'worsening',
                    terrain: 'mostly water',
                    population: 'billions',
                });
            });
    });

    it('should get a planet by id', () => {
        return request(app)
            .get('/api/planets/2')
            .then((res) => {
                expect(res.body).toEqual({
                    id: 2,
                    name: 'Jedha',
                    climate: 'cold',
                    terrain: 'deserts, mesas, magma seas',
                    population: '11.3 million',
                });
            });
    });

    afterAll(() => {
        pool.end();
    });
});
