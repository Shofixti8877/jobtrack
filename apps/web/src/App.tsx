import { Navigate, Route, Routes } from 'react-router';
import AppShell from './components/layout/AppShell';
import ApplicationsPage from './pages/ApplicationsPage';
import ContactsPage from './pages/ContactsPage';
import DashboardPage from './pages/DashboardPage';
import ApplicationDetailsPage from './pages/ApplicationDetailsPage';

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route
          index
          element={<Navigate to="/applications" replace />}
        />

        <Route
          path="/applications"
          element={<ApplicationsPage />}
        />

        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />

        <Route
          path="/contacts"
          element={<ContactsPage />}
        />
        <Route
          path="/applications/:id"
          element={<ApplicationDetailsPage />}
        />
      </Route>
    </Routes>
  );
}

export default App;