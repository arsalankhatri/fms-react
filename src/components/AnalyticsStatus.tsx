import React from 'react';
import {  VehicleSumAnalytics } from '../interfaces/vehicleAnalytics';
import '../styles/Analytics.scss'

interface VehicleAnalyticsProps {
  analytics: VehicleSumAnalytics[];
}

const AnalyticsStatus: React.FC<VehicleAnalyticsProps> = ({analytics}) => {  
  return (
    <div className="mt-3">
    { analytics.length > 0 ? 
    <table className="table">
    <thead>
      <tr>
        <th scope="col">Date</th>
        <th scope="col">Total Hours Operated</th>
        <th scope="col">Total Distance Traveled</th>
      </tr>
    </thead>
    <tbody>
    { analytics.map((item: VehicleSumAnalytics, index: number) => (
      <tr>
        <td>{item.date}</td>
        <td>{item.totalHoursOperated} hours</td>
        <td>{item.totalDistanceTraveled} Km</td>
      </tr>
  ))}
    </tbody>
  </table>: <div>
  No Logs Found
  </div>

    }
    </div>
  );
};

export default AnalyticsStatus;
