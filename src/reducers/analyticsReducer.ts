import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VehicleSumAnalytics } from '../interfaces/vehicleAnalytics';

export interface AnalyticsState {
  analytics: VehicleSumAnalytics[];
}

const initialState: AnalyticsState = {
  analytics: [],
};

const AnalyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    addAnalytics: (state, action: PayloadAction<VehicleSumAnalytics>) => {
      state.analytics.push(action.payload);
    },
    fetchAllAnalytics: (state, action: PayloadAction<VehicleSumAnalytics[]>) => {
      state.analytics = action.payload;
    }
  },
});

export default AnalyticsSlice.reducer;
