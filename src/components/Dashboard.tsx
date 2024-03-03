import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.scss';

const Dashboard: React.FC = () => {
  
    return <div className='dashboard container mt-5'>
            <ul className='row'>
                <li className="vehicle-regisration col">
                  <Link to="/registration">Vehicle Registration</Link>
                </li>
                <li className="vehicle-tracking col">
                  <Link to="/tracking">Vehicle Tracking</Link>
                </li>
                <li className='maintenance-log col'>
                  <Link to="/maintenance">Maintenance Logs</Link>
                </li>
                <li className='analytics col'>
                  <Link to="/analytics">Analytics</Link>
                </li>
              </ul>
    </div>;
  };
  

export default Dashboard;
