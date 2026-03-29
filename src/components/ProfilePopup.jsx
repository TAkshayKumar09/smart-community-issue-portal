import { useState, useEffect, useRef } from "react";
import { Card, Button, Form } from "react-bootstrap";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

function ProfilePopup({ setIsLoggedIn, setShowProfile }) {
  const [loading, setLoading] = useState(false);

  const [editMode, setEditMode] = useState(false);

  // ✅ get from backend (not localStorage)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const popupRef = useRef();

  // 🔥 Fetch user details from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "https://smart-community-issue-portal.onrender.com/userdetails/",
          { withCredentials: true },
        );

        setName(res.data.name);
        setEmail(res.data.email);
        setPhone(res.data.phone);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  // 🔥 Logout
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setShowProfile(false);
  };

  // 🔥 Update Profile
  const handleUpdate = async () => {
    // 🔥 VALIDATIONS

    if (!name || !email || !phone) {
      alert("All fields are required");
      return;
    }

    // email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Enter valid email");
      return;
    }

    // phone validation
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
      alert("Phone must be 10 digits");
      return;
    }

    // password validation (only if changing)
    if (newPassword || oldPassword || confirmPassword) {
      if (!oldPassword) {
        alert("Enter old password");
        return;
      }

      if (newPassword.length < 6) {
        alert("Password must be at least 6 characters");
        return;
      }

      if (newPassword !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
    }

    setLoading(true); // start spinner

    try {
      const data = new FormData();
      data.append("name", name);
      data.append("email", email);
      data.append("phone", phone);
      data.append("old_password", oldPassword);
      data.append("new_password", newPassword);

      await axios.post(
        "https://smart-community-issue-portal.onrender.com/updatedetails/",
        data,
        { withCredentials: true },
      );

      alert("Updated successfully");
      setEditMode(false);
    } catch (err) {
      console.error(err.response?.data);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 🔥 BACKDROP (click outside closes popup) */}
      <div
        onClick={() => setShowProfile(false)}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.2)",
          zIndex: 9999,
        }}
      />

      {/* 🔥 POPUP CARD */}
      <Card
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "fixed", // 🔥 change from absolute → fixed
          top: "70px",
          right: "20px",
          width: "300px",
          padding: "15px",
          zIndex: 10000,
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        }}
      >
        {/* Close button */}
        <span
          onClick={() => setShowProfile(false)}
          style={{
            position: "absolute",
            top: "10px",
            right: "12px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          <i class="bi bi-x-lg"></i>
        </span>

        {/* 👇 YOUR EXISTING CONTENT CONTINUES */}

        {!editMode ? (
          <>
            <h5>My Account</h5>

            <p>
              <b>Name:</b> {name}
            </p>
            <p>
              <b>Email:</b> {email}
            </p>
            <p>
              <b>Phone:</b> {phone}
            </p>

            <Button
              variant="dark"
              onClick={() => setEditMode(true)}
              style={{ marginBottom: "10px", width: "100%" }}
            >
              Update Details
            </Button>

            <Button
              variant="danger"
              onClick={handleLogout}
              style={{ width: "100%" }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <h5>Update Profile</h5>

            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="mb-2"
            />

            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="mb-2"
            />

            <Form.Control
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              className="mb-2"
            />

            <Form.Control
              type="password"
              placeholder="Old Password"
              onChange={(e) => setOldPassword(e.target.value)}
              className="mb-2"
            />

            <Form.Control
              type="password"
              placeholder="New Password"
              onChange={(e) => setNewPassword(e.target.value)}
              className="mb-2"
            />

            <Form.Control
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mb-2"
            />

            <Button variant="success" onClick={handleUpdate} disabled={loading}>
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" /> Saving...
                </>
              ) : (
                "Save Details"
              )}
            </Button>
          </>
        )}
      </Card>
    </>
  );
}

export default ProfilePopup;
