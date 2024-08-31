import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import './FormView.css'; // Import the CSS file

const FormView = () => {
  const { id } = useParams(); // Get the form ID from the URL
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({}); // State to hold form input data

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/forms/${id}`);
        setForm(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchForm();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form Submitted! Check console for form data.');
    console.log('Submitted Form Data:', formData);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="form-view-container">
      <h1 className="form-title">{form.title}</h1>
      <form className="form" onSubmit={handleSubmit}>
        {form.inputs.map((input, index) => (
          <div key={index} className="input-group">
            <TextField
              label={input.title}
              type={input.type}
              name={input.title} // Use the input title as the name
              placeholder={input.placeholder}
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit" className="submit-button">SUBMIT</button>
      </form>
    </div>
  );
};

export default FormView;
