import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ContextWrapper } from "./context";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import CreateEvent from "./pages/CreateEvent";
import ManageEvent from "./pages/ManageEvent";
import Templates from "./pages/Templates";
import Settings from "./pages/Settings";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <ContextWrapper>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-event"
            element={
              <PrivateRoute>
                <CreateEvent />
              </PrivateRoute>
            }
          />
          <Route
            path="/manage-event"
            element={
              <PrivateRoute>
                <ManageEvent />
              </PrivateRoute>
            }
          />
          <Route
            path="/templates"
            element={
              <PrivateRoute>
                <Templates />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
        </Routes>
      </ContextWrapper>
    </Router>
  );
}

export default App;