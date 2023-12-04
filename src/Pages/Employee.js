
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "../Components/Modal";
import StatsModal from "../Components/StatsModal";


const Employee = () => {
  //State Management
  const [isEdit, setIsEdit] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isStatsModalOpen, setStatsModalOpen] = useState(false);
  const [data, setData] = useState([]); // Initialize data state

  // API Calls Methods
  useEffect(() => {
    axios
      .get("http://localhost:8081/api/employees")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8081/api/updateemployee/${selectedEmployee.EmployeeID}`,
        editedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const updatedData = data.map((employee) =>
          employee.EmployeeID === selectedEmployee.EmployeeID
            ? editedData
            : employee
        );
        setData(updatedData);

        // Disable edit mode and reset edited data
        setIsEdit(false);
        setEditedData(null);
      } else {
        console.error("Failed to update employee");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteEmployee = async (event, employeeId) => {
    event.stopPropagation(); // Prevent row click when clicking the delete button

    try {
      const response = await axios.delete(
        `http://localhost:8081/api/deleteemployee/${employeeId}`
      );

      if (response.status === 200) {
        // Fetch updated employee data
        axios
          .get("http://localhost:8081/api/employees")
          .then((res) => setData(res.data))
          .catch((err) => console.log(err));
          setIsEdit(false);
    setEditedData(null);
    setSelectedEmployee(null);
      } 
      else {
        console.error("Failed to delete employee");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // APIs Ending Here



  // Functions Start Here

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const openStatsModal = () => {
    setStatsModalOpen(true);
  };

  const closeStatsModal = () => {
    setStatsModalOpen(false);
  };

  const toggleStatsModal = () => {
    if (isStatsModalOpen) {
      closeStatsModal();
    } else {
      openStatsModal();
    }
  };
  
  const handleFormInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    setEditedData((prevData) => {
      if (type === "checkbox") {
        // Ensure that ProfileColors is an array in the initial state
        const currentProfileColors = Array.isArray(prevData.ProfileColors)
          ? prevData.ProfileColors
          : [];

        const updatedProfileColors = checked
          ? [...currentProfileColors, value]
          : currentProfileColors.filter((color) => color !== value);

        return {
          ...prevData,
          [name]: updatedProfileColors,
        };
      } else {
        return {
          ...prevData,
          [name]: type === "radio" ? (checked ? value : "") : value,
        };
      }
    });
  };

 
  const handleEdit = () => {
    // Enable edit mode and set the edited data
    setIsEdit(true);
    setEditedData({ ...selectedEmployee });
  };

  const handleCancelEdit = () => {
    // Disable edit mode and reset edited data
    setIsEdit(false);
    setEditedData(null);
    setSelectedEmployee(null);
  };

  const handleRowClick = (employee, index) => {
    // Set the selected employee and row index when a row is clicked
    setSelectedEmployee(employee);
    setSelectedRowIndex(index);
  };

 
// change save button background color based on selected employee profile color
  const selectedColors = selectedEmployee ? selectedEmployee.ProfileColors : [];

  const saveButtonStyle = {
    backgroundColor: selectedColors.includes("Green")
      ? "Green"
      : selectedColors.includes("Blue")
      ? "Blue"
      : selectedColors.includes("Red")
      ? "Red"
      : selectedColors.includes("Default")
      ? "Grey"
      : "initial", 
  };

  return (
    <div className="table-section">
    <div className="abovetable-items">
    <button className="abovebutton" onClick={toggleStatsModal}>
        {isStatsModalOpen ? "Close Stats" : "Show Employee Stats"}
      </button>
      <span className="span-text">Current Employees Details Payroll</span>
      <button className="abovebutton" onClick={openModal}>
        Add Employee
      </button>
    </div>

    {isStatsModalOpen && (
      <StatsModal employees={data} onClose={closeStatsModal} />
    )}
    

      {/* //Employee Data Table */}
    
      
      {/* //Employee Data Table */}
      <table>
        <thead>
          <tr>
            <th>Employee #</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Salutation</th>
            <th>Profile Color</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((employee, index) => (
            <tr
              key={index}
              onClick={() => handleRowClick(employee, index)}
              className={index === selectedRowIndex ? "selected-row" : ""}
              data-profilecolor={employee.ProfileColors}
            >
              <td>{employee.EmployeeID}</td>
              <td>{employee.FirstName}</td>
              <td>{employee.LastName}</td>
              <td>{employee.Salutation}</td>
              <td>{employee.ProfileColors}</td>
              <td>
                <div
                  onClick={(event) =>
                    handleDeleteEmployee(event, employee.EmployeeID)
                  }
                  className="delete-details"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* //Table Ends Here */}

      {/* //Employee Details Viewing */}
      {selectedEmployee && (
        <div className="employee-details">
          <>
            <div onClick={handleCancelEdit} className="close-details">
              <FontAwesomeIcon icon={faTimes} /> Close
            </div>
            <h3>Employee Information</h3>

            <div className="savecancel-buttons">
              {!isEdit && (
                <button className="cancel-only" onClick={handleEdit}>
                  Edit
                </button>
              )}
              {isEdit && (
                <button className="cancel-only" onClick={handleCancelEdit}>
                  Cancel
                </button>
              )}
              {isEdit && (
                <button
                  style={saveButtonStyle}
                  className="save-only"
                  onClick={handleSaveEdit}
                >
                  Save
                </button>
              )}
            </div>

            {/* //Div housing the data fields */}
            <div className="main-group">
              {/* //Div for the fields on the left */}
              <div className="detailsinput-group">
                <label>
                  First Name(s) *
                  <input
                    className="input1"
                    type="text"
                    value={
                      isEdit ? editedData.FirstName : selectedEmployee.FirstName
                    }
                    onChange={handleFormInputChange}
                    name="FirstName"
                    disabled={!isEdit}
                  />
                </label>

                <label>
                  Last Name
                  <input
                    className="input2"
                    type="text"
                    value={
                      isEdit ? editedData.LastName : selectedEmployee.LastName
                    }
                    onChange={handleFormInputChange}
                    name="LastName"
                    disabled={!isEdit}
                  />
                </label>
                <label>
                  Salutaion
                  <select
                    className="input3"
                    name="Salutation"
                    value={
                      isEdit
                        ? editedData.Salutation
                        : selectedEmployee.Salutation
                    }
                    disabled={!isEdit}
                    onChange={handleFormInputChange}
                  >
                    <option value=""></option>
                    <option value="Mr">Mr.</option>
                    <option value="Mrs">Mrs.</option>
                    <option value="Ms">Ms.</option>
                    <option value="Dr">Dr.</option>
                    <option value="Mx">Mx.</option>
                  </select>
                </label>
                <label>
                  Gender
                  <input
                    className="gendermale-details"
                    type="radio"
                    name="Gender"
                    value="Male"
                    checked={selectedEmployee.Gender === "Male"}
                    readOnly
                    disabled={!isEdit}
                  />
                  Male
                  <input
                    className="genderfemale"
                    type="radio"
                    name="Gender"
                    value="Female"
                    checked={selectedEmployee.Gender === "Female"}
                    readOnly
                    disabled={!isEdit}
                  />
                  Female
                  <input
                    className="genderunspec-details"
                    type="radio"
                    name="Gender"
                    value="Unspecified"
                    checked={selectedEmployee.Gender === "U"}
                    readOnly
                    disabled={!isEdit}
                  />
                  Unspecified
                </label>

                <label>
                  Employee No
                  <input
                    className="input-empid"
                    type="text"
                    value={selectedEmployee.EmployeeID}
                    readOnly
                    onChange={handleFormInputChange}
                    style={{ textAlign: "right" }}
                    disabled={!isEdit}
                  />
                </label>
              </div>
              {/* //Ends Here */}
              {/* //Div hosung field on the right */}
              <div className="detailsinput-group">
                <label>
                  Full Name*
                  <input
                    className="input1fullname"
                    type="text"
                    value={
                      selectedEmployee.FirstName +
                      " " +
                      selectedEmployee.LastName
                    }
                    disabled
                  />
                </label>

                <label>
                  Gross Salary
                  <input
                    className="input2"
                    type="text"
                    value={
                      isEdit
                        ? editedData.GrossSalary.toLocaleString()
                        : selectedEmployee.GrossSalary.toLocaleString()
                    }
                    onChange={handleFormInputChange}
                    style={{ textAlign: "right" }}
                    disabled={!isEdit}
                  />
                </label>

                <label>
                  Employee Profile Color
                  <input
                    className="gendermale-details"
                    type="checkbox"
                    name="Green"
                    value="Green"
                    checked={
                      isEdit
                        ? editedData.ProfileColors.includes("Green")
                        : selectedEmployee.ProfileColors.includes("Green")
                    }
                    onChange={handleFormInputChange}
                    disabled={!isEdit}
                  />
                  Green
                  <input
                    className="gendermale-details"
                    type="checkbox"
                    name="Blue"
                    value="Blue"
                    checked={
                      isEdit
                        ? editedData.ProfileColors.includes("Blue")
                        : selectedEmployee.ProfileColors.includes("Blue")
                    }
                    onChange={handleFormInputChange}
                    disabled={!isEdit}
                  />
                  Blue
                  <input
                    className="gendermale-details"
                    type="checkbox"
                    name="Red"
                    value="Red"
                    checked={
                      isEdit
                        ? editedData.ProfileColors.includes("Red")
                        : selectedEmployee.ProfileColors.includes("Red")
                    }
                    onChange={handleFormInputChange}
                    disabled={!isEdit}
                  />
                  Red
                  <input
                    className="gendermale-details"
                    type="checkbox"
                    name="Default"
                    value="Default"
                    checked={
                      isEdit
                        ? editedData.ProfileColors.includes("Default")
                        : selectedEmployee.ProfileColors.includes("Default")
                    }
                    onChange={handleFormInputChange}
                    disabled={!isEdit}
                  />
                  Default
                </label>
              </div>
              {/* //Right-hand side div ends here */}
            </div>
          </>
        </div>
      )}
      {/* //Employee Details Div Ends here */}

     {/* Add New Employee Modal */}
      {isModalOpen && (
        <Modal closeModal={closeModal} updateData={setData} />
      )}
            </div>
  );
};

export default Employee;
