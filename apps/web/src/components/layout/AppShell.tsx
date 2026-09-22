import type { ReactNode } from 'react';
import './AppShell.css';

type AppShellProps = {
  children: ReactNode;
};

function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar__logo">JobTrack</div>

        <nav className="sidebar__nav">
          <button className="sidebar__nav-item sidebar__nav-item--active">
            Applications
          </button>

          <button className="sidebar__nav-item">
            Dashboard
          </button>

          <button className="sidebar__nav-item">
            Contacts
          </button>
        </nav>
      </aside>

      <div className="app-shell__content">
        <header className="topbar">
          <span>My Job Search</span>
        </header>

        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}

export default AppShell;