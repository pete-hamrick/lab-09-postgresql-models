import { Router } from 'express';
import CharacterService from '../services/CharacterService';

export default Router()
    .get('/random', async (req, res, next) => {
        try {
            const newCharacter = await CharacterService.saveRandomCharacter();
            res.json(newCharacter);
        } catch (error) {
            next(error);
        }
    })
    .post('/', async (req, res, next) => {});
