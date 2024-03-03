import React from 'react';
import { VehicleLog } from '../interfaces/vehiceLog';

interface VehicleListProps {
  logs: VehicleLog[];
}

const LogList: React.FC<VehicleListProps> = ({ logs}) => {  return (
    <div>
      { logs.length > 0 ? 
      <table className="table">
  <thead>
    <tr>
      <th scope="col">Description</th>
      <th scope="col">Type of Maintenance</th>
      <th scope="col">Date</th>
    </tr>
  </thead>
  <tbody>
  { logs.map((vehicle: VehicleLog, index: number) => (
    <tr  key={index}>
      <td>{vehicle.description}</td>
      <td>{vehicle.typeofmaintenance}</td>
      <td>{vehicle.date?.toString()}</td>
    </tr>
        ))}
            </tbody>
</table>:
      <div>
            No Logs found!
            </div>
}
    </div>
  );
};

export default LogList;
