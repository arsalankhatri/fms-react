import { createAction } from '@reduxjs/toolkit';
import { VehicleLog } from '../interfaces/vehiceLog';

export const addLogs = createAction<VehicleLog>('maintenance/addLogs');
export const fetchAllLogs = createAction<VehicleLog[]>('maintenance/fetchAllLogs');
