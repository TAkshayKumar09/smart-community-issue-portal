import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import environmentImage from "../assets/world-environment-day-people-plant-trees-and-recycle-waste.jpg";
import dogImage from "../assets/Dogs.jpg";
import unsortedWaste from "../assets/unsorted waste dump.jpg";
import Roads from "../assets/Roads.jpg";

function Home({ isLoggedIn, setShowLogin }) {
  const navigate = useNavigate();

  const handleProtectedNavigation = (path) => {
    if (!isLoggedIn) {
      setShowLogin(true); // OR trigger navbar login
    } else {
      navigate(path);
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
  return (
    <div>
      <div
        style={{
          display: "flex",
          width: "100%",
          background: "whitesmoke",
          borderRadius: "10px",
          padding: "30px",
          color: "black",
          marginTop: "5%",
        }}
      >
        {/* LEFT SIDE */}
        <div style={{ flex: 1, paddingRight: "20px", marginTop: "110px" }}>
          <h1>Smart Community Issue Portal</h1>
          <p>
            <em>
              This platform helps citizens report and track local community
              issues such as garbage problems, water leakage, road damage, and
              more.
            </em>
          </p>

          <p>
            <em>
              Our goal is to create a smarter and cleaner city by connecting
              citizens with authorities through a simple and efficient system.
            </em>
          </p>

          {!isLoggedIn ? (
            <Button onClick={() => handleProtectedNavigation("/reportissue")}>
              Get Started
            </Button>
          ) : (
            <Button onClick={() => handleProtectedNavigation("/reportissue")}>
              Report Issue
            </Button>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <img
            src={environmentImage}
            alt="community"
            style={{
              width: "100%",
              maxWidth: "500px",
              borderRadius: "10px",
            }}
          />
        </div>
      </div>

      <div style={{ padding: "50px", background: "#f5f5f5" }}>
        <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
          Make Your Community Better
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* 1. Animal Rescue */}
          <div
            style={boxStyle}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img src={dogImage} alt="Animal Rescue" style={imgStyle} />
            <h4>Animal Rescue & Welfare</h4>
            <p>
              <i>
                Report injured, abandoned, or stray animals to connect them with
                rescue teams quickly.
              </i>
            </p>
          </div>

          {/* 2. Illegal Dumping */}
          <div
            style={boxStyle}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img src={unsortedWaste} alt="Illegal Dumping" style={imgStyle} />
            <h4>Illegal Waste Dumping</h4>
            <p>
              <i>
                Report illegal garbage dumping and help maintain a clean and
                healthy environment.
              </i>
            </p>
          </div>

          {/* 3. Infrastructure */}
          <div
            style={boxStyle}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img src={Roads} alt="Infrastructure" style={imgStyle} />
            <h4>Infrastructure & Public Facilities</h4>
            <p>
              <i>
                Report potholes, broken benches, damaged roads, and public
                infrastructure problems.
              </i>
            </p>
          </div>
        </div>
      </div>

      <div style={{ padding: "60px 20px", textAlign: "center" }}>
        <h2>Our Features</h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap",
            marginTop: "30px",
          }}
        >
          <div style={cardStyle}>
            <h4>📤 Report Issues</h4>
            <p>Report problems like garbage, water leakage, and road damage.</p>
          </div>

          <div style={cardStyle}>
            <h4>📍 Track Issues</h4>
            <p>Track status of your complaints in real-time.</p>
          </div>

          <div style={cardStyle}>
            <h4>🛠 Fast Resolution</h4>
            <p>Authorities can respond and resolve issues quickly.</p>
          </div>
        </div>
        <Button
          variant="success"
          onClick={() => handleProtectedNavigation("/reportissue")}
          style={{
            marginTop: "30px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          Report an Issue
        </Button>
      </div>

      <div style={{ padding: "60px 20px", background: "#f9f9f9" }}>
        <h2 style={{ textAlign: "center" }}>How It Works</h2>

        <ol style={{ maxWidth: "600px", margin: "30px auto" }}>
          <li>Login or Register</li>
          <li>Report a community issue</li>
          <li>Upload image and location</li>
          <li>Track status of your issue</li>
          <li>Authorities resolve it</li>
        </ol>
      </div>

      <div
        style={{
          padding: "60px",
          textAlign: "center",
          background: "#343a40",
          color: "white",
        }}
      >
        <h2>Make Your City Better Today</h2>
        <p>Report issues and help improve your community</p>

        {!isLoggedIn ? (
          <Button onClick={() => handleProtectedNavigation("/reportissue")}>
            Get Started
          </Button>
        ) : (
          <Button onClick={() => handleProtectedNavigation("/reportissue")}>
            Report Issue
          </Button>
        )}
      </div>

      <div
        style={{
          background: "#222",
          color: "white",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <p>© 2026 Smart Community Issue Portal</p>
      </div>
    </div>
  );
}
export default Home;
