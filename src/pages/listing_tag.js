

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ShareButtons from "./ShareButtons";
import './listing_tags.css';

const ListingTag = ({ filters }) => {
  console.log(filters);
  const [scholarships, setScholarships] = useState({ live: [], upcoming: [], past: [] });
  const [activeSection, setActiveSection] = useState("live");
  const [searchQuery, setSearchQuery] = useState(""); // Define searchQuery state variable

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const queryParams = new URLSearchParams(filters).toString();

        const response = await fetch(`http://localhost:8080/allscholarship?${queryParams}`);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        const currentDate = new Date();
        const liveScholarships = [];
        const upcomingScholarships = [];
        const pastScholarships = [];
      


        data.forEach(scholarship => {
          const sinceDate = new Date(scholarship.sinceDate);
          const tillDate = new Date(scholarship.tillDate);

          if (currentDate >= sinceDate && currentDate <= tillDate) {
            liveScholarships.push(scholarship);
          } else if (currentDate < sinceDate) {
            upcomingScholarships.push(scholarship);
          } else if (currentDate > tillDate) {
            pastScholarships.push(scholarship);
          }
        });
        console.log("liveScholarships:", liveScholarships);
        console.log("upcomingScholarships:", upcomingScholarships);
        console.log("pastScholarships:", pastScholarships);

        setScholarships({ live: liveScholarships, upcoming: upcomingScholarships, past: pastScholarships });
      } catch (error) {
        console.error("Error fetching scholarships:", error);
      }
    };

    fetchScholarships();
  }, [filters]);

  const ScholarshipCard = ({ scholarship }) => {
    const { scholarship_name, awardAmount, sinceDate, tillDate, organizationType, _id } = scholarship;

    const formatDate = dateString => {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };

    const handleShareClick = () => {
      // Logic to show/hide share options
      console.log("Share button clicked");
    };

    let cardClassName = "card h-100";

    // Set border color based on organization type
    if (organizationType === "government") {
      cardClassName += " border-green";
    } else if (organizationType === "private") {
      cardClassName += " border-red";
    } else if (organizationType === "NGO") {
      cardClassName += " border-yellow";
    }

    return (
      <div className={cardClassName}>
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h3 className="card-title text-lg font-semiboAward: $d">{scholarship_name}</h3>
            <p className="card-text text-gray-500" ><b></b>{awardAmount}</p>
            <p className="card-text text-gray-500">
              Duration: {formatDate(sinceDate)} To {formatDate(tillDate)}
            </p>
            <p className="card-text text-gray-500">Organization Type: {organizationType}</p>
          </div>
          <div className="share-container">
            <ShareButtons />
          </div>
          <Link to={`/allscholarship/${_id}`} className="card-link btn btn-primary mt-2">
            View Details
          </Link>
        </div>
      </div>
    );
  };

  const populateCards = () => {
    // Access the correct array of scholarships based on activeSection
    const scholarshipsArray = scholarships[activeSection];

    // Sort scholarships by award amount before rendering
    const sortedScholarships = scholarshipsArray.sort((a, b) => b.awardAmount - a.awardAmount);

    // Filter scholarships based on searchQuery
    const filteredScholarships = sortedScholarships.filter(scholarship =>
      scholarship.scholarship_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredScholarships.map(scholarship => (
      <div key={scholarship.id} className="col-sm-4 mb-4">
        <ScholarshipCard scholarship={scholarship} />
      </div>
    ));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center mb-4">
        <button
          className={`btn mr-4 ${activeSection === "live" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setActiveSection("live")}
          style={{ margin: '0 4px' }} // Add margin style
        >
          Live Scholarships
        </button>
        <button
          className={`btn mr-4 ${activeSection === "upcoming" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setActiveSection("upcoming")}
          style={{ margin: '0 4px' }} // Add margin style
        >
          Upcoming Scholarships
        </button>
        <button
          className={`btn mr-4 ${activeSection === "past" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setActiveSection("past")}
          style={{ margin: '0 4px' }} // Add margin style
        >
          Past Scholarships
        </button>
      </div>

      <div className="row">
        {populateCards()}
      </div>
    </div>
  );
};

export default ListingTag;
