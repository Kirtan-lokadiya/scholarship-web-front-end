
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { MDBCol } from "mdbreact";
import Button from 'react-bootstrap/Button';
import { Sidebar } from "react-pro-sidebar";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import '../components/login.css';
import ListingTag from './listing_tag';
// import Sidebar from "./Sidebar"; 


function BasicExample() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        category: "",
        state: "",
        academicClass: "",
        type: "",
        organizationType: "",
    });
    const [filteredScholarships, setFilteredScholarships] = useState([]); // Define filteredScholarships state variable


    const fetchScholarships = async () => {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const response = await fetch(`http://localhost:8080/allscholarship?${queryParams}`);
            const data = await response.json();
            setFilteredScholarships(data);
        } catch (error) {
            console.error("Error fetching scholarships:", error);
        }
    };

    useEffect(() => {
        fetchScholarships();
    }, [filters]);

    const handleFilterChange = (filterName, value) => {
        setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
    };
    const handleSearchChange = (value) => {
        setSearchQuery(value);
    };

    return (
        <Container fluid>
            <Row>
                <Col lg={3} className="p-0">
                    <Sidebar className="sticky-top bg-light border-right">
                        <div className="bg-white p-4">
                            <div className="d-flex justify-content-between mb-4">
                                <div className="d-flex gap-2 align-items-center">
                                    <span className="text-base text-blue_gray-900">
                                        Filter
                                    </span>
                                </div>
                            </div>
                            <hr className="bg-blue_gray-50 mb-4" />
                            <div className="d-flex flex-column gap-4 mb-5">
                                <div className="bg-white p-4">
                                    <div className="d-flex flex-column gap-4">
                                        <div className="d-flex justify-content-between">
                                            <span className="mt-1 text-base text-blue_gray-900">
                                                Category
                                            </span>
                                        </div>
                                        <select
                                            className="form-select"
                                            onChange={(e) => handleFilterChange("category", e.target.value)}
                                        >
                                            <option value="All">All</option>
                                            <option value="SC/ST/OBC">SC/ST/OBC</option>
                                            <option value="Girls">Girls</option>
                                            <option value="Physically Disabled">Physically Disabled</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="bg-white p-4">
                                    <div className="d-flex justify-content-between">
                                        <span
                                            className="mt-1 text-base text-blue_gray-900"
                                        >
                                            State
                                        </span>

                                    </div>
                                    <select
                                        className="form-select"
                                        onChange={(e) => handleFilterChange("state", e.target.value)}
                                    >
                                        <option value="All Over India">All Over India</option>
                                        <option value="Andhra radesh">Andhra Pradesh</option>
                                        <option value="Andaman and Nicobar">Andaman and Nicobar</option>
                                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                        <option value="Assam">Assam</option>
                                        <option value="Bihar">Bihar</option>
                                        <option value="Chandigarh">Chandigarh</option>
                                        <option value="Chhattisgarh">Chhattisgarh</option>
                                        <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                                        <option value="Delhi">Delhi</option>
                                        <option value="Goa">Goa</option>
                                        <option value="Gujarat">Gujarat</option>
                                        <option value="Haryana">Haryana</option>
                                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                        <option value="Jharkhand">Jharkhand</option>
                                        <option value="Ladakh">Ladakh</option>
                                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                                        <option value="Maharashtra">Maharashtra</option>
                                        <option value="Manipur">Manipur</option>
                                        <option value="Meghalaya">Meghalaya</option>
                                        <option value="Odisha">Odisha</option>
                                        <option value="Puducherry">Puducherry</option>
                                        <option value="Rajasthan">Rajasthan</option>
                                        <option value="Tripura">Tripura</option>
                                        <option value="Uttarakhand">Uttarakhand</option>
                                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                                        <option value="WestBengal">West Bengal</option>
                                        {/* Add more options based on your data */}
                                    </select>
                                </div>

                                {/* Current Class Section */}
                                <div className="bg-white p-4">
                                    <div className="d-flex justify-content-between">
                                        <span
                                            className="mt-1 text-base text-blue_gray-900"
                                        >
                                            Current Class
                                        </span>

                                    </div>
                                    <select
                                        className="form-select"
                                        onChange={(e) => handleFilterChange("academicClass", e.target.value)}
                                    >
                                        <option value="All Class">All</option>
                                        <option value="Class 9 & 10">Class 9 & 10</option>
                                        <option value="Class 11 & 12">Class 11 & 12</option>
                                        <option value="Graduation">Graduation</option>
                                        <option value="Post Graduation">Post Graduation</option>
                                        <option value="PhD/Post Doctoral">PhD/Post Doctoral</option>
                                        {/* Add more options based on your data */}
                                    </select>
                                </div>

                                {/* Type Section */}
                                <div className="bg-white p-4">
                                    <div className="d-flex justify-content-between">
                                        <span
                                            className="mt-1 text-base text-blue_gray-900"
                                        >
                                            Type
                                        </span>

                                    </div>
                                    <select
                                        className="form-select"
                                        onChange={(e) => handleFilterChange("type", e.target.value)}
                                    >
                                        <option value="For All">For All</option>
                                        <option value="Income Based">Income Based</option>
                                        <option value="Merit Based">Merit Based</option>
                                        <option value="Cultural Talent">Cultural Talent</option>
                                        <option value="Visual Art">Visual Art</option>
                                        <option value="Sports Talent">Sports Talent</option>
                                        <option value="Literary Art">Literary Art</option>
                                        {/* Add more options based on your data */}
                                    </select>
                                </div>

                                {/* Organization Type Section */}
                                <div className="bg-white p-4">
                                    <div className="d-flex justify-content-between">
                                        <span
                                            className="mt-1 text-base text-blue_gray-900"
                                        >
                                            Organization Type
                                        </span>

                                    </div>
                                    <select
                                        className="form-select"
                                        onChange={(e) => handleFilterChange("organizationType", e.target.value)}
                                    >
                                        <option value="Private">Private</option>
                                        <option value="Government">Government</option>
                                        <option value="NGO">NGO</option>
                                        {/* Add more options based on your data */}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </Sidebar>
                </Col>
                <Col lg={9} className="p-0">
                    <Navbar expand="lg" className="bg-body-tertiary">
                        <Container>
                            {/* <Navbar.Brand href="#home">Scholarship</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="#home">Home  </Nav.Link>
                                    <MDBCol md="250">
                                        {/* <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Search Scholarship"
                                            aria-label="Search"
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                        /> */}
                                    </MDBCol>
                                </Nav>
                                <Link to="/signin">
                                    <Button className="" variant="secondary" style={{ marginRight: '0%' }}>
                                        Admin Login
                                    </Button>
                                </Link>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <ListingTag filters={filters} searchQuery={searchQuery} scholarships={filteredScholarships} />
                </Col>
            </Row>
        </Container>
    );
}

export default BasicExample;




