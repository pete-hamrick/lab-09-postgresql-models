import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe.skip('Starship routes', () => {
    beforeEach(() => {
        return setup(pool);
    });

    beforeEach(() => {
        return request(app).post('/api/starships').send({
            name: 'Death Star',
            model: 'DS-1 Orbital Battle Station',
            starshipClass: 'Deep Space Mobile Battlestation',
            passengers: '843342',
        });
    });
    beforeEach(() => {
        return request(app).post('/api/starships').send({
            name: 'Millennium Falcon',
            model: 'YT-1300 light freighter',
            starshipClass: 'Light freighter',
            passengers: '6',
        });
    });

    it('should get, store and return a random starship', () => {
        return request(app)
            .get('/api/starships/random')
            .then((res) => {
                expect(res.body).toEqual({
                    id: 3,
                    name: expect.any(String),
                    model: expect.any(String),
                    starshipClass: expect.any(String),
                    passengers: expect.any(String),
                });
            });
    });

    it('should let you add your own starship', () => {
        return request(app)
            .post('/api/starships')
            .send({
                name: 'Millennium Falcon',
                model: 'YT-1300 light freighter',
                starshipClass: 'Light freighter',
                passengers: '6',
            })
            .then((res) => {
                expect(res.body).toEqual({
                    id: 3,
                    name: 'Millennium Falcon',
                    model: 'YT-1300 light freighter',
                    starshipClass: 'Light freighter',
                    passengers: '6',
                });
            });
    });

    it('should get a starship by id', () => {
        return request(app)
            .get('/api/starships/2')
            .then((res) => {
                expect(res.body).toEqual({
                    id: 2,
                    name: 'Millennium Falcon',
                    model: 'YT-1300 light freighter',
                    starshipClass: 'Light freighter',
                    passengers: '6',
                });
            });
    });

    it('should get all starships', () => {
        return request(app)
            .get('/api/starships')
            .then((res) => {
                expect(res.body).toEqual([
                    {
                        id: 1,
                        name: 'Death Star',
                        model: 'DS-1 Orbital Battle Station',
                        starshipClass: 'Deep Space Mobile Battlestation',
                        passengers: '843342',
                    },
                    {
                        id: 2,
                        name: 'Millennium Falcon',
                        model: 'YT-1300 light freighter',
                        starshipClass: 'Light freighter',
                        passengers: '6',
                    },
                ]);
            });
    });

    it('should update a starship by id', () => {
        return request(app)
            .put('/api/starships/1')
            .send({
                name: 'Death Star 1',
                model: 'DS-2 Orbital Battle Station',
                starshipClass: 'Deep Space Mobile Battlestation',
                passengers: '900000',
            })
            .then((res) => {
                expect(res.body).toEqual({
                    id: 1,
                    name: 'Death Star 1',
                    model: 'DS-2 Orbital Battle Station',
                    starshipClass: 'Deep Space Mobile Battlestation',
                    passengers: '900000',
                });
            });
    });

    it('should delete a starship by id and return the deleted starship', () => {
        return request(app)
            .delete('/api/starships/1')
            .then((res) => {
                expect(res.body).toEqual({
                    id: 1,
                    name: 'Death Star',
                    model: 'DS-1 Orbital Battle Station',
                    starshipClass: 'Deep Space Mobile Battlestation',
                    passengers: '843342',
                });
            });
    });

    afterAll(() => {
        pool.end();
    });
});
