import pool from '../utils/pool.js';

export default class Vehicle {
    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.model = row.model;
        this.manufacturer = row.manufacturer;
        this.passengers = row.passengers;
    }

    static async insert({ name, model, manufacturer, passengers }) {
        const { rows } = await pool.query(
            'INSERT INTO vehicles (name, model, manufacturer, passengers) VALUES ($1, $2, $3, $4) RETURNING *;',
            [name, model, manufacturer, passengers]
        );
        return new Vehicle(rows[0]);
    }

    static async get(id) {
        const { rows } = await pool.query(
            'SELECT * FROM vehicles WHERE id=$1;',
            [id]
        );
        return new Vehicle(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM vehicles');

        return rows.map((row) => {
            return new Vehicle(row);
        });
    }

    static async update({ id, name, model, manufacturer, passengers }) {
        const { rows } = await pool.query(
            'UPDATE vehicles SET name = $1, model = $2, manufacturer = $3, passengers = $4 WHERE id = $5 RETURNING *;',
            [name, model, manufacturer, passengers, id]
        );
        return new Vehicle(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM vehicles WHERE id = $1 RETURNING *;',
            [id]
        );
        return new Vehicle(rows[0]);
    }
}
