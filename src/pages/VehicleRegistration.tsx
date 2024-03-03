import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addVehicle } from '../actions/vehicleActions';
import api from '../services/api';
import VehicleList from '../components/VehicleList';
import { VehicleData } from '../interfaces/vehicleData';
import '../styles/VehicleRegistration.scss';
import { RootState } from '../store';

const VehicleRegistration: React.FC = () => {
  const vehicles = useSelector((state: RootState) => state.vehicles.vehicles);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<VehicleData>({
    _id: '',
    vmodel: '',
    type: '',
    name: '',
    status: 'active',
    picture: undefined,
  });
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData({ ...formData, picture: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('vmodel', formData.vmodel);
      formDataToSubmit.append('name', formData.name);
      formDataToSubmit.append('type', formData.type);
      formDataToSubmit.append('status', formData.status || '');
      if (formData.picture) {
        formDataToSubmit.append('picture', formData.picture);
      }

      const response = await api.post('/vehicles', formDataToSubmit);
      dispatch(addVehicle(response.data));
      setFormData({
        _id: '',
        vmodel: '',
        type: '',
        name: '',
        status: 'active',
        picture: undefined,
      });
      alert('Successfully Added Vehicle');
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target.type === 'file') {
      handleImageChange(e as React.ChangeEvent<HTMLInputElement>);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  return (
    <div className='container mt-5'>
      <h2>Vehicle Registration</h2>
      <div className='row'>
        <div className='col-7'>
      <VehicleList vehicles={vehicles} />
      </div>
      <div className='col-5'>
      <h4>Add New Vehicle</h4>
      <form className='row ' onSubmit={handleSubmit}>
      <div className="form-group mt-4">
        <label className='form-label' htmlFor="vmodelId">Model</label>
          <input className='form-control' id="vmodelId" type="text" name="vmodel" value={formData.vmodel} onChange={handleChange} />
        </div>
        <div className="form-group mt-4">
        <label className='form-label' htmlFor="nameId">Name</label>
          <input className='form-control' id="nameId" type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="form-group mt-4">
        <label className='form-label' htmlFor="typeId">Type</label>
          <input className='form-control' id="typeId" type="text" name="type" value={formData.type} onChange={handleChange} />
        </div>
        <div className="form-group mt-4">
        <label className='form-label' htmlFor="statusId">Status</label>
          <select className='form-control' id="statusId" name="status" value={formData.status} onChange={handleChange}>
            <option value="active">Active</option>
            <option value="maintenance">Maintenance</option>
          </select>
          </div>
          <div className="form-group mt-4">
        <label className='form-label'  htmlFor="imageId">Picture</label>
          <input className='form-control'
            id="imageId"
            type="file"
            accept="image/*"
            onChange={(e) => setFormData({ ...formData, picture: e.target.files?.[0] })}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '10px' }}
            />
          )}
</div>
        <button className='btn btn-primary mt-4' type="submit">Register Vehicle</button>
      </form>
      </div>
    </div>
    </div>
  );
};

export default VehicleRegistration;
