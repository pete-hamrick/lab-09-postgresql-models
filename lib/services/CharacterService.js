import Character from '../models/Characters.js';
import { fetchCharacter } from '../utils/swapi.js';

export default class CharacterService {
    static async saveRandomCharacter() {
        const character = await fetchCharacter();
        const savedCharacter = await Character.insert(character);
        return savedCharacter;
    }

    static async addNewCharacter({ name, height }) {
        const newCharacter = await Character.insert({ name, height });

        return newCharacter;
    }

    static async getCharacter(id) {
        const character = await Character.get(id);
        return character;
    }

    static async getAllCharacters() {
        const characters = await Character.getAll();
        return characters;
    }
}
