import Planet from '../models/Planets.js';
import { fetchPlanet } from '../utils/swapi.js';

export default class PlanetService {
    static async saveRandomPlanet() {
        const planet = await fetchPlanet();
        const savedPlanet = await Planet.insert(planet);
        return savedPlanet;
    }

    static async addNewPlanet({ name, climate, terrain, population }) {
        const newPlanet = await Planet.insert({
            name,
            climate,
            terrain,
            population,
        });
        return newPlanet;
    }

    static async getPlanet(id) {
        const planet = await Planet.get(id);
        return planet;
    }

    static async getAllPlanets() {
        const planets = await Planet.getAll();
        return planets;
    }

    static async updatePlanet({ id, name, climate, terrain, population }) {
        const updatedPlanet = await Planet.update({
            id,
            name,
            climate,
            terrain,
            population,
        });
        return updatedPlanet;
    }

    static async deletePlanet(id) {
        const deletedPlanet = await Planet.delete(id);
        return deletedPlanet;
    }
}
