import pool from '../utils/pool.js';

export default class Planet {
    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.climate = row.climate;
        this.terrain = row.terrain;
        this.population = row.population;
    }
}
