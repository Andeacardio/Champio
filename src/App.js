import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContex } from "./context/AuthContext";
import { useContext } from "react";
import Messenger from "./pages/messanger/Messenger";
import "./App.css";

function App() {
  const { user } = useContext(AuthContex);
  return (
    <div>
      <div id="turn">
        <h1>Please rotate your device!</h1>
      </div>
      <div id="container">
        <Router>
          <Routes>
            <Route exact path="/" element={user ? <Home /> : <Login />} />
            <Route
              exact
              path="/login"
              element={user ? <Navigate to="/" replace /> : <Login />}
            />
            <Route
              exact
              path="/register"
              element={user ? <Navigate to="/" replace /> : <Register />}
            />
            <Route
              exact
              path="/messenger"
              element={!user ? <Navigate to="/" replace /> : <Messenger />}
            />
            <Route exact path="/profile/:username" element={<Profile />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
