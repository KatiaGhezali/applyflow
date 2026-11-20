import { Search, Bell, Menu, ChevronDown, Plus } from "lucide-react";

function Topbar({ onMenuClick, onAddApplication }) {
  return (
    <header className="topbar">
      <button
        className="mobile-menu-button"
        onClick={onMenuClick}
        aria-label="Open navigation"
      >
        <Menu size={22} />
      </button>

      <div className="topbar-search">
        <Search size={18} />
        <input
          type="search"
          placeholder="Search anything..."
          aria-label="Search"
        />
        <kbd>⌘ K</kbd>
      </div>

      <div className="topbar-actions">
        <button
          className="topbar-icon-button notification-button"
          aria-label="Notifications"
          type="button"
        >
          <Bell size={19} />
          <span className="notification-dot" />
        </button>

        <div className="topbar-divider" />

        <button className="topbar-profile" type="button">
          <div className="user-avatar topbar-avatar">KG</div>
          <div className="topbar-profile-info">
            <strong>Katia</strong>
            <span>My account</span>
          </div>
          <ChevronDown size={16} />
        </button>

        <button
          className="button button-primary topbar-add-button"
          onClick={onAddApplication}
          type="button"
        >
          <Plus size={17} />
          <span>Add application</span>
        </button>
      </div>
    </header>
  );
}

export default Topbar;
