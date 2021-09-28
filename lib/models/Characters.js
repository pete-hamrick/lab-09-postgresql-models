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
}
