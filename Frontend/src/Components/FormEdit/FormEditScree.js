import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './FormEditScreen.css'; // Import custom CSS

const FormEditScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get form ID from URL
  const [formTitle, setFormTitle] = useState('Untitled Form');
  const [inputs, setInputs] = useState([]);
  const [isAddingInput, setIsAddingInput] = useState(false);
  const [selectedInputType, setSelectedInputType] = useState(null);
  const [inputDetails, setInputDetails] = useState({ title: '', placeholder: '' });
  const [currentEditIndex, setCurrentEditIndex] = useState(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  useEffect(() => {
    // Fetch the form data if an ID is provided
    if (id) {
      fetchFormData();
    }
  }, [id]);

  const fetchFormData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/forms/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch form data');
      }
      const data = await response.json();
      setFormTitle(data.title);
      setInputs(data.inputs);
    } catch (error) {
      console.error('Error fetching form:', error);
    }
  };

  const handleAddInput = () => {
    setIsAddingInput(!isAddingInput);
    setSelectedInputType(null);
  };

  const handleInputTypeSelect = (type) => {
    setSelectedInputType(type);
    setInputDetails({ title: '', placeholder: '' });
    setCurrentEditIndex(null);
  };

  const handleInputDetailsChange = (e) => {
    setInputDetails({
      ...inputDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputSubmit = () => {
    if (currentEditIndex !== null) {
      const updatedInputs = inputs.map((input, index) =>
        index === currentEditIndex ? { ...inputDetails, type: selectedInputType } : input
      );
      setInputs(updatedInputs);
    } else {
      setInputs([...inputs, { ...inputDetails, type: selectedInputType }]);
    }

    setInputDetails({ title: '', placeholder: '' });
    setSelectedInputType(null);
    setCurrentEditIndex(null);
  };

  const handleEditInput = (index) => {
    const inputToEdit = inputs[index];
    setInputDetails({ title: inputToEdit.title, placeholder: inputToEdit.placeholder });
    setSelectedInputType(inputToEdit.type);
    setIsAddingInput(true);
    setCurrentEditIndex(index);
  };

  const handleDeleteInput = (index) => {
    const updatedInputs = inputs.filter((_, i) => i !== index);
    setInputs(updatedInputs);
  };

  const handleTitleEdit = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (e) => {
    setFormTitle(e.target.value);
  };

  const handleTitleSubmit = () => {
    setIsEditingTitle(false);
  };

  const handleSaveForm = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/forms/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formTitle,
          inputs: inputs,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Form updated successfully:', data);

      // Redirect to the form list after successful update
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4">Edit Form</h1>
      <div className="d-flex justify-content-between">
        <div className="form-preview">
          <div className="title-container d-flex align-items-center mb-3">
            <h2 className="form-title">
              {formTitle}
              <IconButton onClick={handleTitleEdit}>
                <EditIcon />
              </IconButton>
            </h2>
          </div>

          {inputs.map((input, index) => (
            <div key={index} className="input-preview d-flex align-items-center mb-2">
              <label>{input.title}</label>
              <TextField
                type={input.type}
                placeholder={input.placeholder}
                disabled
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <span className="icon-container d-flex gap-2">
                <IconButton onClick={() => handleEditInput(index)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteInput(index)}>
                  <DeleteIcon />
                </IconButton>
              </span>
            </div>
          ))}

          <Button variant="contained" color="success" onClick={handleAddInput}>
            {isAddingInput ? 'CLOSE ADD INPUT' : 'ADD INPUT'}
          </Button>

          {isAddingInput && (
            <div className="input-types d-flex flex-wrap mb-2">
              {['text', 'number', 'email', 'password', 'date'].map(type => (
                <Button
                  key={type}
                  variant="outlined"
                  className="me-2 mb-2"
                  onClick={() => handleInputTypeSelect(type)}
                >
                  {type.toUpperCase()}
                </Button>
              ))}
            </div>
          )}
        </div>

        <div className="form-editor">
          {isEditingTitle ? (
            <div className="input-editor">
              <h3>Edit Form Title</h3>
              <TextField
                type="text"
                value={formTitle}
                onChange={handleTitleChange}
                onBlur={handleTitleSubmit}
                variant="outlined"
                fullWidth
                margin="normal"
                autoFocus
              />
            </div>
          ) : (
            selectedInputType && (
              <div className="input-editor">
                <h3>{selectedInputType.toUpperCase()}</h3>
                <TextField
                  type="text"
                  name="title"
                  label="Title"
                  value={inputDetails.title}
                  onChange={handleInputDetailsChange}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  type="text"
                  name="placeholder"
                  label="Placeholder"
                  value={inputDetails.placeholder}
                  onChange={handleInputDetailsChange}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <Button variant="contained" color="primary" onClick={handleInputSubmit}>
                  {currentEditIndex !== null ? 'UPDATE FIELD' : 'ADD FIELD'}
                </Button>
              </div>
            )
          )}
        </div>
      </div>
      <div className="text-center mt-4">
        <Button variant="contained" color="primary" onClick={handleSaveForm}>
          SAVE CHANGES
        </Button>
      </div>
    </div>
  );
};

export default FormEditScreen;
