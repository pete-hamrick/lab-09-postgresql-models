import Starship from '../models/Starships.js';
import { fetchStarship } from '../utils/swapi.js';

export default class StarshipService {
    static async saveRandomStarship() {
        const starship = await fetchStarship();
        const savedStarship = await Starship.insert(starship);
        return savedStarship;
    }

    static async addNewStarship({ name, model, starshipClass, passengers }) {
        const newStarship = await Starship.insert({
            name,
            model,
            starshipClass,
            passengers,
        });
        return newStarship;
    }

    static async getStarship(id) {
        const starship = await Starship.get(id);
        return starship;
    }

    static async getAllStarships() {
        const starships = await Starship.getAll();
        return starships;
    }

    static async updateStarship({
        id,
        name,
        model,
        starshipClass,
        passengers,
    }) {
        const updatedStarship = await Starship.update({
            id,
            name,
            model,
            starshipClass,
            passengers,
        });
        return updatedStarship;
    }

    static async deleteStarship(id) {
        const deletedStarship = await Starship.delete(id);
        return deletedStarship;
    }
}
