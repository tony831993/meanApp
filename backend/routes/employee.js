const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

// GET - All employees
router.get('/', async (req, res) => {
    try {
        let success = false;
        const empsData = await Employee.find();
        if (empsData) {
            success = true;
            res.send({
                success: success,
                data: empsData
            });
        } else {
            res.status(400).json({ success, message: `Unable to get employees data.` });
        }
    } catch (error) {
        console.error(`Error: /employees/ error: ${error.message}`);
        res.status(500).json({ success, message: `Internal server error.` });
    }
});
// GET - Employee by ID
router.get('/:id', async (req, res) => {
    try {
        let success = false;
        const empId = req.params.id;
        const empData = await Employee.findById(empId);
        if (empData) {
            success = true;
            res.send({
                success: success,
                data: empData
            });
        } else {
            res.status(400).json({ success, message: `Data not found.` });
        }
    } catch (error) {
        console.error(`Error: /employees/:id error: ${error.message}`);
        res.status(500).json({ success, message: `Internal server error.` });
    }
});

// POST - Add employee
router.post('/add', async (req, res) => {
    let success = false;
    try {
        let emp = new Employee({
            name: req.body.name,
            position: req.body.position,
            department: req.body.department
        });
        const savedEmployee = await emp.save();
        if (savedEmployee) {
            success = true;
            res.send({
                success: success,
                message: 'Employee data added successfully.'
            })
        } else {
            res.status(400).json({ success, message: `Unable to save employee data.` });
        }
    } catch (error) {
        console.error(`Error: /employees/add error: ${error.message}`);
        res.status(500).json({ success, message: `Internal server error.` });
    }
});
// PUT
router.put('/:id', async (req, res) => {
    try {
        let success = false;
        const { name, position, department } = req.body;
        let newEmployee = {};
        if(newEmployee) {
            newEmployee.name = name;
        }
        if(position) {
            newEmployee.position = position;
        }
        if(department) {
            newEmployee.department = department;
        }
        let empData = await Employee.findById(req.params.id);
        if (!empData) {
            return res.status(404).json({ success, message: "Employee data not found." });
        } else {
            empData = await Employee.findByIdAndUpdate(req.params.id, { $set: newEmployee }, { new: true });
        }
        if (empData) {
            success = true;
            res.send({
                success: success,
                message: 'Employee data updated successfully.'
            });
        } else {
            res.status(400).json({ success, message: `Unable to perform update operation.` });
        }
    } catch (error) {
        console.error(`Error: /employees/delete error: ${error.message}`);
        res.status(500).json({ success, message: `Internal server error.` });
    }
});


// DELETE
router.delete('/:id', async (req, res) => {
    try {
        let success = false;
        const empId = req.params.id;
        const empData = await Employee.findByIdAndDelete(empId);
        if (empData) {
            success = true;
            res.send({
                success: success,
                message: 'Data deleted successfully.'
            });
        } else {
            res.status(400).json({ success, message: `Unable to perform delete operation.` });
        }
    } catch (error) {
        console.error(`Error: /employees/delete error: ${error.message}`);
        res.status(500).json({ success, message: `Internal server error.` });
    }
});

module.exports = router;