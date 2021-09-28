import pool from '../utils/pool.js';

export default class Planet {
    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.climate = row.climate;
        this.terrain = row.terrain;
        this.population = row.population;
    }

    static async insert({ name, climate, terrain, population }) {
        const { rows } = await pool.query(
            'INSERT INTO planets (name, climate, terrain, population) VALUES ($1, $2, $3, $4) RETURNING *;',
            [name, climate, terrain, population]
        );
        return new Planet(rows[0]);
    }

    static async get(id) {
        const { rows } = await pool.query(
            'SELECT * FROM planets WHERE id=$1;',
            [id]
        );
        return new Planet(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM planets');

        return rows.map((row) => {
            return new Planet(row);
        });
    }

    static async update({ id, name, climate, terrain, population }) {
        const { rows } = await pool.query(
            'UPDATE planets SET name = $1, climate = $2, terrain = $3, population = $4 WHERE id = $5 RETURNING *;',
            [name, climate, terrain, population, id]
        );
        return new Planet(rows[0]);
    }
}
