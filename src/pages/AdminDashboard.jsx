import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Button, Badge, Row, Col, Dropdown } from "react-bootstrap";





function AdminDashboard() {
  const [filter, setFilter] = useState("All");
  const [issues, setIssues] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [activePanel, setActivePanel] = useState("create");
  // "create" | "view"
  const [email, setEmail] = useState("");

  // 🔥 Fetch all issues
  const fetchIssues = () => {
    axios
      .get("https://smart-community-issue-portal.onrender.com/all_issues/")
      .then((res) => setIssues(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  // 🔥 Delete Issue
  const deleteIssue = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/issues/delete/${id}/`).then(() => {
      alert("Deleted");
      fetchIssues();
    });
  };

  // 🔥 Update Status
  const updateStatus = (id, status) => {
    const data = new FormData();
    data.append("id", id);
    data.append("status", status);

    axios
      .post(
        "https://smart-community-issue-portal.onrender.com/update_issue/",
        data, //{withCredentials: true}
      )
      .then(() => {
        alert("Updated");
        fetchIssues();
      })
      .catch((err) => {
        console.error(err);
        alert("Update failed");
      });
  };

  // 🎨 Status Color
  const getColor = (status) => {
    if (status === "Resolved") return "success";
    if (status === "In Progress") return "primary";
    return "warning";
  };

  const filteredIssues =
    filter === "All"
      ? issues
      : issues.filter((issue) => issue.status === filter);

  const createAdmin = () => {
    const email = prompt("Enter user email");

    if (!email) return;

    const data = new FormData(); // 🔥 FormData
    data.append("email", email);

    axios
      .post(
        "https://smart-community-issue-portal.onrender.com/create_admin/",
        data,
        { withCredentials: true },
      )
      .then(() => {
        alert("User is now admin ✅");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to make admin");
      });
  };

  const fetchAdmins = () => {
    axios
      .get("https://smart-community-issue-portal.onrender.com/view_admins/", {
        withCredentials: true,
      })
      .then((res) => {
        setAdmins(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Container style={{ marginTop: "100px", maxWidth: "1500px" }}>
      <h3>🛠 Admin Dashboard</h3>

      <Row>
        {/* 🔹 LEFT SIDEBAR */}
        <Col md={3}>
          <div
            style={{
              borderRight: "1px solid #ddd",
              paddingRight: "15px",
              background: "whitesmoke",
              height: "500px",
            }}
          >
            <Button
              variant="dark"
              className="mb-2 w-100"
              onClick={() => setActivePanel("create")}
            >
              <i class="bi bi-plus-lg"></i> Create Admin
            </Button>

            <Button
              variant="secondary"
              className="w-100"
              onClick={() => {
                setActivePanel("view");
                fetchAdmins();
              }}
            >
              <i class="bi bi-people-fill"></i> View Admins
            </Button>

            {/* ✅ CREATE ADMIN FORM */}
            {activePanel === "create" && (
              <div style={{ marginTop: "20px" }}>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="form-control mb-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Button
                  variant="success"
                  className="w-100"
                  onClick={() => {
                    const data = new FormData();
                    data.append("email", email);

                    axios
                      .post(
                        "https://smart-community-issue-portal.onrender.com/create_admin/",
                        data,
                        { withCredentials: true },
                      )
                      .then(() => {
                        alert("Admin created ✅");
                        setEmail("");
                      })
                      .catch(() => alert("Failed"));
                  }}
                >
                  Make Admin
                </Button>
              </div>
            )}

            {/* ✅ VIEW ADMINS */}
            {activePanel === "view" && (
              <div style={{ marginTop: "20px" }}>
                {admins.length === 0 ? (
                  <p>No admins</p>
                ) : (
                  admins.map((admin) => (
                    <div
                      key={admin.id}
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      <strong>
                        {admin.id}.{admin.name}
                      </strong>
                      <br />
                      <small><b>Email:</b>{admin.email}</small>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </Col>

        {/* 🔹 RIGHT SIDE (ISSUES) */}
        <Col md={9}>
          {/* 🔥 STATUS FILTER */}
          <div style={{ marginBottom: "15px" }}>
            <select
              className="form-control"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{ border: "2px solid #773030" }}
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          {/* 🔹 ISSUES TABLE */}
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Image</th>
                <th>Location</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredIssues.map((issue) => (
                <tr key={issue.id}>
                  <td>{issue.id}</td>
                  <td>{issue.title}</td>
                  <td>{issue.category}</td>

                  <td>
                    {issue.image && (
                      <img
                        src={issue.image}
                        alt="issue"
                        style={{ width: "80px", borderRadius: "5px" }}
                      />
                    )}
                  </td>

                  <td>{issue.location}</td>

                  {/* 🔥 SCROLLABLE DESCRIPTION */}
                  <td>
                    <div
                      style={{
                        maxHeight: "80px",
                        overflowY: "auto",
                        maxWidth: "200px",
                      }}
                    >
                      {issue.description}
                    </div>
                  </td>

                  <td>
                    <Badge bg={getColor(issue.status || "Pending")} style={{marginTop: "20px", fontSize: "14px"}}>
                      {issue.status || "Pending"}
                    </Badge>
                  </td>

                  <td>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => updateStatus(issue.id, "In Progress")}
                    >
                      In Progress
                    </Button>

                    <Button
                      size="sm"
                      variant="success"
                      style={{ marginLeft: "5px" }}
                      onClick={() => updateStatus(issue.id, "Resolved")}
                    >
                      Resolve
                    </Button>

                    <Button
                      size="sm"
                      variant="danger"
                      style={{ marginLeft: "5px", marginTop: "5px"}}
                      onClick={() => deleteIssue(issue.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;
