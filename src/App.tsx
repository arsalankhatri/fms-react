import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';
import { Provider, useDispatch } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import VehicleRegistration from './pages/VehicleRegistration';
import VehicleTracking from './pages/VehicleTracking';
import MaintenanceLogs from './pages/MaintenanceLogs';
import Analytics from './pages/Analytics';
import { fetchAllVehicles } from './actions/vehicleActions';
import api from './services/api';
import VehicleLogs from './components/VehicleLogs';
import AnalyticsForm from './components/AnalyticsForm';
import TrackingStatus from './components/TrackingStatus';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [vehicles, setVehicles] = React.useState([]);
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await api.get('/vehicles');
        if (response?.data?.length > 0) {
          dispatch(fetchAllVehicles(response.data));
          setVehicles(response.data);
          
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchVehicles();
  }, [dispatch]);
  return (
    <Provider store={store}>
      <div className="app-container">
        <h1 className='text-center'>Fleet Management System</h1>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Dashboard</Link>
                </li>
                <li>
                  <Link to="/registration">Vehicle Registration</Link>
                </li>
                <li>
                  <Link to="/tracking">Vehicle Tracking</Link>
                </li>
                <li>
                  <Link to="/maintenance">Maintenance Logs</Link>
                </li>
                <li>
                  <Link to="/analytics">Analytics</Link>
                </li>
              </ul>
            </nav>

            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="registration" element={<VehicleRegistration />} />
              <Route path="maintenance" element={<MaintenanceLogs/>} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="tracking" element={<VehicleTracking/>} />
              <Route path="vehicle-logs" element={<VehicleLogs />} />
              <Route path="analytics-form" element={<AnalyticsForm />} />
              <Route path="tracking-status" element={<TrackingStatus />} />
            </Routes>
          </div>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
