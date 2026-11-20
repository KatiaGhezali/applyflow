import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  Columns3,
  CalendarDays,
  Settings,
  CircleHelp,
  LogOut,
  Layers3,
  X,
} from "lucide-react";

const navigation = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Applications", path: "/applications", icon: BriefcaseBusiness },
  { label: "Kanban Board", path: "/board", icon: Columns3 },
  { label: "Interviews", path: "/interviews", icon: CalendarDays },
];

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <button
          className="sidebar-overlay"
          onClick={onClose}
          aria-label="Close navigation"
        />
      )}

      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-icon">
            <Layers3 size={22} strokeWidth={2.4} />
          </div>

          <span className="brand-name">ApplyFlow</span>

          <button
            className="mobile-close"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X size={21} />
          </button>
        </div>

        <div className="workspace-label">WORKSPACE</div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          {navigation.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                `nav-link ${isActive ? "nav-link-active" : ""}`
              }
            >
              <Icon size={19} strokeWidth={1.9} />
              <span>{label}</span>

              {label === "Applications" && (
                <span className="nav-count">12</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="workspace-label">PREFERENCES</div>

          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              `nav-link ${isActive ? "nav-link-active" : ""}`
            }
          >
            <Settings size={19} strokeWidth={1.9} />
            <span>Settings</span>
          </NavLink>

          <a className="nav-link" href="mailto:support@applyflow.app">
            <CircleHelp size={19} strokeWidth={1.9} />
            <span>Help & Support</span>
          </a>

          <div className="sidebar-divider" />

          <button className="nav-link logout-button" type="button">
            <LogOut size={19} strokeWidth={1.9} />
            <span>Log out</span>
          </button>

          <div className="sidebar-user">
            <div className="user-avatar">KG</div>
            <div className="sidebar-user-info">
              <strong>Katia Ghezali</strong>
              <span>Free plan</span>
            </div>
            <span className="user-menu-dots">···</span>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
