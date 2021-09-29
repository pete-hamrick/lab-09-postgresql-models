import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe.skip('Vehicle routes', () => {
    beforeEach(() => {
        return setup(pool);
    });

    beforeEach(() => {
        return request(app).post('/api/vehicles').send({
            name: 'Sand Crawler',
            model: 'Digger Crawler',
            manufacturer: 'Corellia Mining Corporation',
            passengers: '30',
        });
    });
    beforeEach(() => {
        return request(app).post('/api/vehicles').send({
            name: 'TIE fighter',
            model: 'Twin Ion Engine/Ln Starfighter',
            manufacturer: 'Sienar Fleet Systems',
            passengers: '1',
        });
    });

    it('should get, store and return a random starship', () => {
        return request(app)
            .get('/api/vehicles/random')
            .then((res) => {
                expect(res.body).toEqual({
                    id: 3,
                    name: expect.any(String),
                    model: expect.any(String),
                    manufacturer: expect.any(String),
                    passengers: expect.any(String),
                });
            });
    });

    it('should let you add your own starship', () => {
        return request(app)
            .post('/api/vehicles')
            .send({
                name: 'Snowspeeder',
                model: 't-47 airspeeder',
                manufacturer: 'Incom corporation',
                passengers: '2',
            })
            .then((res) => {
                expect(res.body).toEqual({
                    id: 3,
                    name: 'Snowspeeder',
                    model: 't-47 airspeeder',
                    manufacturer: 'Incom corporation',
                    passengers: '2',
                });
            });
    });

    it('should get a starship by id', () => {
        return request(app)
            .get('/api/vehicles/2')
            .then((res) => {
                expect(res.body).toEqual({
                    id: 2,
                    name: 'TIE fighter',
                    model: 'Twin Ion Engine/Ln Starfighter',
                    manufacturer: 'Sienar Fleet Systems',
                    passengers: '1',
                });
            });
    });

    it('should get all vehicles', () => {
        return request(app)
            .get('/api/vehicles')
            .then((res) => {
                expect(res.body).toEqual([
                    {
                        id: 1,
                        name: 'Snowspeeder',
                        model: 't-47 airspeeder',
                        manufacturer: 'Incom corporation',
                        passengers: '2',
                    },
                    {
                        id: 2,
                        name: 'TIE fighter',
                        model: 'Twin Ion Engine/Ln Starfighter',
                        manufacturer: 'Sienar Fleet Systems',
                        passengers: '1',
                    },
                ]);
            });
    });

    it('should update a starship by id', () => {
        return request(app)
            .put('/api/vehicles/1')
            .send({
                name: 'Snow-Speeder',
                model: 't-47 Airspeeder',
                manufacturer: 'Incom corporation',
                passengers: '0',
            })
            .then((res) => {
                expect(res.body).toEqual({
                    id: 1,
                    name: 'Snow-Speeder',
                    model: 't-47 Airspeeder',
                    manufacturer: 'Incom corporation',
                    passengers: '0',
                });
            });
    });

    it('should delete a starship by id and return the deleted starship', () => {
        return request(app)
            .delete('/api/vehicles/1')
            .then((res) => {
                expect(res.body).toEqual({
                    id: 1,
                    name: 'Snowspeeder',
                    model: 't-47 airspeeder',
                    manufacturer: 'Incom corporation',
                    passengers: '2',
                });
            });
    });

    afterAll(() => {
        pool.end();
    });
});