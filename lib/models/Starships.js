import pool from '../utils/pool.js';

export default class Starship {
    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.model = row.model;
        this.starshipClass = row.starship_class;
        this.passengers = row.passengers;
    }

    static async insert({ name, model, starshipClass, passengers }) {
        const { rows } = await pool.query(
            'INSERT INTO starships (name, model, starship_class, passengers) VALUES ($1, $2, $3, $4) RETURNING *;',
            [name, model, starshipClass, passengers]
        );
        return new Starship(rows[0]);
    }

    static async get(id) {
        const { rows } = await pool.query(
            'SELECT * FROM starships WHERE id=$1;',
            [id]
        );
        return new Starship(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM starships');

        return rows.map((row) => {
            return new Starship(row);
        });
    }

    static async update({ id, name, model, starshipClass, passengers }) {
        const { rows } = await pool.query(
            'UPDATE starships SET name = $1, model = $2, starship_class = $3, passengers = $4 WHERE id = $5 RETURNING *;',
            [name, model, starshipClass, passengers, id]
        );
        return new Starship(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM starships WHERE id = $1 RETURNING *;',
            [id]
        );
        return new Starship(rows[0]);
    }
}
