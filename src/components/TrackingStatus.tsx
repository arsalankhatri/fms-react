import React, { useEffect, useState } from 'react';
import '../styles/Tracking.scss';
import { VehicleTracking } from '../interfaces/vehicleTracking';
import api from '../services/api';

const TrackingStatus: React.FC = () => {
  const [tracking, setTracking] = useState<VehicleTracking>();
  const queryParams = new URLSearchParams(window.location.search);
  const vehicleId = queryParams.get('vehicleId') || '';

  useEffect(() => {
    const fetchTrackingInfo = async () => {
      try {
        const response = await api(`/tracking/${vehicleId}`);
        setTracking(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTrackingInfo();

    // Set up interval to fetch tracking information every 3 seconds
    const intervalId = setInterval(fetchTrackingInfo, 3000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [vehicleId]);

  return (
    <div className='container mt-5'>
        <h2> Vehicle ID: {vehicleId}</h2>
        <h6>Tracking will update after 3 seconds</h6>
    <div className='row tracking justify-content-between mt-4'>
      <div className='col tracking-container'>
        <span className="title-text">Location (lat,long)</span>
        <span className='value-text'>{tracking?.location || 'Not Available'}</span>
      </div>
      <div className='col tracking-container'>
        <span className="title-text">Speed</span>
        <span className='value-text'>{tracking?.speed || 0} Km/h</span>
      </div>
      <div className='col tracking-container'>
        <span className="title-text">Status</span>
        <span className='value-text'>{tracking?.status || 'Not Available'}</span>
      </div>
    </div>
    </div>
  );
};

export default TrackingStatus;
