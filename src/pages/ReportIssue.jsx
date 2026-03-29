import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
  Badge,
} from "react-bootstrap";
import dogImage from "../assets/Dogs.jpg"
import unsortedWaste from "../assets/unsorted waste dump.jpg"
import Roads from "../assets/Roads.jpg"
import streetLamp from "../assets/street-lamp.avif"
import Toilets from "../assets/Toilets.png"
import waterLeakage from "../assets/waterLeakage.avif"
import garbageCollection from "../assets/garbageCollection.jpg"
import Park from "../assets/Outdoor-Gym-Area.jpg"


export default function ReportIssue() {
  // get all users issues
  const [issues, setIssues] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [show, setShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isLogged = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(isLogged === "true");
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    description: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // 🔥 Submit Issue
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("location", formData.location);
    data.append("description", formData.description);
    data.append("image", image);

    try {
      await axios.post(
        "https://smart-community-issue-portal.onrender.com/create_issue/",
        data,
        { withCredentials: true },
      );

      alert("Issue submitted successfully");

      // reset form
      setFormData({
        title: "",
        category: "",
        location: "",
        description: "",
      });
      setImage(null);

      // 🔥 refresh issues instantly
      fetchIssues();
    } catch (error) {
      console.error(error);
      alert("Error submitting issue");
    }
  };

  const categories = [
    {
      title: "Animal Rescue",
      description: "Report injured or stray animals for immediate help.",
      image:
        dogImage,
    },
    {
      title: "Illegal Dumping",
      description: "Help keep your area clean by reporting waste dumping.",
      image:
        unsortedWaste,
    },
    {
      title: "Infrastructure",
      description: "Report road damage, potholes, and public facility issues.",
      image:
        Roads,
    },
    {
      title: "Public Toilets",
      description: "Report unclean or damaged public toilets.",
      image:
        Toilets,
    },
    {
      title: "Water Leakage",
      description: "Report water wastage and pipe leakage problems.",
      image:
        waterLeakage,
    },
    {
      title: "Street Lights",
      description: "Report non-working or damaged street lights.",
      image:
        streetLamp,
    },
    {
      title: "Garbage Collection",
      description: "Report missed garbage pickups in your area.",
      image:
        garbageCollection,
    },
    {
      title: "Park Maintenance",
      description: "Report issues in parks like broken benches or lights.",
      image:
        Park,
    },
  ];

  const cardStyle = {
    background: "#f9f9f9",
    padding: "20px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    transition: "0.3s",
  };

  const imgStyle = {
    width: "100%",
    height: "140px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "10px",
  };

  // 🔥 Fetch ALL issues (no email filter)
  const fetchIssues = () => {
    axios
      .get("https://smart-community-issue-portal.onrender.com/all_issues/")
      .then((res) => {
        setIssues(res.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchIssues(); // ✅ clean reuse
  }, []);

  // 🔍 Search + Filter
  const filteredIssues = issues.filter((issue) => {
    const matchesSearch = issue.category
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter = filter === "All" ? true : issue.status === filter;

    return matchesSearch && matchesFilter;
  });

  // 🎨 Status Color
  const getStatusColor = (status) => {
    if (status === "Resolved") return "success";
    if (status === "In Progress") return "primary";
    return "warning";
  };

  return (
    <>

      <Container fluid style={{ marginTop: "100px" }}>
        <Row>
          {/* 🔹 LEFT SIDE → Report Form */}
          <Col md={8}>
            <div
              style={{
                background: "#fff",
                padding: "25px",
                borderRadius: "15px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
              }}
            >
              <h4>📋 Report a New Issue</h4>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Issue Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="e.g. Broken street light near gate"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Category</Form.Label>
                      <Form.Select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option>Electricity Problems</option>
                        <option>Water Leakage</option>
                        <option>Illegal Dumping</option>
                        <option>Animal Rescue</option>
                        <option>Infrastructure Issues</option>
                        <option>Public Toilet Maintenance</option>
                        <option>Street Light Issues</option>
                        <option>Park Maintenance</option>
                        <option>Garbage Collection</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Upload Image</Form.Label>
                      <Form.Control type="file" onChange={handleImageChange} />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mt-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    name="location"
                    value={formData.location}
                    placeholder="e.g. Block A - Main Road"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    placeholder="Describe the issue in detail..."
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Form.Group>

                <div style={{ textAlign: "right", marginTop: "15px" }}>
                  <Button type="submit">Submit</Button>
                </div>
              </Form>
            </div>
          </Col>

          {/* 🔹 RIGHT SIDE → All Issues */}
          <Col md={4} style={{ boxShadow: "0px 5px 10px rgba(10, 7, 7, 0.1)" }}>
            {/* Header */}
            <div
              style={{
                background: "#d8e6f4",
                padding: "15px",
                borderRadius: "15px",
                marginBottom: "15px",
                position: "sticky",
                top: "10px",
                zIndex: 1,
                // border: "1px dashed black"
              }}
            >
              <Row
                className="align-items-center"
                style={{ position: "sticky", top: "80px" }}
              >
                <Col md={4}>
                  <h6 style={{ margin: 0 }}>🌍 All Issues</h6>
                </Col>

                <Col md={5}>
                  <Form.Control
                    size="sm"
                    placeholder="Search..."
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Col>

                <Col md={3}>
                  <Form.Select
                    size="sm"
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </Form.Select>
                </Col>
              </Row>
            </div>

            {/* 🔥 Scrollable Issues Box */}
            <div
              style={{
                maxHeight: "425px",
                overflowY: "auto",
                paddingRight: "5px",
              }}
            >
              {filteredIssues.length === 0 ? (
                <p>No issues found</p>
              ) : (
                filteredIssues.map((issue) => (
                  <Card
                    key={issue.id}
                    style={{
                      marginBottom: "12px",
                      borderRadius: "12px",
                      boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
                      transition: "0.2s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.02)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    <Card.Body style={{ padding: "12px" }}>
                      {/* Title + Status */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <h6 style={{ margin: 0 }}>
                          {issue.title || "No Title"}
                        </h6>

                        <Badge bg={getStatusColor(issue.status)}>
                          {issue.status}
                        </Badge>
                      </div>

                      {/* Description */}
                      <p style={{ fontSize: "13px", marginTop: "6px" }}>
                        {issue.description}
                      </p>

                      {/* Bottom */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          fontSize: "12px",
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
                              width: "60px",
                              height: "45px",
                              objectFit: "cover",
                              borderRadius: "6px",
                            }}
                          />
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                ))
              )}
            </div>
          </Col>
        </Row>
      </Container>

      {/* Static contnet */}
      <div
        style={{ padding: "50px", background: "#ffffff", marginTop: "20px" }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
          Explore All Categories
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* Category Card */}
          {categories.map((cat, index) => (
            <div key={index} style={cardStyle}>
              <img src={cat.image} alt={cat.title} style={imgStyle} />
              <h5>{cat.title}</h5>
              <p>{cat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
