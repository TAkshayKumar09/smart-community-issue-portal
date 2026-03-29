import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Card, Badge } from "react-bootstrap";


function MyIssues() {
  const [issues, setIssues] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Fetch issues of logged-in user (TOKEN BASED)
  const fetchMyIssues = () => {
    axios
      .get(
        "https://smart-community-issue-portal.onrender.com/MyIssues/",
        { withCredentials: true }, // ✅ IMPORTANT
      )
      .then((res) => {
        setIssues(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchMyIssues();
  }, []);

  // 🔍 Filter + Search (SAFE)
  const filteredIssues = Array.isArray(issues)
    ? issues.filter((issue) => {
        const title = issue.title || "";
        const status = issue.status || "Pending"; // ✅ default

        const matchesSearch = title
          .toLowerCase()
          .includes(search.toLowerCase());

        const matchesFilter = filter === "All" ? true : status === filter;

        return matchesSearch && matchesFilter;
      })
    : [];

  // 🎨 Status color
  const getStatusColor = (status) => {
    if (status === "Resolved") return "success";
    if (status === "In Progress") return "primary";
    return "warning";
  };

  return (
    <>
      <Container style={{ marginTop: "100px" }}>
        {/* 🔹 Header */}
        <div
          style={{
            background: "#f8f9fa",
            padding: "20px",
            borderRadius: "15px",
            marginBottom: "30px",
          }}
        >
          <Row>
            <Col md={4}>
              <h4>📋 My Issues</h4>
            </Col>

            <Col md={5}>
              <Form.Control
                type="text"
                placeholder="Search issues..."
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>

            <Col md={3}>
              <Form.Select onChange={(e) => setFilter(e.target.value)}>
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </Form.Select>
            </Col>
          </Row>
        </div>

        {/* 🔹 Issues List */}
        {filteredIssues.length === 0 ? (
          <p>No issues found</p>
        ) : (
          filteredIssues.map((issue) => {
            const status = issue.status || "Pending"; // ✅ fallback

            return (
              <Card
                key={issue.id}
                style={{
                  marginBottom: "20px",
                  borderRadius: "15px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                }}
              >
                <Card.Body>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <h5>{issue.title}</h5>

                    <Badge bg={getStatusColor(status)} style={{fontSize: "17px"}}>{status}</Badge>
                  </div>

                  <p style={{ marginTop: "10px" }}>{issue.description}</p>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      color: "gray",
                    }}
                  >
                    <div>
                      📂 {issue.category} | 📍 {issue.location}
                    </div>

                    {issue.image && (
                      <img
                        src={issue.image}
                        alt="issue"
                        style={{
                          width: "80px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    )}
                  </div>
                </Card.Body>
              </Card>
            );
          })
        )}
      </Container>
    </>
  );
}

export default MyIssues;
