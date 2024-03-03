import { createAction } from '@reduxjs/toolkit';
import { VehicleSumAnalytics } from '../interfaces/vehicleAnalytics';

export const addAnalytics = createAction<VehicleSumAnalytics>('analytics/addUsage');
export const fetchAllAnalytics = createAction<VehicleSumAnalytics[]>('analytics/fetchAllUsage');
