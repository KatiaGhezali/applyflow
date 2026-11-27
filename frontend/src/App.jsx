import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import KanbanBoard from "./pages/KanbanBoard";
import Interviews from "./pages/Interviews";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { AuthProvider } from "./context/AuthContext.jsx";
import { useAuth } from "./context/useAuth";
import { ApplicationProvider } from "./context/ApplicationContext.jsx";
import { UserSettingsProvider } from "./context/UserSettingsContext.jsx";

import "./App.css";
import "./auth.css";

function PlaceholderPage({ title }) {
  return (
    <div className="placeholder-page">
      <span className="placeholder-label">COMING UP</span>
      <h1>{title}</h1>
      <p>We'll build this section in the next steps.</p>
    </div>
  );
}

function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/" replace /> : children;
}

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const closeSidebar = () => setIsSidebarOpen(false);

  const handleAddApplication = () => {
    navigate("/applications");
  };

  return (
    <div className="app-layout">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <div className="main-area">
        <Topbar
          onMenuClick={() => setIsSidebarOpen(true)}
          onAddApplication={handleAddApplication}
        />

        <main className="main-content" key={location.pathname}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/board" element={<KanbanBoard />} />
            <Route path="/interviews" element={<Interviews />} />
            <Route path="/settings" element={<Settings />} />
            <Route
              path="*"
              element={<PlaceholderPage title="Page not found" />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <UserSettingsProvider>
        <ApplicationProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />

              <Route
                path="/register"
                element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                }
              />

              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </ApplicationProvider>
      </UserSettingsProvider>
    </AuthProvider>
  );
}

export default App;
