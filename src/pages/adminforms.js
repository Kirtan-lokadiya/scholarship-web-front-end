import React, { useState } from "react";

const CustomFormPage = () => {
  const [formData, setFormData] = useState({
    scholarship_name: "",
    about_scholarship: "",
    eligibility: "",
    documentsRequired: "",
    category: "",
    academicClass: "",
    sinceDate: "",
    tillDate: "",
    state: "",
    organizationType: "",
    BasedOnScholarship: "",
    awardAmount: 0,
    activeMonths: [],
    url: ""
  });

  const handleChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleActiveMonthsChange = (selectedMonths) => {
    setFormData((prevData) => ({
      ...prevData,
      activeMonths: selectedMonths,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("jwtToken");

      const response = await fetch("http://localhost:8080/addscholarship", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Scholarship created successfully:", responseData);
      } else {
        console.error("Failed to create scholarship:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const formFields = [
    "scholarship_name",
    "about_scholarship",
    "eligibility",
    "documentsRequired",
    "category",
    "academicClass",
    "sinceDate",
    "tillDate",
    "state",
    "organizationType",
    "BasedOnScholarship",
    "awardAmount",
    "activeMonths",
    "url"
  ];

  const categoryOptions = ["All","SC/ST/OBC", "Girls", "Physically Disabled"];
  const academicClassOptions = ["All", "Class 9 & 10", "Class 11 & 12", "Graduation", "Post Graduation", "PhD/Post Doctoral"];
  const stateOptions = ["All Over India", "Andhra Pradesh", "Andaman and Nicobar", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Ladakh", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Odisha", "Puducherry", "Rajasthan","Tripura",  "Uttarakhand", "Uttar Pradesh", "West Bengal"];
  const BasedOnScholarship = ["For All", "Income Based", "Merit Based", "Cultural Talent", "Visual Art", "Sports Talent", "Literary Art"];
  const organizationType = ["Private", "Government", "NGO"];
  const monthOptions = ["Always Open", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="text-center text-primary mb-4">Add Scholarship Form</h2>
          <form onSubmit={handleSubmit}>
            {formFields.map((fieldName) => (
              <div key={fieldName} className="mb-3">
                <label className="form-label text-primary">{fieldName.replace(/_/g, " ")}</label>
                {fieldName === "category" || fieldName === "academicClass" || fieldName === "state" || fieldName === "organizationType" || fieldName === "BasedOnScholarship" ? (
                  <select
                    name={fieldName}
                    value={formData[fieldName]}
                    onChange={(e) => handleChange(fieldName, e.target.value)}
                    className="form-select"
                  >
                    <option value="">Select {fieldName.replace(/_/g, " ")}</option>
                    {fieldName === "category" && categoryOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                    {fieldName === "academicClass" && academicClassOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                    {fieldName === "state" && stateOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                    {fieldName === "BasedOnScholarship" && BasedOnScholarship.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                    {fieldName === "organizationType" && organizationType.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                ) : fieldName === "about_scholarship" || fieldName === "eligibility" || fieldName === "documentsRequired" ? (
                  <textarea
                    name={fieldName}
                    placeholder={`Enter Your ${fieldName.replace(/_/g, " ")}`}
                    className="form-control"
                    value={formData[fieldName]}
                    onChange={(e) => handleChange(fieldName, e.target.value)}
                  />
                ) : fieldName === "activeMonths" ? (
                  <select
                    name={fieldName}
                    multiple
                    value={formData[fieldName]}
                    onChange={(e) => handleActiveMonthsChange(Array.from(e.target.selectedOptions, (option) => option.value))}
                    className="form-select"
                  >
                    <option value="" disabled>Select Active Months</option>
                    {monthOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    name={fieldName}
                    placeholder={`Enter Your ${fieldName.replace(/_/g, " ")}`}
                    className="form-control"
                    type={
                      fieldName === "awardAmount"
                        ? "number"
                        : fieldName === "sinceDate" || fieldName === "tillDate"
                          ? "date"
                          : fieldName === "url"
                            ? "url"
                            : "text"
                    }
                    value={formData[fieldName]}
                    onChange={(e) => handleChange(fieldName, e.target.value)}
                  />
                )}
              </div>
            ))}
            <button type="submit" className="btn btn-primary">
              Add Scholarship
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomFormPage;
