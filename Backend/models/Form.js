const mongoose = require('mongoose');

const inputSchema = new mongoose.Schema({
  title: { type: String, required: true },
  placeholder: { type: String, required: true },
  type: { type: String, required: true, enum: ['text', 'number', 'email', 'password', 'date'] }
});

const formSchema = new mongoose.Schema({
  title: { type: String, required: true },
  inputs: [inputSchema]
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
