import fetch from 'node-fetch';

const rootAPIUrl = 'https://swapi.dev/api';

export async function fetchFilm() {
    const randomFilm = Math.ceil(Math.random() * 6);
    // const filmUrl = `${rootAPIUrl}/films/${randomFilm}`;

    const apiRes = await fetch(`${rootAPIUrl}/films/${randomFilm}`);
    // const apiRes = await fetch(`${rootAPIUrl}/films/1`);
    // const apiData = await apiRes.json();
    const { title, release_date, episode_id, director } = await apiRes.json();
    const data = {
        title,
        releaseDate: release_date,
        episodeId: episode_id,
        director,
    };
    // return apiData;
    return data;
}
