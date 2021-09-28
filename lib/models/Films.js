import pool from '../utils/pool';

export default class Film {
    constructor(row) {
        this.id = row.id;
        this.title = row.title;
        this.releaseDate = row.release_date;
        this.episodeId = row.episode_id;
        this.director = row.director;
    }

    static async insert({ title, releaseDate, episodeId, director }) {
        const { rows } = await pool.query(
            'INSERT INTO films (title, release_date, episode_id, director) VALUES ($1, $2, $3, $4) RETURNING *;',
            [title, releaseDate, episodeId, director]
        );
        return new Film(rows[0]);
    }

    static async get(id) {
        const { rows } = await pool.query(
            'SELECT * FROM films WHERE films.id = $1;',
            [id]
        );
        return new Film(rows[0]);
    }
}
