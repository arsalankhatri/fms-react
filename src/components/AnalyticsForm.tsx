import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import api from '../services/api';
import '../styles/VehicleRegistration.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { VehicleAnalytics, VehicleSumAnalytics } from '../interfaces/vehicleAnalytics';
import { addAnalytics, fetchAllAnalytics } from '../actions/analyticsActions';
import AnalyticsStatus from './AnalyticsStatus';

const VehicleLogs: React.FC = () => {
  const dispatch = useDispatch();
  const [analytics, setAnalytics] = useState<VehicleSumAnalytics[]>([]);
  const [formData, setFormData] = useState<VehicleAnalytics>({
    vehicleId: '',
    distanceTraveled: 0,
    hoursOperated: 0,
    date: new Date().toISOString().split('T')[0]
  });

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const vehicleId = queryParams.get('vehicleId') || '';
  const fetchVehicleAnalytics = async () => {
    try {
      const response = await api.get(`/usage/${vehicleId}`);
      if (response?.data?.length) {
        dispatch(fetchAllAnalytics(response.data));
        setAnalytics(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!vehicleId) {
      navigate('/analytics');
    }
    fetchVehicleAnalytics();
  }, [vehicleId, navigate, dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post(`/usage/${vehicleId}`, formData);
      dispatch(addAnalytics(response.data));
      fetchVehicleAnalytics();
      setFormData({
        vehicleId: '',
        distanceTraveled: 0,
        hoursOperated: 0,
        date: new Date().toISOString().split('T')[0]
      });
      alert('Successfully Added Analytics!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container mt-5'>
      <h2>Analytics of Vehicle</h2>
      <div className='row'>
        <div className='col-7'>
          <AnalyticsStatus analytics={analytics} />
        </div>
        <div className='col-5'>
          <h4>Analytics Form</h4>
          <form className='row ' onSubmit={handleSubmit}>
            <div className="form-group mt-4">
              <label className='form-label' htmlFor="vehicleId">Vehicle Id</label>
              <input className='form-control' id="vehicleId" type="text" name="vehicleId" value={vehicleId} onChange={(e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }} readOnly disabled />
            </div>
            <div className="form-group mt-4">
              <label className='form-label' htmlFor="hoursOperatedId">Hours Operated</label>
              <input className='form-control' id="hoursOperatedId" type="text" name="hoursOperated" value={formData.hoursOperated} onChange={(e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }} />
            </div>
            <div className="form-group mt-4">
              <label className='form-label' htmlFor="distanceTravelId">Distance Traveled</label>
              <input className='form-control' id="distanceTravelId" type="text" name="distanceTraveled" value={formData.distanceTraveled} onChange={(e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }} />
            </div>
            <div className="form-group mt-4">
              <label className='form-label' htmlFor="datePicker">Date</label>
              <input
                id="datePicker"
                type="date"
                name="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className='form-control'
              />
            </div>
            <button className='btn btn-primary mt-4' type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VehicleLogs;
