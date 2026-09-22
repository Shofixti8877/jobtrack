import { useState } from 'react';
import AddApplicationForm from '../components/applications/AddApplicationForm';
import ApplicationCard from '../components/applications/ApplicationCard';
import { applications as initialApplications } from '../data/applications';
import type {
  Application,
  ApplicationStatus,
} from '../types/application';
import './ApplicationsPage.css';

function ApplicationsPage() {
  const [applications, setApplications] =
    useState<Application[]>(initialApplications);

  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  function handleAddApplication(application: Application) {
  setApplications((currentApplications) => [
    ...currentApplications,
    application,
  ]);

  setIsAddFormOpen(false);
}

  function handleDeleteApplication(id: string) {
    setApplications((currentApplications) =>
      currentApplications.filter(
        (application) => application.id !== id,
      ),
    );
  }

  function handleStatusChange(
    id: string,
    status: ApplicationStatus,
  ) {
    setApplications((currentApplications) =>
      currentApplications.map((application) =>
        application.id === id
          ? { ...application, status }
          : application,
      ),
    );
  }

  return (
    <section className="applications-page">
      <header className="applications-page__header">
        <div>
          <h1>Applications</h1>
          <p>Track and manage your job applications.</p>
        </div>

        <div className="applications-page__header-actions">
  <div className="applications-page__count">
    {applications.length} applications
  </div>

  <button
    className="applications-page__add-button"
    onClick={() => setIsAddFormOpen(true)}
  >
    Add application
  </button>
</div>
        
      </header>

{isAddFormOpen && (
  <div className="modal-backdrop">
    <div className="modal">
      <div className="modal__header">
        <h2>Add application</h2>

        <button
          className="modal__close"
          onClick={() => setIsAddFormOpen(false)}
          aria-label="Close"
        >
          ×
        </button>
      </div>

      <AddApplicationForm
        onAdd={handleAddApplication}
        onCancel={() => setIsAddFormOpen(false)}
      />
    </div>
  </div>
)}

      <div className="applications-page__grid">
        {applications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            onDelete={handleDeleteApplication}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </section>
  );
}

export default ApplicationsPage;