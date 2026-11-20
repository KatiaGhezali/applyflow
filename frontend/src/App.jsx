import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function PlaceholderPage({ title }) {
  return (
    <div className="placeholder-page">
      <span className="placeholder-label">COMING UP</span>
      <h1>{title}</h1>
      <p>We'll build this section in the next steps.</p>
    </div>
  );
}

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const closeSidebar = () => setIsSidebarOpen(false);

  const handleAddApplication = () => {
    window.alert("We'll add the application form in the next step.");
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
            <Route
              path="/applications"
              element={<PlaceholderPage title="Applications" />}
            />
            <Route
              path="/board"
              element={<PlaceholderPage title="Kanban board" />}
            />
            <Route
              path="/interviews"
              element={<PlaceholderPage title="Interviews" />}
            />
            <Route
              path="/settings"
              element={<PlaceholderPage title="Settings" />}
            />
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
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
