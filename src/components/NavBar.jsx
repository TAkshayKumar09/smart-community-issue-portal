import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ProfilePopup from "./ProfilePopup";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";

export function NavBar({ showLogin, setShowLogin, isLoggedIn, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const [showProfile, setShowProfile] = useState(false);

  const [isRegister, setIsRegister] = useState(false);

  const [userName, setUserName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
      setUserName(name);
    }
  }, []);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // VALIDATIONS
    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Enter a valid email");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    setLoading(true); // start spinner

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const res = await axios.post(
        "https://smart-community-issue-portal.onrender.com/login/",
        formData,
        { withCredentials: true }, // needed for cookies
      );

      const user = res.data.user;

      setIsLoggedIn(true);
      // store user
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("email", user.email);
      localStorage.setItem("name", user.name);
      localStorage.setItem("token", "true");

      // setIsLoggedIn(true);
      setShowLogin(false);
      setUserName(user.name); // 🔥 instant update
      alert("Login success");

      // SAVE EMAIL
      localStorage.setItem("email", email);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("isLoggedIn", "true"); // ADD HERE
      localStorage.setItem("name", user.name);

      // ADMIN REDIRECT LOGIC
      if (user.is_admin) {
        navigate("/admin"); // admin page
      } else {
        navigate("/"); // normal home
      }
      // } catch (err) {
      //   console.error(err.response?.data); // see real error
      //   alert("Login failed");
      // } finally {
      //   setLoading(false);
      // }
    } catch (err) {
      console.error(err.response?.data);

      const errorMsg = err.response?.data?.error;

      if (errorMsg === "Invalid credentials") {
        alert("Invalid email or password");
      } else {
        alert("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    // VALIDATIONS
    if (!name || !phone || !email || !password) {
      alert("All fields are required");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Invalid email format");
      return;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
      alert("Phone must be 10 digits");
      return;
    }

    try {
      const data = new FormData();

      data.append("name", name);
      data.append("phone", phone);
      data.append("email", email);
      data.append("password", password);

      await axios.post(
        "https://smart-community-issue-portal.onrender.com/register/",
        data,
      );

      alert("Registered successfully");
      setIsRegister(false); // go back to login
    } catch (error) {
      const msg = error.response?.data?.error;
      if (msg === "User already exists. Please login.") {
        alert(msg);

        // 🔥 switch to login
        setIsRegister(false);
      } else {
        alert("Registration failed");
      }
    }
  };

  const cardStyle = {
    width: "250px",
    padding: "20px",
    borderRadius: "10px",
    background: "#f5f5f5",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  };

  const boxStyle = {
    background: "white",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    textAlign: "center",
    transition: "0.3s",
    cursor: "pointer",
  };

  const imgStyle = {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "15px",
  };

  const handleProtectedNavigation = (path) => {
    if (!isLoggedIn) {
      setShowLogin(true); // open login modal
    } else {
      navigate(path); // go to page
    }
  };

  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        bg="dark"
        data-bs-theme="dark"
        fixed="top"
      >
        <Container fluid>
          <Navbar.Brand
            href="#"
            style={{ color: "#de7845", fontSize: "30px", fontStyle: "italic" }}
          >
            Smart Community Issue Portal
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link
                onClick={() => handleProtectedNavigation("/reportissue")}
              >
                Report Issue
              </Nav.Link>
              <Nav.Link onClick={() => handleProtectedNavigation("/myissues")}>
                My Issues
              </Nav.Link>
            </Nav>

            {/* ADD HERE (RIGHT SIDE OF NAVBAR) */}
            {isLoggedIn ? (
              <div style={{ position: "relative", marginRight: "20px" }}>
                <span
                  style={{
                    fontSize: "22px",
                    cursor: "pointer",
                    color: "white",
                  }}
                  onClick={() => setShowProfile(!showProfile)}
                >
                  <i
                    className="bi bi-person-square"
                    style={{
                      fontSize: "24px",
                      cursor: "pointer",
                      color: "white",
                    }}
                    onClick={() => setShowProfile(!showProfile)}
                  ></i>
                  <span
                    style={{
                      color: "white",
                      fontSize: "18px",
                      marginLeft: "5px",
                      fontStyle: "italic",
                    }}
                  >
                    {userName || "User"}
                  </span>
                </span>

                {showProfile && (
                  <ProfilePopup
                    setIsLoggedIn={setIsLoggedIn}
                    setShowProfile={setShowProfile}
                  />
                )}
              </div>
            ) : (
              <Button
                onClick={() => setShowLogin(true)}
                style={{ marginRight: "20px" }}
              >
                Login/Register
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal show={showLogin} onHide={() => setShowLogin(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {isRegister ? (
            <>
              <Form.Group className="mb-2">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter phone"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Group>
            </>
          ) : null}

          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          {/* Toggle Text */}
          <p
            style={{ marginTop: "10px", cursor: "pointer", color: "blue" }}
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister
              ? "Already have an account? Login"
              : "Don't have an account? Create one"}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogin(false)}>
            Close
          </Button>

          {isRegister ? (
            <Button type="button" onClick={handleRegister} disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" /> Registering...
                </>
              ) : (
                "Register"
              )}
            </Button>
          ) : (
            <Button type="button" onClick={handleLogin} disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" /> Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
