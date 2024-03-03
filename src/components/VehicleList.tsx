import React from 'react';
import { VehicleData } from '../interfaces/vehicleData';

interface VehicleListProps {
  vehicles: VehicleData[];
  showButton?: boolean;
  onRowClick?: (vehicleId: string) => void;
}

const VehicleList: React.FC<VehicleListProps> = ({ vehicles, onRowClick, showButton }) => {  return (
    <div>
      { vehicles.length > 0 ? 
      <table className="table">
  <thead>
    <tr>
    <th scope="col">Vehicle Picture</th>
      <th scope="col">Vehicle Model</th>
      <th scope="col">Vehicle Type</th>
      <th scope="col">Vehicle Name</th>
      <th scope="col">Vehicle Status</th>
      { showButton ?<th scope="col">Action</th>: <></> }
    </tr>
  </thead>
  <tbody>
  { vehicles.map((vehicle: VehicleData, index: number) => (
    <tr  key={index}>
      <td className='vehicle-image text-center'>{vehicle.picture?<img src={`http://localhost:3001/uploads/${vehicle.picture}`}/>:<></> }</td>
      <td>{vehicle.vmodel}</td>
      <td>{vehicle.type}</td>
      <td>{vehicle.name}</td>
      <td>{vehicle.status}</td>
      { showButton ?<td><button className="btn btn-primary" onClick={() => onRowClick && onRowClick(vehicle._id)}>View</button></td>: <></> }
    </tr>
        ))}
            </tbody>
</table>:
      <div>
            No vehicles found, Please add new vehicle.
            </div>
}
    </div>
  );
};

export default VehicleList;
