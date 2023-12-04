import React, { useState, useEffect } from "react";
import axios from "axios";

const Modal = ({ closeModal, updateData }) => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Salutation: "",
    Gender: "",
    GrossSalary: "",
    ProfileColors: [],
  });

  const [notification, setNotification] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8081/api/addemployees",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        // Clear the form data
        setFormData({
          FirstName: "",
          LastName: "",
          Salutation: "",
          Gender: "",
          GrossSalary: "",
          ProfileColors: [],
        });

        setNotification("Employee added successfully!");

        // Fetch updated employee data
        axios
          .get("http://localhost:8081/api/employees")
          .then((res) => updateData(res.data))
          .catch((err) => console.log(err));

        // Close modal after notification timeout
        setTimeout(() => {
          closeModal();
        }, 3000); // 3 seconds
      } else {
        console.error("Failed to add employee");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    if (notification) {
      const timeoutId = setTimeout(() => {
        setNotification(null);
        closeModal(); // Close modal after notification timeout
      }, 3000); // 3 seconds
      return () => clearTimeout(timeoutId);
    }
  }, [notification, closeModal]);

  const handleModalInputChange = (event) => {
    const { name, value } = event.target;

    // Update the form data when input changes
    setFormData((prevData) => {
      if (name === "Salutation") {
        // Auto-select gender based on salutation
        let genderValue = "";
        if (value === "Mr") {
          genderValue = "Male";
        } else if (value === "Mrs" || value === "Ms") {
          genderValue = "Female";
        } else if (value === "Mx") {
          genderValue = "U";
        }

        return {
          ...prevData,
          [name]: value,
          Gender: genderValue,
        };
      } else {
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        {notification && <div className="notification">{notification}</div>}
        <h2>Add New Employee</h2>
        <form className="modal-form" onSubmit={handleFormSubmit}>
          <label className="modal-label">
            First Name(s) *
            <input
              className="modal-input"
              type="text"
              name="FirstName"
              value={formData.FirstName}
              onChange={handleModalInputChange}
            />
          </label>

          <label className="modal-label">
            Last Name *
            <input
              className="modal-input"
              type="text"
              name="LastName"
              value={formData.LastName}
              onChange={handleModalInputChange}
            />
          </label>

          <label className="modal-label">
            Salutation *
            <select
              className="modal-input"
              name="Salutation"
              value={formData.Salutation}
              onChange={handleModalInputChange}
            >
              <option value=""></option>
              <option value="Mr">Mr.</option>
              <option value="Mrs">Mrs.</option>
              <option value="Ms">Ms.</option>
              <option value="Dr">Dr.</option>
              <option value="Mx">Mx.</option>
            </select>
          </label>

          <label className="modal-label">
            Gender *
            <label>
              <input
                type="radio"
                name="Gender"
                value="Male"
                checked={formData.Gender === "Male"}
                onChange={handleModalInputChange}
              />{" "}
              Male
            </label>
            <label>
              <input
                type="radio"
                name="Gender"
                value="Female"
                checked={formData.Gender === "Female"}
                onChange={handleModalInputChange}
              />{" "}
              Female
            </label>
            <label>
              <input
                type="radio"
                name="Gender"
                value="U"
                checked={formData.Gender === "U"}
                onChange={handleModalInputChange}
              />{" "}
              Unspecified
            </label>
          </label>

          <label className="modal-label">
            Gross Salary $PY
            <input
              className="modal-input"
              type="number"
              name="GrossSalary"
              value={formData.GrossSalary}
              onChange={handleModalInputChange}
            />
          </label>

          <label className="modal-label">
            Profile Color(s)
            <label>
              <input
                type="checkbox"
                name="ProfileColors"
                value="Green"
                checked={formData.ProfileColors.includes("Green")}
                onChange={handleModalInputChange}
              />{" "}
              Green
            </label>
            <label>
              <input
                type="checkbox"
                name="ProfileColors"
                value="Blue"
                checked={formData.ProfileColors.includes("Blue")}
                onChange={handleModalInputChange}
              />{" "}
              Blue
            </label>
            <label>
              <input
                type="checkbox"
                name="ProfileColors"
                value="Red"
                checked={formData.ProfileColors.includes("Red")}
                onChange={handleModalInputChange}
              />{" "}
              Red
            </label>
            <label>
              <input
                type="checkbox"
                name="ProfileColors"
                value="Default"
                checked={formData.ProfileColors.includes("Default")}
                onChange={handleModalInputChange}
              />{" "}
              Default
            </label>
          </label>

          <div className="modal-groupbuttons">
            <button className="modal-button" onClick={closeModal}>
              Close Modal
            </button>
            <button className="modal-button2" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
