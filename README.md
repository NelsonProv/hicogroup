Employee Management System
A simple Employee Management System with CRUD operations for managing employee information. 
The system provides RESTful APIs for creating, retrieving, and updating employee data.




- Table of Contents -
- Introduction -
- Features -
- Prerequisites -
- Getting Started -
- Installation -
- Usage -
- API Endpoints -
- Technologies Used -
- Contributing -
- Introduction


This Employee Management System allows users to manage employee information, including details such as first name, 
last name, salutation, gender, gross salary, and profile colors. The system exposes RESTful APIs to interact with the employee data.

Features
- Add new employees
- Retrieve a list of all employees
- Update employee information
- Prerequisites
- Before you begin, ensure you have the following installed:

- Node.js
- npm
- MySQL Database


Getting Started
- Installation
- Clone the repository:


git clone https://github.com/NelsonProv/peanut-app-dev.git

- Navigate to the project directory:


- cd payroll_system
- Install dependencies:


npm install
Usage
Start the server:


node server.js
Access the API at http://localhost:8081.

API Endpoints
POST /api/addemployees: Add a new employee.
GET /api/employees: Retrieve a list of all employees.
PUT /api/updateemployee/:id: Update employee information by providing the employee ID.

Technologies Used
Node.js
Express.js
MySQL
Axios (for making HTTP requests)



