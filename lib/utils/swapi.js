import fetch from 'node-fetch';

const rootAPIUrl = 'https://swapi.dev/api';

export async function fetchFilm() {
    const randomFilm = Math.ceil(Math.random() * 6);

    const apiRes = await fetch(`${rootAPIUrl}/films/${randomFilm}`);
    const { title, release_date, episode_id, director } = await apiRes.json();
    const data = {
        title,
        releaseDate: release_date,
        episodeId: episode_id,
        director,
    };
    return data;
}

export async function fetchCharacter() {
    const randomCharacter = Math.ceil(Math.random() * 82);

    const apiRes = await fetch(`${rootAPIUrl}/people/${randomCharacter}`);
    const { name, height } = await apiRes.json();
    const data = { name, height };

    return data;
}
