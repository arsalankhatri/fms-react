import { createAction } from '@reduxjs/toolkit';
import { VehicleData } from '../interfaces/vehicleData';

export const addVehicle = createAction<VehicleData>('vehicles/addVehicle');
export const fetchAllVehicles = createAction<VehicleData[]>('vehicles/fetchAllVehicles');
