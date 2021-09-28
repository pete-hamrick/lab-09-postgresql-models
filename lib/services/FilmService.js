import Film from '../models/Films.js';

import { fetchFilm } from '../utils/swapi.js';

export default class FilmService {
    static async saveRandomFilm() {
        const film = await fetchFilm();
        const savedFilm = await Film.insert(film);
        return savedFilm;
    }

    static async saveNewFilm({ title, releaseDate, episodeId, director }) {
        const newFilm = await Film.insert({
            title,
            releaseDate,
            episodeId,
            director,
        });

        return newFilm;
    }

    static async getFilm(id) {
        const film = await Film.get(id);

        return film;
    }
}
