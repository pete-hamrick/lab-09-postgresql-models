import Character from '../models/Characters.js';
import { fetchCharacter } from '../utils/swapi.js';

export default class CharacterService {
    static async saveRandomCharacter() {
        const character = await fetchCharacter();
        const savedCharacter = await Character.insert(character);
        return savedCharacter;
    }
}
