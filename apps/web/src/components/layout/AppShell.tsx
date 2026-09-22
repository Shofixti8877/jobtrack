import { NavLink, Outlet } from 'react-router';
import './AppShell.css';

function AppShell() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar__logo">JobTrack</div>

        <nav className="sidebar__nav">
          <NavLink
            to="/applications"
            className={({ isActive }) =>
              `sidebar__nav-item ${
                isActive ? 'sidebar__nav-item--active' : ''
              }`
            }
          >
            Applications
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `sidebar__nav-item ${
                isActive ? 'sidebar__nav-item--active' : ''
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/contacts"
            className={({ isActive }) =>
              `sidebar__nav-item ${
                isActive ? 'sidebar__nav-item--active' : ''
              }`
            }
          >
            Contacts
          </NavLink>
        </nav>
      </aside>

      <div className="app-shell__content">
        <header className="topbar">
          <span>My Job Search</span>
        </header>

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppShell;