const express = require('express');
const Service = require('../models/Service');
const router = express.Router();

// Route to create a new service
router.post('/create', async (req, res) => {
  const { name, description, price } = req.body;
  const newService = new Service({ name, description, price });
  await newService.save();
  res.json({ message: 'Service created successfully', service: newService });
});

// Route to get all services
router.get('/', async (req, res) => {
  const services = await Service.find();
  res.json(services);
});

// Route to update a service by ID
router.put('/:id', async (req, res) => {
  const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ message: 'Service updated successfully', service: updatedService });
});

// Route to delete a service by ID
router.delete('/:id', async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: 'Service deleted successfully' });
});

module.exports = router;
