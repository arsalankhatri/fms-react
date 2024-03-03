import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VehicleData } from '../interfaces/vehicleData';

export interface VehicleState {
  vehicles: VehicleData[];
}

const initialState: VehicleState = {
  vehicles: [],
};

const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    addVehicle: (state, action: PayloadAction<VehicleData>) => {
      state.vehicles.push(action.payload);
    },
    fetchAllVehicles: (state, action: PayloadAction<VehicleData[]>) => {
      state.vehicles = action.payload;
    }
  },
});

export const { addVehicle } = vehicleSlice.actions;
export default vehicleSlice.reducer;
