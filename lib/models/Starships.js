import pool from '../utils/pool.js';

export default class Starship {
    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.model = row.model;
        this.starshipClass = row.starship_class;
        this.passengers = row.passengers;
    }
}
