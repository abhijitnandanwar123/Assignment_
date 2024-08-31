const express = require('express');
const router = express.Router();
const {
  createForm,
  getAllForms,
  getFormById,
  editFormById,
  deleteFormById
} = require('../controllers/formController');

router.post('/create', createForm);
router.get('/', getAllForms);
router.get('/:id', getFormById);
router.put('/:id', editFormById);
router.delete('/:id', deleteFormById);

module.exports = router;
