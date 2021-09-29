import { Router } from 'express';
import VehicleService from '../services/VehicleService.js';

export default Router()
    .get('/random', async (req, res, next) => {
        try {
            const newVehicle = await VehicleService.saveRandomVehicle();
            res.json(newVehicle);
        } catch (error) {
            next(error);
        }
    })
    .post('/', async (req, res, next) => {
        try {
            const newVehicle = await VehicleService.addNewVehicle(req.body);
            res.send(newVehicle);
        } catch (error) {
            next(error);
        }
    })
    .get('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            const vehicle = await VehicleService.getVehicle(id);
            res.send(vehicle);
        } catch (error) {
            next(error);
        }
    })
    .get('/', async (req, res, next) => {
        try {
            const vehicle = await VehicleService.getAllVehicles();
            res.send(vehicle);
        } catch (error) {
            next(error);
        }
    })
    .put('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            const { name, model, manufacturer, passengers } = req.body;
            const updatedVehicle = await VehicleService.updateVehicle({
                id,
                name,
                model,
                manufacturer,
                passengers,
            });
            res.send(updatedVehicle);
        } catch (error) {
            next(error);
        }
    })
    .delete('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            const deletedVehicle = await VehicleService.deleteVehicle(id);
            res.send(deletedVehicle);
        } catch (error) {
            next(error);
        }
    });
