

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const [scholarshipDetails, setScholarshipDetails] = useState(null);

  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    // Fetch scholarship details based on the ID
    fetch(`http://localhost:8080/allscholarship/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        if (data) {
          console.log("Fetched scholarship details:", data);
          setScholarshipDetails(data);
        } else {
          console.error("Scholarship with ID not found");
        }
      })
      .catch(error => {
        console.error("Error fetching scholarship details:", error);
      });
  }, [id]);

  if (!scholarshipDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white shadow-md p-4 rounded-md">
      <h3 className="text-lg font-semibold">{scholarshipDetails.scholarship_name}</h3>
      <p className="text-gray-500">About Scholarship: {scholarshipDetails.about_scholarship}</p>
      <p className="text-gray-500">Eligibility: {scholarshipDetails.eligibility}</p>
      <p className="text-gray-500">Documents Required: {scholarshipDetails.documentsRequired}</p>
      <p className="text-gray-500">Category: {scholarshipDetails.category}</p>
      <p className="text-gray-500">Academic Class: {scholarshipDetails.academicClass}</p>
      <p className="text-gray-500">Duration: {formatDate(scholarshipDetails.sinceDate)} To {formatDate(scholarshipDetails.tillDate)}</p>
      <p className="text-gray-500">State: {scholarshipDetails.state}</p>
      <p className="text-gray-500">Organization Type: {scholarshipDetails.organizationType}</p>
      <p className="text-gray-500">Based On Scholarship: {scholarshipDetails.BasedOnScholarship}</p>
      <p className="text-gray-500">Award: ${scholarshipDetails.awardAmount}</p>
      <p className="text-gray-500">Active Months: {scholarshipDetails.activeMonths.join(", ")}</p>
      <p className="text-gray-500">URL: <a href={scholarshipDetails.url}>{scholarshipDetails.url}</a></p>
    </div>
  );
};

export default ScholarshipDetails;
