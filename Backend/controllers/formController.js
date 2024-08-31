const Form = require('../models/Form');

// Create a new form
const createForm = async (req, res) => {
  try {
    const { title, inputs } = req.body;

    if (!title || !Array.isArray(inputs)) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    const newForm = new Form({ title, inputs });
    await newForm.save();
    res.status(201).json(newForm);
  } catch (error) {
    console.error('Error creating form:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all forms
const getAllForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    console.error('Error fetching forms:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get form by ID
const getFormById = async (req, res) => {
  try {
    const { id } = req.params;
    const form = await Form.findById(id);

    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.json(form);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit form by ID
const editFormById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, inputs } = req.body;

    if (!title || !Array.isArray(inputs)) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    const updatedForm = await Form.findByIdAndUpdate(
      id,
      { title, inputs },
      { new: true, runValidators: true }
    );

    if (!updatedForm) {
      return res.status(404).json({ error: 'Form not found' });
    }

    res.status(200).json(updatedForm);
  } catch (error) {
    console.error('Error updating form:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete form by ID
const deleteFormById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedForm = await Form.findByIdAndDelete(id);

    if (!deletedForm) {
      return res.status(404).json({ error: 'Form not found' });
    }

    res.status(200).json({ message: 'Form deleted successfully' });
  } catch (error) {
    console.error('Error deleting form:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createForm,
  getAllForms,
  getFormById,
  editFormById,
  deleteFormById
};
