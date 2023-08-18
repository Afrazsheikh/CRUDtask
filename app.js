const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Employee = require('./models/employee');
const cors = require('cors');

// require('dotenv').config();
const app = express();
app.use(bodyParser.json());
app.use(cors());
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/employee_data', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create an employee
app.post('/employees', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).send(employee);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all employees
app.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.send(employees);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get employes sorting 
// Get all employees with sorting
app.get('/employees', async (req, res) => {
    try {
      const sortField = req.query.sortField || 'name'; // Default to sorting by name
      const sortOrder = req.query.sortOrder || 'asc';   // Default to ascending order
  
      const employees = await Employee.find().sort({ [sortField]: sortOrder });
      res.send(employees);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  

// Update an employee
app.patch('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.send(employee);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete an employee
app.delete('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    res.send(employee);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is up on port 3000');
//   server.listen(process.env.PORT || process.env.port);
});
