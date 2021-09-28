import Planet from '../models/Planets.js';
import { fetchPlanet } from '../utils/swapi.js';

export default class PlanetService {
    static async saveRandomPlanet() {
        const planet = await fetchPlanet();
        const savedPlanet = await Planet.insert(planet);
        return savedPlanet;
    }
}
