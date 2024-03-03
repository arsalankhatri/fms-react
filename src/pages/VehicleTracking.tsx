import React from 'react';
import VehicleList from '../components/VehicleList';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const VehicleTracking: React.FC= () => {
  const vehicles = useSelector((state: RootState) => state.vehicles.vehicles);
  const navigate = useNavigate();
  const handleRowClick = (vehicleId: string) => {
    navigate(`/tracking-status?vehicleId=${vehicleId}`);
  };
  return (
    <div className='container mt-5'>
      <h2>Vehicle Tracking</h2>
      <h6>Click view to show tracking</h6>
      <VehicleList vehicles={vehicles} onRowClick={handleRowClick} showButton={true} />
    </div>
  );
};

export default VehicleTracking;
