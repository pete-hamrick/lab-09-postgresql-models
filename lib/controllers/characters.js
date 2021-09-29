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
    })
    .get('/', async (req, res, next) => {
        try {
            const characters = await CharacterService.getAllCharacters();
            res.send(characters);
        } catch (error) {
            next(error);
        }
    })
    .put('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            const { name, height } = req.body;
            const updatedCharacter = await CharacterService.updateCharacter({
                id,
                name,
                height,
            });
            res.send(updatedCharacter);
        } catch (error) {
            next(error);
        }
    })
    .delete('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            const deletedCharacter = await CharacterService.deleteCharacter(id);
            res.send(deletedCharacter);
        } catch (error) {
            next(error);
        }
    });
