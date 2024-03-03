// store.ts
import { configureStore } from '@reduxjs/toolkit';
import vehicleReducer from './reducers/vehicleReducer';
import maintenanceReducer from './reducers/maintenanceReducer';

const store = configureStore({
  reducer: {
    vehicles: vehicleReducer,
    maintenance: maintenanceReducer
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
