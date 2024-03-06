// EditScholarshipForm.js
import React, { useState, useEffect } from "react";

const EditScholarshipForm = () => {
  const [formData, setFormData] = useState({
    // Your scholarship form fields here
  });

  useEffect(() => {
    // Fetch scholarship data based on the token and update formData
    const fetchScholarshipData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await fetch("http://localhost:8080/allscholarship", {
          method: "GET", // Assuming your API supports GET for fetching scholarship data
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const scholarshipData = await response.json();
          setFormData(scholarshipData);
        } else {
          console.error("Failed to fetch scholarship data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchScholarshipData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch("http://localhost:8080/updateScholarshipById", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle success, e.g., redirect or show success message
      } else {
        console.error("Failed to update scholarship:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Edit Scholarship</h2>
      <form onSubmit={handleSubmit}>
        {/* Your scholarship form fields with pre-filled data */}
        <button type="submit">Update Scholarship</button>
      </form>
    </div>
  );
};

export default EditScholarshipForm;
