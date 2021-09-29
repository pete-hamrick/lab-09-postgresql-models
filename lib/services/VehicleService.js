import Vehicle from '../models/Vehicles.js';
import { fetchVehicle } from '../utils/swapi.js';

export default class VehicleService {
    static async saveRandomVehicle() {
        const vehicle = await fetchVehicle();
        const savedVehicle = await Vehicle.insert(vehicle);
        return savedVehicle;
    }

    static async addNewVehicle({ name, model, manufacturer, passengers }) {
        const newVehicle = await Vehicle.insert({
            name,
            model,
            manufacturer,
            passengers,
        });
        return newVehicle;
    }

    static async getVehicle(id) {
        const vehicle = await Vehicle.get(id);
        return vehicle;
    }

    static async getAllVehicles() {
        const vehicles = await Vehicle.getAll();
        return vehicles;
    }

    static async updateVehicle({ id, name, model, manufacturer, passengers }) {
        const updatedVehicle = await Vehicle.update({
            id,
            name,
            model,
            manufacturer,
            passengers,
        });
        return updatedVehicle;
    }

    static async deleteVehicle(id) {
        const deletedVehicle = await Vehicle.delete(id);
        return deletedVehicle;
    }
}
