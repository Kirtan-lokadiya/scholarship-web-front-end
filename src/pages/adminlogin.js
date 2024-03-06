


import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap"; // Import Alert from react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { Line } from '../components/Line'; 
import { Text } from '../components/Text'; 
import { useNavigate } from "react-router-dom";
import './SignIn.css'; // Import custom CSS file

const Sign_in = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false); // State to manage alert visibility
  const [alertMessage, setAlertMessage] = useState(""); // State to manage alert message
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log("Login successful:", responseData);
  
        // Save the token to local storage
        localStorage.setItem("jwtToken", responseData.token);
  
        // You can handle successful login, such as redirecting to another page
        navigate('/adminform');
      } else {
        console.error("Login failed:", response.statusText);
        // Set alert message for failed login
        setAlertMessage("Login failed. Please check your credentials and try again.");
        setShowAlert(true); // Show the alert
      }
    } catch (error) {
      console.error("Error:", error);
      // Set alert message for error
      setAlertMessage("An error occurred. Please try again later.");
      setShowAlert(true); // Show the alert
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="signin-container">
            <header className="signin-header">
              <Link to="/">
                <Text className="home-link" size="txtGilroySemiBold16">Home</Text>
              </Link>
              <Link to="/signup">
                <Button className="signup-button" variant="fill">Sign up</Button>
              </Link>
            </header>
            <div className="signin-content">
              {showAlert && ( // Render the Alert component if showAlert is true
                <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                  {alertMessage}
                </Alert>
              )}
              <Text className="signin-title" size="txtGilroySemiBold32">Sign in as an Admin</Text>
              <Form>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                  />
                </Form.Group>
                <Button className="login-button" variant="fill" onClick={handleLogin}>Log in</Button>
                <div className="signin-divider">
                  <Line />
                  <span>Or continue with</span>
                  <Line />
                </div>
                <div className="signin-social">
                  <Button className="google-button">Sign in with Google</Button>
                  <Button className="facebook-button">Sign in with Facebook</Button>
                  <Button className="linkedin-button">Sign in with Linkedin</Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sign_in;