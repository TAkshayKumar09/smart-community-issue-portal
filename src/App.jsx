import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ReportIssue from "./pages/ReportIssue";
import MyIssues from "./pages/MyIssues";
import AdminDashboard from "./pages/AdminDashboard";
import { NavBar } from "./components/NavBar";
import { useState } from "react";

function App() {
  const [showLogin, setShowLogin] = useState(false);

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
