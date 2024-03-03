import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VehicleLog } from '../interfaces/vehiceLog';

export interface MaintenanceState {
  logs: VehicleLog[];
}

const initialState: MaintenanceState = {
  logs: [],
};

const logSlice = createSlice({
  name: 'maintenance',
  initialState,
  reducers: {
    addLogs: (state, action: PayloadAction<VehicleLog>) => {
      state.logs.push(action.payload);
    },
    fetchAllLogs: (state, action: PayloadAction<VehicleLog[]>) => {
      state.logs = action.payload;
    }
  },
});

export default logSlice.reducer;
