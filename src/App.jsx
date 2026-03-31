import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ReportIssue from "./pages/ReportIssue";
import MyIssues from "./pages/MyIssues";
import AdminDashboard from "./pages/AdminDashboard";
import { NavBar } from "./components/NavBar";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      if (localStorage.getItem("isLoggedIn") !== "true") return; // ✅ prevent loop

      localStorage.clear();
      setIsLoggedIn(false);
      setShowLogin(true);
    };

    window.addEventListener("logout", handleLogout);

    return () => window.removeEventListener("logout", handleLogout);
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true",
  );
  return (
    <>
      <NavBar
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <Routes>
        <Route
          path="/"
          element={<Home isLoggedIn={isLoggedIn} setShowLogin={setShowLogin} />}
        />
        <Route path="/reportissue" element={<ReportIssue />} />
        <Route path="/myissues" element={<MyIssues />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}
export default App;
