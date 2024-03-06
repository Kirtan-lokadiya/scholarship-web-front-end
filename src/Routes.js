import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/adminlogin";
import SignUp from "./pages/adminsignup";
import ScholarshipDetails from "./pages/scholardetails"; // Adjust the path accordingly
import NotFound from "./pages/NotFound";
import FromApprovalWorkflow from "./pages/approverpage";
import Adminforms from "./pages/adminforms";


const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/customform" element={<CustomForm />} /> */}
          <Route path="/fromapprovalworkflow" element={<FromApprovalWorkflow />} />
          <Route path="/allscholarship/:id" element={<ScholarshipDetails />} />
          <Route path="/adminform" element={<Adminforms />} />

        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
