import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import api from '../services/api';
import '../styles/VehicleRegistration.scss';
import { VehicleLog } from '../interfaces/vehiceLog';
import { useLocation, useNavigate } from 'react-router-dom';
import LogList from './LogList';
import { addLogs, fetchAllLogs } from '../actions/maintenanceActions';

const VehicleLogs: React.FC = () => {
  const dispatch = useDispatch();
  const [logs, setLogs] = useState<VehicleLog[]>([]);
  const [formData, setFormData] = useState<VehicleLog>({
    vehicleId: '',
    description: '',
    date: new Date(),
    typeofmaintenance: 'regular'
  });

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const vehicleId = queryParams.get('vehicleId') || '';

  useEffect(() => {
    if (!vehicleId) {
      navigate('/maintenance');
    }
    const fetchVehicleLogs = async () => {
      try {
        const response = await api.get(`/maintenance/${vehicleId}`);
        if (response?.data?.length > 0) {
          dispatch(fetchAllLogs(response.data));
          setLogs(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchVehicleLogs();
  }, [vehicleId, navigate, dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post(`/maintenance/${vehicleId}`, formData);
      dispatch(addLogs(response.data));
      setLogs((prevLogs) => [...prevLogs, response.data]);
      setFormData({
        vehicleId: '',
        description: '',
        date: new Date(),
        typeofmaintenance: 'regular'
      });
      alert('Successfully Added Logs!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container mt-5'>
      <h2>Logs Registration</h2>
      <div className='row'>
        <div className='col-7'>
          <LogList logs={logs} />
        </div>
        <div className='col-5'>
          <h4>Log Maintenance</h4>
          <form className='row ' onSubmit={handleSubmit}>
            <div className="form-group mt-4">
              <label className='form-label' htmlFor="vehicleId">Vehicle Id</label>
              <input className='form-control' id="vehicleId" type="text" name="vehicleId" value={vehicleId} onChange={(e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }} readOnly />
            </div>
            <div className="form-group mt-4">
              <label className='form-label' htmlFor="descriptionId">Description</label>
              <input className='form-control' id="descriptionId" type="text" name="description" value={formData.description} onChange={(e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }} />
            </div>
            <div className="form-group mt-4">
              <label className='form-label' htmlFor="typemaintenanceId">Type of Maintenance</label>
              <select className='form-control' id="typemaintenanceId" name="typeofmaintenance" value={formData.typeofmaintenance} onChange={(e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }}>
                <option value="regular">Regular</option>
                <option value="accident">Accident</option>
              </select>
            </div>
            <button className='btn btn-primary mt-4' type="submit">Register Logs</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VehicleLogs;
