import pool from '../utils/pool';

export default class Character {
    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.height = row.height;
    }

    static async insert({ name, height }) {
        const { rows } = await pool.query(
            'INSERT INTO characters (name, height) VALUES ($1, $2) RETURNING *;',
            [name, height]
        );
        return new Character(rows[0]);
    }

    static async get(id) {
        const { rows } = await pool.query(
            'SELECT * FROM characters WHERE id=$1',
            [id]
        );
        return new Character(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM characters');

        return rows.map((row) => {
            return new Character(row);
        });
    }

    static async update({ id, name, height }) {
        const { rows } = await pool.query(
            'UPDATE characters SET name = $1, height = $2 WHERE id = $3 RETURNING *;',
            [name, height, id]
        );
        return new Character(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM characters WHERE id = $1 RETURNING *;',
            [id]
        );
        return new Character(rows[0]);
    }
}
