import React, { useEffect, useState } from "react";

const FromApprovalWorkflowPage = () => {
  const [pendingSignups, setPendingSignups] = useState([]);

  useEffect(() => {
    fetchPendingSignups();
  }, []);

  const fetchPendingSignups = async () => {
    try {
      const response = await fetch("http://localhost:8080/allsignup");
      if (response.ok) {
        const data = await response.json();
        setPendingSignups(data);
      } else {
        console.error("Failed to fetch pending signups:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching pending signups:", error);
    }
  };

  const handleApproveReject = async (adminId, approvalStatus) => {
    try {
      const response = await fetch(`http://localhost:8080/approval/${adminId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ approvalStatus }),
      });

      if (response.ok) {
        console.log("Approval status updated successfully");
        fetchPendingSignups();
      } else {
        console.error("Failed to update approval status:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating approval status:", error);
    }
  };

  return (
    <div className="container-fluid bg-gray-50 py-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          {pendingSignups && pendingSignups.length > 0 ? (
            pendingSignups.map((signup) => (
              <div key={signup._id} className="card mb-3">
                <div className="card-body d-flex align-items-center">
                                    <div>
                    <h5 className="card-title">{signup.first_name} {signup.last_name}</h5>
                    <p className="card-text">{signup.organization_name}</p>
                  </div>
                  <div className="ms-auto">
                    <p className="card-text bg-primary text-white px-2 py-1 rounded">{signup.signupDate}</p>
                    <div className="btn-group">
                      <button
                        onClick={() => handleApproveReject(signup._id, "Approve")}
                        className="btn btn-success me-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleApproveReject(signup._id, "Reject")}
                        className="btn btn-danger"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No pending signups</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FromApprovalWorkflowPage;
