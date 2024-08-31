import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './WelcomeScreen.css'; // Import the CSS file

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);

  useEffect(() => {
    // Fetch forms from the server
    const fetchForms = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/forms');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const fetchedForms = await response.json();
        setForms(fetchedForms);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    fetchForms();
  }, []);

  const handleCreateNewForm = () => {
    navigate('/create-form');
  };

  const handleDeleteForm = async (formId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this form?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/forms/${formId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the form');
      }

      // Remove the deleted form from the state
      setForms(forms.filter((form) => form._id !== formId));
    } catch (error) {
      console.error('Error deleting form:', error);
    }
  };

  return (
    <div className="welcome-screen-container">
      <h1 className="welcome-header">Welcome to Form.com</h1>
      <p className="welcome-subheader">This is a simple form builder.</p>
      <button className="create-button" onClick={handleCreateNewForm}>
        CREATE NEW FORM
      </button>

      <div className="forms-container">
        <h2 className="forms-header">Forms</h2>
        {forms.length > 0 ? (
          <div className="form-grid">
            {forms.map((form) => (
              <div key={form._id} className="form-card">
                <h3>{form.title}</h3>
                <div className="form-actions">
                  <Link to={`/forms/${form._id}`} className="view-link">
                    VIEW
                  </Link>
                  <Link to={`/edit-form/${form._id}`} className="edit-link">
                    EDIT
                  </Link>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteForm(form._id)}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-forms-text">You have no forms created yet.</p>
        )}
      </div>
    </div>
  );
};

export default WelcomeScreen;
