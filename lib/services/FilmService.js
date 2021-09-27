import Film from '../models/Films.js';

import { fetchFilm } from '../utils/swapi.js';

export default class FilmService {
    static async saveFilm() {
        const film = await fetchFilm();
        const savedFilm = await Film.insert(film);
        return savedFilm;
    }
}
