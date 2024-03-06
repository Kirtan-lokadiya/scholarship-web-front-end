

import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';



const SignUpPage = () => {
  const { register, handleSubmit } = useForm();

  const handleSave = async (data) => {
    try {
      // Make an HTTP POST request to your signup API
      const response = await fetch("http://localhost:8080/admin/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Handle the response (success or error)
      if (response.ok) {
        const responseData = await response.json();
        console.log("Signup successful:", responseData);
      } else {
        console.error("Signup failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Link to="/" className="text-blue_gray-900">Home</Link>
            </Nav>
            <Nav className="me-auto">
            <Link to="/signin" className="text-gray-900">Sign in</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center mb-4">Create Account</h2>
            <form onSubmit={handleSubmit(handleSave)}>
              <div className="mb-3">
                <label htmlFor="first_name" className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="first_name"
                  {...register("first_name")}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="last_name" className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="last_name"
                  {...register("last_name")}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="organization_name" className="form-label">Organization Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="organization_name"
                  {...register("organization_name")}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  {...register("email")}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Set Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  {...register("password")}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="institute_type" className="form-label">Institute Type</label>
                <input
                  type="text"
                  className="form-control"
                  id="institute_type"
                  {...register("institute_type")}
                />
              </div>
              <button
                className="btn btn-primary w-100"
                type="submit"
              >
                Save
              </button>
              
            </form>

          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
