const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors')

const app = express(); 
app.use(cors());
const PORT = process.env.PORT || 8081;

// Database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root', 
  password: '',
  database: 'payroll',
};

// Create a MySQL pool
const pool = mysql.createPool(dbConfig);

app.use(bodyParser.json());

// Endpoint to add a new employee
app.post('/api/addemployees', async (req, res) => {
  try {
    const { FirstName, LastName, Salutation, Gender, GrossSalary, ProfileColors } = req.body;

    //  pool.query for executing queries
    pool.query(
      'INSERT INTO employees (FirstName, LastName, Salutation, Gender, GrossSalary, ProfileColors) VALUES (?, ?, ?, ?, ?, ?)',
      [FirstName, LastName, Salutation, Gender, GrossSalary, ProfileColors],
      (error, results) => {
        if (error) {
          console.error('Error:', error);
          res.status(500).json({ error: 'Internal Server Error', details: error.message });
        } else {
          res.status(201).json({ id: results.insertId });
        }
      }
    );
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// Endpoint to update an employee
app.put('/api/updateemployee/:id', async (req, res) => {
  try {
    const { FirstName, LastName, Salutation, Gender, GrossSalary, ProfileColors } = req.body;
    const employeeId = req.params.id;

    // Use pool.query for executing queries
    pool.query(
      'UPDATE employees SET FirstName=?, LastName=?, Salutation=?, Gender=?, GrossSalary=?, ProfileColors=? WHERE EmployeeID=?',
      [FirstName, LastName, Salutation, Gender, GrossSalary, ProfileColors, employeeId],
      (error, results) => {
        if (error) {
          console.error('Error:', error);
          res.status(500).json({ error: 'Internal Server Error', details: error.message });
        } else {
          res.status(200).json({ message: 'Employee updated successfully' });
        }
      }
    );
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});


// Endpoint to get all employees
app.get('/api/employees', async (req, res) => {
  try {
    // Use pool.query for executing queries
    pool.query('SELECT * FROM employees', (error, results) => {
      if (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
      } else {
        res.status(200).json(results);
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// Endpoint to delete an employee
app.delete('/api/deleteemployee/:id', async (req, res) => {
  try {
    const employeeId = req.params.id;

    // pool.query for executing queries
    pool.query(
      'DELETE FROM employees WHERE EmployeeID=?',
      [employeeId],
      (error, results) => {
        if (error) {
          console.error('Error:', error);
          res.status(500).json({ error: 'Internal Server Error', details: error.message });
        } else {
          res.status(200).json({ message: 'Employee deleted successfully' });
        }
      }
    );
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

