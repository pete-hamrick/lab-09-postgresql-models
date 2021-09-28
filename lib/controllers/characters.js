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
    .post('/', async (req, res, next) => {
        try {
            const newCharacter = await CharacterService.addNewCharacter(
                req.body
            );
            res.send(newCharacter);
        } catch (error) {
            next(error);
        }
    })
    .get('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            const character = await CharacterService.getCharacter(id);
            res.send(character);
        } catch (error) {
            next(error);
        }
    });
